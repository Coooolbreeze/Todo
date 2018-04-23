import LoadingTemplate from './Loading.vue'
import loading from './function'

export default Vue => {
  Vue.component(LoadingTemplate.name, LoadingTemplate)
  Vue.prototype.$loading = loading
}
