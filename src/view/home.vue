<template>
    <div class="input-book">
        <el-form ref="form" :model='book' :rules="rules">
          <el-form-item label="英文书名" prop='eBookName'>
               <!-- <i class="fa fa-user-o"></i> -->
            <el-input v-model="book.eBookName" placeholder="英文书名"></el-input>
          </el-form-item>
          <el-form-item label="中文书名" prop='cBookName'>
            <el-input v-model="book.cBookName" placeholder="中文书名"></el-input>
          </el-form-item>
           <el-form-item label="出版时间" prop='publishTime'>
            <el-input v-model="book.publishTime" placeholder="出版时间"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop='author'>
            <el-input v-model="book.author" placeholder="作者"></el-input>
          </el-form-item>
          <el-form-item label="出版机构" prop='press'>
            <el-input v-model="book.press" placeholder="出版机构"></el-input>
          </el-form-item>
           <el-form-item label="购买时间" prop='buyTime'>
            <el-input v-model="book.buyTime" placeholder="购买时间"></el-input>
          </el-form-item>
          <el-form-item label="版本" prop='edition'>
            <el-input v-model="book.edition" placeholder="版本"></el-input>
          </el-form-item>
          <el-form-item label="书本编号" prop='isbn'>
            <el-input v-model="book.isbn" placeholder="书本编号" :disabled="flagEdit"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop=''>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="UploadUrl"
              :auto-upload="false"
              :before-upload="beforeUpload"
              :with-credentials="true"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
         </el-form-item >
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
  data () {
    let str = /\w+/
    let checkISNB = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入书籍编号'))
      } else if (!str.test(value)) {
        callback(new Error('请输入正确书籍编号'))
      } else {
        callback()
      }
    }
    return {
      book: {
        eBookName: '',
        cBookName: '',
        publishTime: '',
        author: '',
        press: '',
        buyTime: '',
        edition: '',
        isbn: '',
        img: ''
      },
      id: '',
      rules: {
        isbn: [
          {required: true, validator: checkISNB, trigger: 'blur'}
        ]
      },
      flagEdit:false
    }
  },
  props:['bookMsg'],
  computed: {
    UploadUrl () {
      return 'http://localhost:6800/book/upload?id=' + this.id
    },
    bookDetail(){
     // console.log(this.bookMsg)
     if(this.bookMsg.isbn){
 this.book = this.bookMsg
      this.flagEdit = true
     }
     
      return this.bookMsg
    }

  },
  watch:{
    bookDetail(n,o){
      
    }
  },
  methods: {
    onSubmit () {
      console.log(this.book)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = {
            eBookName: this.book.eBookName,
            cBookName: this.book.cBookName,
            publishTime: this.book.publishTime,
            author: this.book.author,
            press: this.book.press,
            buyTime: this.book.buyTime,
            edition: this.book.edition,
            isbn: this.book.isbn,
            img: ''
          }
          let url = ''
          if(this.flagEdit){
            url = '/book/edit'
          }else{
            url = '/book/input'
          }
          this.axois.post(url, obj).then(data => {
            
            if (data.status) {
              this.$message({
                type: 'success',
                message: '输入成功'
              })
              this.id = data.data.result
              this.$emit('createSucess',true)
              this.submitUpload()
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
    beforeUpload () {
      this.url = 'http://192.168.31.219:6800/book/upload?id=' + this.id
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    cancel(){
this.$emit('createSucess',false)
    }
  }
}
</script>
<style lang="scss">
.input-book{
  margin-top:50px;
  .el-form{
     width:420px;
        margin: 0 auto;
        label{
            width:78px;
        }
        .el-input{
                width:300px;
                input{
                    padding:0 28px;
                }
            }
  }
}
</style>
