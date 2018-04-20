<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <the-header />
    <!-- <p>{{fullName}} {{count}}</p>
    <p>{{text}} {{textPlus}}</p>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link> -->
    <transition name="fade">
      <router-view />
    </transition>
    <button @click="notify">click me</button>
    <the-footer />
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
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
  },
  mounted () {
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })
    // this.updateText({
    //   text: 3
    // })
    // this.updateTextAsync({
    //   text: 10,
    //   time: 1000
    // })
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
    // ...mapMutations({
    //   updateCount: 'updateCount',
    //   updateText: 'text/updateText'
    // }),

    // ...mapActions({
    //   updateCountAsync: 'updateCountAsync',
    //   updateTextAsync: 'text/updateTextAsync'
    // })
  },
  computed: {
    // ...mapState({
    //   count: 'count',
    //   text: state => state.text.text
    // }),
    // ...mapGetters({
    //   fullName: 'fullName',
    //   textPlus: 'text/textPlus'
    // })
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
