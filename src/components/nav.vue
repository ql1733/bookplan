<template>
    <div class="nav">
<ul>
    <li v-for="(item,index) in navList" :key="index">
        <router-link :to="item.path">
            {{item.name}}
        </router-link>
    </li>
</ul>
    </div>
</template>
<script>
/* eslint-disable */ 
export default{
  data () {
    return {
      navList: [
        {path: '/list', name: '首页'},
        {path: '/home', name: '课本输入'},      
        {path: '/comments', name: '评论列表'},
        {path: '/chart', name: '数据统计'},
        {path: '/news', name: '消息'},
        {path: '/register', name: '用户注册'}
      ]
    }
  }
}
</script>
<style lang="scss">
.nav{
    ul{
        display:flex;
        justify-content: center;
        li{
            margin:0 24px;
            a{
                text-decoration:none;
            }
        }
    }
}
</style>
