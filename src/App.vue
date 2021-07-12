<template>
  <main :class="{ loading: loading }">
    <TasksList :tasks="tasks" ref="list" />
    <NewTask @add-task="addTask" />
  </main>
</template>

<script>
import TasksList from '@/components/TasksList.vue'
import NewTask from '@/components/NewTask'
import { RepositoryFactory } from '@/api/repository-factory'
const DatabasesRepository = RepositoryFactory.get('databases')
const PagesRepository = RepositoryFactory.get('pages')

export default {
  name: 'App',
  components: {
    TasksList,
    NewTask,
  },

  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      loading: true,
    }
  },

  watch: {
    tasks: {
      handler(tasks, oldTasks) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
        if (tasks.length !== oldTasks.length) {
          this.$nextTick(() => {
            this.$refs.list.$el.scrollTop = this.$refs.list.$el.scrollHeight
          })
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.refreshTasks()
  },

  methods: {
    async addTask(title) {
      const task = { title }
      this.tasks.push(task)
      try {
        await PagesRepository.postPage({
          properties: {
            title: {
              title: [
                {
                  text: {
                    content: title,
                  },
                },
              ],
            },
          },
        })
      } catch (error) {
        this.tasks.pop()
      }
    },
    async refreshTasks() {
      this.loading = true
      const filter = {
        property: 'Inbox?',
        formula: {
          checkbox: {
            equals: true,
          },
        },
      }
      const sorts = [
        {
          timestamp: 'created_time',
          direction: 'ascending',
        },
      ]
      const response = await DatabasesRepository.queryDatabase({
        filter,
        sorts,
      })
      this.tasks = response.data.results.map(el => {
        return {
          id: el.id,
          title: el.properties.Task.title[0].plain_text,
          done: false,
        }
      })
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
@import './assets/style.scss';

main {
  position: fixed;
  font-family: Poppins, Helvetica, Arial, sans-serif;
  font-weight: 100;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.btn.refresh {
  width: 5rem;
  position: fixed;
  top: 1rem;
  right: 1rem;
}
</style>
