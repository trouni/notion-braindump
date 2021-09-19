<template>
  <main>
    <header>
      <img src="./assets/logo.png" alt="Logo" class="logo" />
      <h2>Brain dump</h2>
    </header>
    <TasksList ref="list" @init="$refs.new.focus()" />
    <div class="task-card new-task">
      <div class="plus-task btn round-icon" @click="addTask">+</div>
      <input
        v-model="title"
        type="text"
        placeholder="What's on your mind?"
        ref="new"
        @keypress.enter="addTask"
      />
    </div>
  </main>
</template>

<script>
import TasksList from '@/components/TasksList.vue'

export default {
  name: 'App',

  components: {
    TasksList,
  },

  data() {
    return {
      title: '',
    }
  },

  mounted() {
    this.$nextTick(() => this.$refs.new.focus())
  },

  methods: {
    addTask() {
      this.$refs.list.addTask(this.title)
      this.title = ''
      this.$refs.new.focus()
    },
  },
}
</script>

<style lang="scss">
@import './assets/style.scss';

header {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 8px #2c3e50;
  gap: 0.5em;
  .logo {
    width: 32px;
  }
  h2 {
    margin: 0.8rem 0;
  }
}

main {
  position: fixed;
  font-family: Poppins, Helvetica, Arial, sans-serif;
  font-weight: 100;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.plus-task {
  position: absolute;
  margin: 0;
  top: -1.5rem;
  height: 3rem;
  right: 1.2rem;
  transform: scale(1.2);
  // opacity: 0.5;
}

.new-task {
  position: relative;
  background-color: white;
  border-left: none;
  &,
  &:hover {
    // transform: scale(1.1);
    box-shadow: 2px 3px 10px rgba(black, 0.2);
  }
  input {
    &:focus {
      height: 7rem;
      opacity: 1;
      font-size: 1.3rem;
    }
    opacity: 0.5;
    height: 3rem;
    padding: 1rem;
    font-size: 1rem;
    // font-weight: bold;
    width: 100%;
    transition: all 0.2s;
    // line-height: 4;
  }
  // textarea {
  //   width: 100%;
  //   font-size: 0.9rem;
  //   resize: none;
  // }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
