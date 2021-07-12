<template>
  <div class="tasks-list" :class="{ loading: loading }">
    <TaskCard
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :description="task.description"
      :done="task.done"
      :task-index="index"
      @toggle-task="toggleTask"
    />
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import { RepositoryFactory } from '@/api/repository-factory'
const DatabasesRepository = RepositoryFactory.get('databases')
const PagesRepository = RepositoryFactory.get('pages')

export default {
  name: 'TasksList',

  components: {
    TaskCard,
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
            this.$refs.list.$el.scrollTop = 0
            // this.$refs.list.$el.scrollTop = this.$refs.list.$el.scrollHeight
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
      this.tasks.unshift(task)
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
        this.tasks.shift()
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
          direction: 'descending',
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
    async toggleTask(taskIndex) {
      console.log(taskIndex)
      const task = this.tasks[taskIndex]
      task.done = !task.done
      try {
        await PagesRepository.patchPage(task.id, {
          properties: {
            'Done?': { checkbox: task.done },
          },
        })
      } catch (error) {
        task.done = !task.done
      }
    },
  },
}
</script>

<style lang="scss">
.tasks-list {
  flex-grow: 1;
  overflow: scroll;
}
</style>
