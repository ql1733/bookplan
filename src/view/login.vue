<template>
    <div class="r-login">
        <!-- <el-button type="primary" class='go-register' @click="goRegister">注册</el-button> -->

       <el-form ref="userForm" :model='user' :rules="rules">
          <el-form-item label="用户名" prop='name'>
            <i class="fa fa-user-o"></i>
            <el-input v-model="user.name" placeholder="用户名">

            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop='password'>
              <i class="fa fa-unlock-alt"></i>
            <el-input v-model="user.password" placeholder="密码" type="password"></el-input>

          </el-form-item>
          <el-form-item style="text-align:right;margin-right:20px;color:#409EFF;">
              <span @click="goRegister">注册</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default{
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      userImg: '',
      rules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      socket:null

    }
  },
  mounted(){
    
   
 this.socket = io('http://localhost:6800')

this.socket.on('connect', (data) => {
  console.log(this.socket.id) // 'G5p5...'
  
})
this.socket.on('news', (data) => {
  console.log(data)
  this.$store.commit('getSocketNews',data)

})
  },
  methods: {
    login () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.user.name,
            password: this.user.password
          }

          this.axois.post('/user/login', obj).then(data => {
            
            if (data.status) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.socket.emit('news', data.data.result)
              this.$store.commit('setUserName', data.data.result)
              sessionStorage.setItem('userName',data.data.result.name)
              this.$router.push({name: 'list'})
             // window.location.reload()
            } else {
              this.$message({
                type: 'warning',
                message: data.message
              })
            }
          })
        } else {
          return false
        }
      })
    },
    goRegister () {
      this.$router.push({name: 'register'})
    }
  }
}
</script>
<style lang='scss'>
.r-login{

    position: relative;
    .go-register{
        position: absolute;
        right: 10px;
        top:10px;
    }
    .el-form{
        width:400px;
        margin: 0 auto;
        label{
            width:64px;
        }
        .el-form-item__content{
            position: relative;
            i{
                position: absolute;
                left:84px;
                top:12px;
                z-index:9999;
            }
            .el-input{
                width:300px;
                input{
                    padding:0 28px;
                }
            }
        }

    }
}
</style>
