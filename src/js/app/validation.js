var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var users = [];
// create Vue app
var app = new Vue({
  // element to mount to
  el: '#validation',
  // initial data
  data: {
    users: users,
    newUser: {
      name: '',
      email: ''
    }
  },
  // computed property for form validation state
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
    usersDate: function () {
      return this.users
    }
  },
  // methods
  methods: {
    addUser: function () {
      if (this.isValid) {
        this.users.push(this.newUser)
        //this.newUser.name = ''
        //this.newUser.email = ''
      }
    },
    removeUser: function (user) {
      this.users.splice(this.users.indexOf(user), 1)
    }
  }
})