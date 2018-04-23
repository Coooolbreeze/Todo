<template>
  <transition
    name="fade"
    :enter-active-class="$style['fade-enter-active']"
    :leave-active-class="$style['fade-leave-active']"
    :enter-class="$style['fade-enter']"
    :leave-to-class="$style['fade-leave-to']"
    @after-leave="afterLeave"
  >
    <div :id="$style.loading" v-show="visible">
      <div :class="$style.spinner">
        <div :class="$style.dot1"></div>
        <div :class="$style.dot2"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    afterLeave () {
      this.$emit('closed')
    }
  }
}
</script>


<style lang="stylus" module>
#loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  animation: sk-rotate 2s infinite linear;
}

.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #33ccff;
  border-radius: 100%;
  animation: sk-bounce 2s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  animation-delay: -1s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}
</style>
