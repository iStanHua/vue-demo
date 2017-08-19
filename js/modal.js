// register modal component
Vue.component('modal', {
  template: '#modal-template'
})

// start app
new Vue({
  el: '#modal',
  data: {
    showModal: false
  }
})