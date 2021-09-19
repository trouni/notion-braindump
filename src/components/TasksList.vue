<template>
  <div class="tasks-ctn" :class="{ loading: loading }" ref="list">
    <TaskCard
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :description="task.description"
      :done="task.done"
      :task-index="index"
      @toggle-task="toggleTask"
    />
    <transition name="fade">
      <div v-if="!tasks.length && !loading" class="fixed-center empty-inbox">
        <h2>🎉</h2>
        <p>The inbox is empty</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="loading" class="fixed-center">
        <spinner />
      </div>
    </transition>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import Spinner from './Spinner'
import { RepositoryFactory } from '@/api/repository-factory'
const DatabasesRepository = RepositoryFactory.get('databases')
const PagesRepository = RepositoryFactory.get('pages')

export default {
  name: 'TasksList',

  components: {
    TaskCard,
    Spinner,
  },

  data() {
    return {
      // tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      tasks: [],
      loading: true,
    }
  },

  watch: {
    tasks: {
      handler(tasks, oldTasks) {
        // localStorage.setItem('tasks', JSON.stringify(this.tasks))
        if (tasks.length !== oldTasks.length) this.scrollList()
      },
      deep: true,
    },
  },

  async mounted() {
    await this.refreshTasks()
    this.$emit('init')
  },

  methods: {
    scrollList() {
      this.$nextTick(
        () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight)
      )
    },
    async addTask(title) {
      if (!title.trim()) return

      this.loading = true
      const task = { title }
      // this.tasks.unshift(task)
      this.tasks.push(task)
      this.scrollList()
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
        // this.tasks.shift()
        this.tasks.pop()
      } finally {
        this.loading = false
      }
    },
    async refreshTasks() {
      this.loading = true
      const filter = {
        property: '_Inbox?',
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
      this.loading = false
      this.tasks = response.data.results.map(el => {
        return {
          id: el.id,
          title: el.properties.Task.title[0].plain_text,
          done: false,
        }
      })
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
.fixed-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tasks-ctn {
  flex-grow: 1;
  overflow: scroll;
}

.empty-inbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  h2 {
    font-size: 2.5rem;
    margin: 0;
  }
}
</style>
