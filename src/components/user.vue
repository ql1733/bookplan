<template>
<div>
<div class="user-title">
            <span>{{userName}}</span>
            <img :src="userImg" alt="" v-show="userImg">
            <img src="../assets/logo.png" alt="" v-show="!userImg">
        </div>

</div>

</template>
<script>
export default{
  data () {
    return {
      userName: '',
      userImg: ''
    }
  },
  mounted () {

  },
  // beforeRouteEnter (to, from, next) {
  //   debugger
  //   // ...
  //   next(true)
  // },
  computed: {
    name () {
      return this.$store.state.userName
    }
  },
  watch: {
    name (n, o) {
      this.userName = n.name
      this.userImg = this.getUrl.getImg(n.avator)
    }
  }
}
</script>
<style lang="scss">
.user-title{
    position: absolute;
    right:20px;
    top:10px;
    width:200px;
    height:100px;
    img{
        width:80px;
        height:80px;
        border-radius: 50%;
    }
    span{
        font-size:16px;
        color:#333;
    }
}
</style>
