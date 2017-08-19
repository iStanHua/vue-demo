var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=5&sha='

new Vue({
  el: '#github',
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
      this.show = true
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', apiURL + self.currentBranch)
      xhr.onload = function () {
        self.commits = JSON.parse(xhr.responseText)
        this.show = false
        console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})