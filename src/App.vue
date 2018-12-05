<template>
  <div id="app">
    <user v-if="hasLogin"></user>
    <Navation v-if="hasLogin"></Navation>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import bar from './components/bar.vue'
import Navation from './components/nav.vue'
import user from './components/user.vue'
export default {
  name: 'App',
  data () {
    return {
      hasLogin:false,
      myName:''
    }
  },
  components: {
    bar,
    user,
    Navation
  },
   computed: {
    name () {
      return this.$store.state.userName
    }
  },
  watch:{
    name:function(n,o){
      if(n){
        this.hasLogin = true
      } else {
        this.hasLogin = false
      }
    },
    // myName:function(n,o){
    //    if(n){
    //     this.hasLogin = true
    //   } else {
    //     this.hasLogin = false
    //   }
    // }
  },
  mounted(){
    
     this.myName  =sessionStorage.getItem('userName')
     
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
