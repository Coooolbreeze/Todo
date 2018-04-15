<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <the-header />
    <router-view />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheTodo from './components/TheTodo.vue'
import TheFooter from './components/TheFooter.jsx'

export default {
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
</style>
