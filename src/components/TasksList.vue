<template>
  <div class="tasks-list">
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
const PagesRepository = RepositoryFactory.get('pages')

export default {
  name: 'TasksList',

  components: {
    TaskCard,
  },

  props: {
    tasks: Array,
  },

  methods: {
    async toggleTask(taskIndex) {
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
  display: flex;
  flex-direction: column;
  & > div:first-child {
    margin-top: auto;
  }
}
</style>
