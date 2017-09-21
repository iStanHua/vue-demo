var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=5&sha='

new Vue({
  el: '#app',
  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null,
    show: true
  },
  created: function () {
    this.fetchData()
  },
  watch: {
    currentBranch: 'fetchData',
    show: 'fetchData'
  },
  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },
  methods: {
    fetchData: function () {
      var _this = this
      var xhr = new XMLHttpRequest()
      xhr.open('GET', apiURL + _this.currentBranch)
      xhr.onload = function () {
        _this.commits = JSON.parse(xhr.responseText)
      }
      xhr.send()
      _this.show = false
    }
  }
})