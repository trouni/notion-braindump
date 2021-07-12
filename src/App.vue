<template>
  <main>
    <NewTask @add-task="addTask" ref="new" />
    <TasksList ref="list" />
  </main>
  <div class="plus-task btn round-icon" @click="$refs.new.focus">+</div>
</template>

<script>
import TasksList from '@/components/TasksList.vue'
import NewTask from '@/components/NewTask'

export default {
  name: 'App',

  components: {
    TasksList,
    NewTask,
  },

  mounted() {
    this.$refs.new.focus()
  },

  methods: {
    addTask(title) {
      this.$refs.list.addTask(title)
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

.plus-task {
  position: fixed;
  margin: 0;
  bottom: 1rem;
  right: 1rem;
}
</style>
