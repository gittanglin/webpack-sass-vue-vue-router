import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routerConfig from "./js/common/router";
import toonAgreement from "./js/common/toonAgreement";
Vue.use(VueRouter);

//开启debug模式
Vue.config.debug = true;
Vue.config.devtools = true;
Vue.config.silent = true;

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routerConfig.router
});

//记录返回的位置，如果是到第一个页面再返回就退出webview
let count = 0;
router.beforeEach((to, from, next) => {
    if (to.name == null && count != 0) {
        toonAgreement.closeWindow(1);
        return false;
    }
    count++;
    next();
});

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
