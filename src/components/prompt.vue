<template>
  <div class="prompt_wrap">
      <app-header></app-header>
  </div>
</template>
<script>
    import Header from "@/components/header.vue";
    import Axios from 'axios';

    export default{
        name:"Prompt",
        data(){
            return{
                title:'提示信息'
            }
        },
        components:{
            'app-header':Header
        },
        mounted(){
            Axios.post('http://xriml.com/yqg/login.php?act=register')
            .then(function(response){
                console.log(response)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
</script>