<template>
  <div :class="['checkbox', { checked }]"></div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
  },
}
</script>

<style lang="scss">
$check-color: #027edd;
.checkbox {
  display: flex;
  align-self: center;
  border: solid 2px $check-color;
  height: 2rem;
  border-radius: 50%;
  margin: 0 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgba($check-color, 0.2);
    transform: scale(1.1);
  }
  &.checked {
    background-color: $check-color;
  }
  &.checked:after {
    content: '';
    display: inline-block;
    transform: rotate(45deg) translate(-20%, 55%);
    height: 1rem;
    width: 1rem;
    margin-left: 60%;
    border-bottom: 5px solid white;
    border-right: 5px solid white;
  }
}
</style>
