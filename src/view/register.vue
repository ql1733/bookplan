<template>
    <div class="register-user">
      <!-- <el-button type="primary" class='go-login' @click="goLogin">登录</el-button> -->

       <el-form ref="userForm" :model='user' :rules="rules">
          <el-form-item label="用户名" prop='name'>
               <i class="fa fa-user-o"></i>
            <el-input v-model="user.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='password'>
              <i class="fa fa-unlock-alt"></i>
            <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop='dbpassword'>
              <i class="fa fa-unlock-alt"></i>
            <el-input v-model="user.dbpassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop='sex'>
          <el-radio-group v-model="user.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
         </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="UploadUrl"
             :auto-upload="false"
            :data='userObj'
            :before-upload="beforeUpload"
            :with-credentials="true"
            :on-success="uploadSuccess"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-form-item label="个人简介" prop='brief'>
            <el-input type="textarea" v-model="user.brief"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

    </div>
</template>
<script>
// import Vue from 'vue'
export default{
  data () {
    let str = /\w{3,6}/
    let checkUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!str.test(value)) {
        callback(new Error('请输入长度为3-6的由数字，字母，下划线'))
      } else {
        callback()
      }
    }
    let pass = /\w{6,12}/
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入秘密'))
      } else if (!pass.test(value)) {
        callback(new Error('请输入长度为6-12的由数字，字母，下划线'))
      } else {
        callback()
      }
    }
    let checkDpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入秘密'))
      } else if (value !== this.user.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      msg: '',
      imgUrl: '',
      url: '',
      user: {
        name: '',
        password: '',
        dbpassword: '',
        sex: 0,
        avator: '',
        brief: ''
      },
      userObj: {id: '', url: ''},
      id: '',
      rules: {
        name: [
          {required: true, validator: checkUser, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: checkPass, trigger: 'blur'}
        ],
        dbpassword: [
          {required: true, validator: checkDpass, trigger: 'blur'}
        ],
        // sex: {require: true, message: '请选择性别', trigger: 'change'},
        brief: [
          {required: true, message: '请输入简介', trigger: 'blur'},
          {min: 0, max: 100, message: '长度在0到100个字符', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    UploadUrl () {
      return 'http://localhost:6800/user/upload?id=' + this.id
    }
  },
  mounted () {

  },
  methods: {
    onSubmit () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.user.password === this.user.dbpassword) {
            let obj = {
              name: this.user.name,
              password: this.user.password,
              avator: '',
              gender: this.user.sex === 0 ? 'm' : 'f',
              bio: this.user.brief
            }
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.axois.post('/user/createUser', obj).then(data => {
              // console.log(data)
              // this.userObj = {id: data.data.data}
              debugger
              this.id = data.data.data
              this.userObj.id = data.data.data
              // let l = 'http://192.168.31.219:6800/user/upload?id=' + data.data.data
              //  Vue.set(this.userObj, 'url', l)
              this.submitUpload()
              this.$router.push({name: 'login'})
            })
          } else {
            this.$message('两次密码不一样')
          }
        } else {
          return false
        }
      })
    },
    goLogin () {
      this.$router.push({name: 'login'})
    },
    uploadSuccess (res) {
      debugger
      sessionStorage.set('urlKey', res.key.key)
      console.log(res)
    },
    beforeUpload () {
      this.url = 'http://192.168.31.219:6800/user/upload?id=' + this.id
    },
    submitUpload () {
      this.$refs.upload.submit()
    }

  }
}
</script>
<style lang="scss">
.register-user{
  position: relative;
  margin-top:50px;
  .el-form{
        width:420px;
        margin: 0 auto;
        label{
            width:78px;
        }
        .el-form-item__content{
            position: relative;
            i{
                position: absolute;
                left:104px;
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
  .go-login{
    position: absolute;
    right:10px;
    top:10px;
  }
}

</style>
