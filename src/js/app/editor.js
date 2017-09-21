new Vue({
  el: '#app',
  data: {
    input: '# hello'
  },
  computed: {
    compiledMarkdown: function () {
      return this.input
    }
  },
  methods: {
    update: function (e) {
      this.input = e.target.value
    }
  }
})