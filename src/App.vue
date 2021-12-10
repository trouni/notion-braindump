<template>
  <main>
    <header>
      <img src="./assets/logo.png" alt="Logo" class="logo" />
      <h2>Brain dump</h2>
    </header>
    <TasksList ref="list" @init="$refs.new.focus()" />
    <form class="new-task" action="#" @submit.prevent="addTask">
      <input
        v-model="title"
        type="text"
        placeholder="What's on your mind?"
        ref="new"
        @keypress.enter="addTask"
      />
      <div
        class="plus-task btn round-icon"
        @click="clickPlusBtn"
        @keydown.enter="clickPlusBtn"
      >
        +
      </div>
    </form>
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
    clickPlusBtn() {
      if (this.title) {
        this.addTask()
      } else {
        this.$refs.new.focus()
      }
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
  background-color: white;
  .logo {
    width: 32px;
  }
  h2 {
    margin: 0.5rem 0;
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
  background-color: #eee;
}

.plus-task {
  position: fixed;
  margin: 0;
  bottom: 1.5rem;
  height: 3rem;
  right: 1.5rem;
  transform: scale(1.2);
  // opacity: 0.5;
}

.new-task {
  form {
    width: 100%;
  }
  input,
  textarea {
    position: relative;
    background-color: white;
    border-left: none;
    &,
    &:hover {
      // transform: scale(1.1);
      box-shadow: 2px 3px 10px rgba(black, 0.2);
    }
    &:focus {
      height: 5rem;
      opacity: 1;
      font-size: 1.3rem;
      padding-right: 4rem;
      & ~ .plus-task {
        position: absolute;
        height: 2.5rem;
        width: 2.5rem;
        font-size: 1.2rem;
        transform: scale(1) translateY(50%);
        bottom: 2.5rem;
        right: 1rem;
        // display: none;
      }
      &::placeholder {
        opacity: 1;
      }
    }
    input[type='submit'] {
      display: none;
    }
    padding: 1rem;
    &::placeholder {
      opacity: 0;
    }
    font-size: 1rem;
    // font-weight: bold;
    width: 100%;
    transition: all 0.2s;
    // line-height: 4;
    opacity: 0;
    height: 2rem;
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
