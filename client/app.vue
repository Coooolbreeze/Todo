<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <the-header />
    <p>{{fullName}} {{count}}</p>
    <router-view />
    <the-footer />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TheHeader from './components/TheHeader.vue'
import TheTodo from './components/TheTodo.vue'
import TheFooter from './components/TheFooter.jsx'

export default {
  components: {
    TheHeader,
    TheTodo,
    TheFooter
  },
  mounted () {
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['fullName'])
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
