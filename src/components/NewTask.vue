<template>
  <div class="task-card new-task">
    <input
      v-model="newTitle"
      @keypress.enter="submitTask(newTitle), resetForm()"
      type="text"
      placeholder="Add a task"
      ref="titleInput"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTitle: '',
    }
  },
  mounted() {
    this.focus()
  },
  methods: {
    focus() {
      this.$refs.titleInput.focus()
    },
    submitTask(title) {
      this.$emit('add-task', title)
    },
    resetForm() {
      this.newTitle = ''
      this.focus()
    },
  },
}
</script>

<style lang="scss">
.new-task {
  background-color: white;
  border-left: none;
  &,
  &:hover {
    // transform: scale(1.1);
    box-shadow: 2px 3px 10px rgba(black, 0.2);
  }
  input {
    &:focus {
      height: 6rem;
      opacity: 1;
    }
    opacity: 0.5;
    height: 4rem;
    padding-left: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
    width: 100%;
    transition: height 0.3s;
    // line-height: 4;
  }
  textarea {
    width: 100%;
    font-size: 0.9rem;
    resize: none;
  }
}
</style>
