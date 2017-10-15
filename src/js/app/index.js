Vue.config.devtools = true;
Vue.component('child', {
    // 声明 props
    props: ['myMessage'],
    // 就像 data 一样，prop 可以用在模板内
    // 同样也可以在 vm 实例中像 “this.myMessage 这样使用
    template: '<span>{{ myMessage }}</span>'
})
Vue.component('li-item', {
    props: ['todo'],
    template: '<li>{{todo.name}},{{todo.age}},{{todo.sex}}</li>'
})
Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    // data 是一个函数，因此 Vue 不会警告，
    // 但是我们为每一个组件返回了同一个对象引用
    data: function () {
        return {
            counter: 0
        }
    }
})
Vue.component('initial-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    props: ['initialCounter'],
    data: function () {
        return { counter: this.initialCounter }
    }
})
Vue.component('btn-counter', {
    template: '<button v-on:click="increment">{{counter}}</button>',
    data: function () {
        return {
            counter: 0
        }
    },
    methods: {
        increment: function () {
            this.counter += 1;
            this.$emit('increment');
        }
    }
})
Vue.component('format-input', {
    template: '<p>$<input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)" /></p>',
    props: ['value'],
    methods: {
        updateValue: function (value) {
            var formattedValue = value.trim().slice(0, value.indexOf('.') + 3)
            // 如果值不统一，手动覆盖以保持一致
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }  // 通过 input 事件发出数值
            this.$emit('input', Number(formattedValue))
        }
    }
})
var currencyValidator = {
    format: function (number) {
        return (Math.trunc(number * 100) / 100).toFixed(2)
    },
    parse: function (newString, oldNumber) {
        var CleanParse = function (value) {
            return { value: value }
        }
        var CurrencyWarning = function (warning, value) {
            return {
                warning: warning,
                value: value,
                attempt: newString
            }
        }
        var NotAValidDollarAmountWarning = function (value) {
            return new CurrencyWarning(newString + ' is not a valid dollar amount', value)
        }
        var AutomaticConversionWarning = function (value) {
            return new CurrencyWarning(newString + ' was automatically converted to ' + value, value)
        }

        var newNumber = Number(newString)
        var indexOfDot = newString.indexOf('.')
        var indexOfE = newString.indexOf('e')

        if (isNaN(newNumber)) {
            if (
                indexOfDot === -1 &&
                indexOfE > 0 &&
                indexOfE === newString.length - 1 &&
                Number(newString.slice(0, indexOfE)) !== 0
            ) {
                return new CleanParse(oldNumber)
            } else {
                return new NotAValidDollarAmountWarning(oldNumber)
            }
        }

        var newCurrencyString = currencyValidator.format(newNumber)
        var newCurrencyNumber = Number(newCurrencyString)

        if (newCurrencyNumber === newNumber) {
            if (indexOfE !== -1 && indexOfE === newString.length - 2) {
                return new AutomaticConversionWarning(newNumber)
            } else {
                return new CleanParse(newNumber)
            }
        } else {
            return new NotAValidDollarAmountWarning(
                newNumber > newCurrencyNumber
                    ? newCurrencyNumber
                    : oldNumber
            )
        }
    }
}
Vue.component('currency-input', {
    template: '\
    <div>\
      <label v-if="label">{{ label }}</label>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
        v-on:focus="selectAll"\
        v-on:blur="formatValue"\
      >\
    </div>\
  ',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    mounted: function () {
        this.formatValue()
    },
    methods: {
        updateValue: function (value) {
            var result = currencyValidator.parse(value, this.value)
            if (result.warning) {
                this.$refs.input.value = result.value
            }
            this.$emit('input', result.value)
        },
        formatValue: function () {
            this.$refs.input.value = currencyValidator.format(this.value)
        },
        selectAll: function (event) {
            setTimeout(function () {
                event.target.select()
            }, 0)
        }
    }
})
var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        yes: true,
        no: false,
        age: 28,
        name: 'keepfool',
        people: [
            {
                name: 'Jack',
                age: 30,
                sex: 'Male'
            }, {
                name: 'Bill',
                age: 26,
                sex: 'Male'
            }, {
                name: 'Tracy',
                age: 22,
                sex: 'Female'
            }, {
                name: 'Chris',
                age: 36,
                sex: 'Male'
            }
        ],
        groceryList: [
            { text: 'Vegetables' },
            { text: 'Cheese' },
            { text: 'Whatever else humans are supposed to eat' }
        ],
        firstName: 'Foo',
        lastName: 'Bar', isActive: true,
        error: null,
        total: 0,
        price: 0,
        shipping: 0,
        handling: 0,
        discount: 0,

    },
    watch: {

    },
    methods: {
        reverseMessageEvent: function () {
            this.message = this.message.split('').reverse().join('')
        },
        incrementTotal: function () {
            this.total += 1
        }
    },
    computed: {
        reverseMessage: function () {
            return this.message.split('').reverse().join('')
        },
        now: function () {
            return Date.now()
        },
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        },
        classObject: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal',
            }
        },
        total: function () {
            return ((
                this.price * 100 +
                this.shipping * 100 +
                this.handling * 100 -
                this.discount * 100
            ) / 100).toFixed(2)
        }
    }
});
