<template>
    <div class="bar">
        <ul>
            <li @click="go(1)">发布页</li>
            <li @click="go(2)">列表页</li>
            <li @click="go(3)">登录页</li>
            <li @click="go(4)">注册页</li>
            <li @click="singOut">登出</li>
        </ul>
    </div>
</template>
<script>
export default{
  data () {
    return {}
  },
  methods: {
    go (item) {
      switch (item) {
        case 1:
          this.$router.push({name: 'home'})
          break
        case 2:
          this.$router.push({name: 'index'})
          break
        case 3:
          this.$router.push({name: 'login'})
          break
        case 4:
          this.$router.push({name: 'register'})
          break
      }
    },
    singOut () {
      this.axois.post('/user/signOut', {name: 'zsb'}).then(data => {
        if (data.status) {
          this.$router.push({name: 'index'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
.bar{
    position: absolute;
    top:20px;
    right:20px;
}
</style>
