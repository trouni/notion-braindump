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

export default {
  name: 'TasksList',

  components: {
    TaskCard,
  },

  props: {
    tasks: Array,
  },

  methods: {
    toggleTask(taskIndex) {
      const taskToUpdate = this.tasks[taskIndex]
      taskToUpdate.done = !taskToUpdate.done
      this.$set(this.tasks, taskIndex, taskToUpdate)
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
