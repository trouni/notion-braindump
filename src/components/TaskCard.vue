<template>
  <div :class="['task-card', { done }]">
    <Checkbox @click="$emit('toggle-task', taskIndex)" :checked="done" />
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
import Checkbox from './Checkbox'
export default {
  components: {
    Checkbox,
  },
  props: {
    title: String,
    description: String,
    done: { type: Boolean, default: false },
    taskIndex: Number,
  },
}
</script>

<style lang="scss">
.loading .task-card {
  border-color: #777777;
}
.task-card {
  display: flex;
  text-align: left;
  background-color: saturate(rgba(#41b883, 0.03), 30%);
  transition: all 0.3s;
  border-bottom: solid 1px rgba(#35495e, 0.1);
  border-left: solid 0.7rem #41b883;
  display: flex;
  align-items: center;
  p {
    font-size: 0.9rem;
  }
  &:hover {
    background-color: white;
    box-shadow: 2px 3px 10px rgba(black, 0.1);
  }
  & > .checkbox {
    min-width: 2rem;
  }
  & > h3 {
    font-size: 1rem;
    margin: 0;
    padding: 1rem 0.5rem 1rem 0;
    flex-grow: 1;
  }
  &.done {
    border-left: solid 8px rgba(#35495e, 0.3);
    background-color: rgba(#35495e, 0.08);
    h3,
    p {
      text-decoration: line-through;
      opacity: 0.3;
    }
    &:hover {
      transform: unset;
      box-shadow: unset;
    }
  }
}
</style>
