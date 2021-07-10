<template>
  <div class="task-card new-task">
    <div>
      <input
        v-model="newTitle"
        @keypress.enter="submitTask(newTitle), resetForm()"
        type="text"
        placeholder="Add a task"
        ref="titleInput"
      />
    </div>
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
    this.$refs.titleInput.focus()
  },
  methods: {
    submitTask(title) {
      this.$emit('add-task', title)
    },
    resetForm() {
      this.newTitle = ''
    },
  },
}
</script>

<style lang="scss">
.new-task {
  overflow: hidden;
  background-color: white;
  border-left: solid 0.7rem #35495e;
  min-height: 7rem;
  &,
  &:hover {
    // transform: scale(1.1);
    box-shadow: 2px 3px 10px rgba(black, 0.2);
  }
  & + .tasks-list {
    pointer-events: none;
  }
  input {
    font-size: 1.3rem;
    font-weight: bold;
    width: 100%;
    line-height: 4;
  }
  textarea {
    width: 100%;
    font-size: 0.9rem;
    resize: none;
  }
}
</style>
