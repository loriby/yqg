import Vue from 'vue';
import Router from 'vue-router';
import Goodsdetail from '@/components/goodsdetail';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/goodsdetail',
        name: 'Detail',
        component: Goodsdetail
    }],
});