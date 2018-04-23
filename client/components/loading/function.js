import Vue from 'vue'
import Component from './func-loading'

const LoadingConstructor = Vue.extend(Component)

const loading = _ => {
  if (Vue.prototype.$isServer) return

  const instance = new LoadingConstructor()
  instance.vm = instance.$mount()

  document.body.appendChild(instance.vm.$el)

  return _ => {
    instance.vm.visible = false
    instance.vm.$on('closed', _ => {
      document.body.removeChild(instance.vm.$el)
      instance.vm.$destroy()
    })
  }
}

export default loading
