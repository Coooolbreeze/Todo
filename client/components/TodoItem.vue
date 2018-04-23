<template>
  <transition
    name="fade"
    :enter-active-class="$style['fade-enter-active']"
    :leave-active-class="$style['fade-leave-active']"
    :enter-class="$style['fade-enter']"
    :leave-to-class="$style['fade-leave-to']"
  >
    <div :class="[$style.item, todo.completed ? $style.completed : '']">
      <input
        type="checkbox"
        :class="$style.toggle"
        :checked="todo.completed"
        @click="handleToggle"
      >
      <label>{{todo.content}}</label>
      <button :class="$style.destory" @click="deleteTodo"></button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    },
    handleToggle (e) {
      e.preventDefault()
      this.$emit('toggle', this.todo)
    }
  }
}
</script>

<style lang="stylus" module>
.item {
  position: relative;
  width: 600px;
  background-color: #ffffff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    .destory:after {
      content: 'x';
    }
  }

  label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
  }

  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
}

.toggle {
  text-align: center;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline: none;

  &:after {
    content: url('../assets/images/unchecked.png');
  }

  &:checked:after {
    content: url('../assets/images/checked.png');
  }
}

.destory {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}

.fade-enter, .fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}
</style>
