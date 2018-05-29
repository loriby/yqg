import Vue from "vue";
import Router from "vue-router";

import Index from "@/components/index";
import Goods from "@/components/goods";
import Footer from "@/components/footer";
import Detail from '@/components/goodsdetail';
import User from '@/components/user';
import Login from '@/components/login';
import Register from '@/components/register';
import Prompt from '@/components/prompt';
import Profile from '@/components/profile';

Vue.use(Router);


export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/goodsdetail/:id',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/prompt',
            name: 'Prompt',
            component: Prompt
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
})