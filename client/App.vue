<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <the-header />
    <transition
      name="fade"
      mode="out-in"
      :enter-active-class="$style['fade-enter-active']"
      :leave-active-class="$style['fade-leave-active']"
      :enter-class="$style['fade-enter']"
      :leave-to-class="$style['fade-leave-to']"
    >
      <router-view />
    </transition>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheTodo from './components/TheTodo.vue'
import TheFooter from './components/TheFooter.jsx'

export default {
  metaInfo: {
    title: "Cooolbreeze's Todo App"
  },
  components: {
    TheHeader,
    TheTodo,
    TheFooter
  }
}
</script>

<style lang="stylus" module>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999999;
  opacity: 0.8;
  z-index: -1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
