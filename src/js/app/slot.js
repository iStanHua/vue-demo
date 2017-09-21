Vue.component('app-layout', {
    template: '\
        <div class="slot-page">\
            <div class="slot-header">\
                <slot name="header"></slot>\
            </div>\
            <div class="slot-content">\
                <slot></slot>\
            </div>\
            <div class="slot-footer">\
                <slot name="footer"></slot>\
            </div>\
        </div>\
        ',
})
Vue.component('slot-page', {
    template: '\
        <app-layout>\
            <h1 slot="header">这里可能是一个页面标题</h1>\
            <current-page v-bind:view="currentView"></current-page>\
            <div class="navbar" slot="footer">\
                <a class="item" ref="home" v-on:click="navClick()">首页</a>\
                <a class="item" ref="mail" v-on:click="navClick()">消息</a>\
                <a class="item" ref="find" v-on:click="navClick()">发现</a>\
                <a class="item" ref="user" v-on:click="navClick()">我的</a>\
            </div>\
        </app-layout>\
        ',
    data: function () {
        return {
            currentView: 'home'
        }
    },
    props: ['currentView'],
    methods: {
        navClick: function () {
            console.log(this.$refs.mail);
            this.currentView = this.$refs.mail;
        }
    }
})
Vue.component('current-page', {
    template: '#' + this.currentView + '-tpl',
    props: ['view']
})
var vm = new Vue({
    el: '#app',
    data: {
        currentView: 'home'
    },
    components: {
        home: {
            template: '#home-tpl'
        },
        mail: {
            template: '#mail-tpl'
        },
        find: {
            template: '#find-tpl'
        },
        user: {
            template: '#user-tpl'
        }

    },
    methods: {

    }
})