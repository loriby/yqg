<template>
    <div class="goods_wrap">
        <div class="goods" id="goods" >
            <div class="goods_list" v-for="item in items">
                <router-link :to="{name:'Detail',params:{id:item.id}}">
                    <img class="img1" :src="item.pic_url" alt="">
                    <!-- <span>{{item.shop_type == 'C' ? '淘宝' : '天猫'}}</span> -->
                    <p class="goods_name">{{item.title}}</p>
                    <div class="goods_msg">
                        <p class="goods_price">￥{{item.coupon_price}}</p>
                        <p class="goods_sales">销量：{{item.likes}}</p>
                        <p class="clear"></p>
                    </div>
                </router-link>
            </div>
            <p class="clear"></p>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import Router from "vue-router";
    import Jquery from "../../static/js/jquery-1.8.0";
    import goodsdetail from "./goodsdetail";
    import Axios from "axios";
    import Qs from "qs";
    var idx = 0;

    Vue.use(Router);
//     var goodsData = [];

//     function getData(){
//         idx+=1;
//         $.ajax({
//             url:'http://xriml.com/yqg/index.php',
//             dataType:'json',
//             data:{idx},
//             type:'POST',
//             async:false,
//             success:function(res){
//                 goodsData = res;
//             },error:function(){
//                 console.log('error')
//             }
//         })
//     }
// getData();

// window.onscroll = function(){
//     if(document.documentElement.scrollTop == document.body.clientHeight - window.screen.availHeight){
//         getData();
//     }
// }
// Axios.post('http://xriml.com/yqg/index.php',{
//                     idx:1
//                 })
//                 .then(function(response){
//                     console.log(response)
//                 })
//                 .catch(function(error){
//                     console.log(error)
//                 })

    export default{
        name:'Goods',
        data(){
            return{
                items:[],
                shopType:'',
                pagesIdx:0
            }
        },
        methods:{
            getData:function(){
                idx ++;
                
                let postData = {
                    'pagesIdx':idx
                };
                var that = this;
                // Axios({
                //     url:'http://xriml.com/yqg/index.php',
                //     method:'get',
                //     data:postData,
                //     success:function(res){
                //         console.log(res)
                //     },
                //     error:function(){
                //         console.log(error)
                //     }
                // })
                Axios.post('http://xriml.com/yqg/index.php',Qs.stringify(postData))
                .then(function (response) {
                    that.items = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getMore:function(){
                let scrolTop = document.documentElement.scrollTop || document.body.scrolTop;
                let sH = document.documentElement.clientHeight;
                let wH = document.body.offsetHeight;
                
                if(scrolTop == wH - sH){
                    this.getData();
                }
            }
        },
        mounted(){
            this.getData();
            window.addEventListener('scroll', this.getMore);
        }
    }
</script>
