new Vue({
  el: '#editor',
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