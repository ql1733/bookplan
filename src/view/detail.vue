<template>
    <div class="book-detail">
      <div class="detail-head">
        <div class="detail-img">
          <img :src="imgUrl" alt="" v-show="imgUrl">
          <img src="../assets/logo.png" alt="" v-show="!imgUrl">
        </div>
        <div class="detail-list">
          <p>中文书名：&nbsp;{{cBookName}}</p>
          <p>英文书名：&nbsp;{{eBookName}}</p>
            <p>作者:&nbsp;{{author}}</p>
            <p>出版时间：&nbsp;{{puhlishTime}}</p>
        </div>
        <div>
           <el-button @click="editBook">
            编辑
          </el-button>
          <el-button @click="giveMessage">
            留言
          </el-button>
        </div>
      </div>
      <div class="content-list">
        <ul>
          <li v-for="(item,index) in commentList" :key="index">
            <p>
            <img src="../assets/logo.png" alt="">
            <span>姓名:&nbsp;{{item.name}}</span>
            </p>

            <p>{{item.content}}</p>
            <p>
              <span> {{item.time}}</span>
              <el-button @click="delectMsg(item.id)">删除</el-button>
            </p>
          </li>
        </ul>
      </div>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-input
  placeholder="请输入内容"
  v-model="title">

  </el-input>
  <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="makeEdit">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
:visible.sync="showBookEdit"
 >
  <EditBook :bookMsg="bookMsg" @createSucess='createSucess'></EditBook>
  </el-dialog>
    </div>
</template>
<script>
import EditBook from './home.vue'
export default{
  data () {
    return {
      imgUrl: '',
      cBookName: '',
      author: '',
      puhlishTime: '',
      eBookName: '',
      id: '',
      isbn: '',
      dialogVisible: false,
      textarea: '',
      title: '',
      bookId: '',
      commentList: [],
      showBookEdit:false,
      bookMsg:{}
    }
  },
  components:{
    EditBook
  },
  mounted () {
    // console.log(this.$route.params.id)
    this.id = this.$route.params.id
    this.init()
  },
  methods: {
    init () {
      this.axois.post('/book/detail', {id: this.id}).then(data => {
        this.bookMsg = data.data.result
        this.imgUrl = this.getUrl.getImg(data.data.result.img)
        this.cBookName = data.data.result.cBookName
        this.eBookName = data.data.result.eBookName
        this.author = data.data.result.author
        this.bookId = data.data.result._id
        this.puhlishTime = data.data.result.publishTime ? data.data.result.publishTime.split('T')[0] : ''
        this.getPostList()
      })
    },
    giveMessage () {
      this.dialogVisible = true
    },
    makeEdit () {
      let obj = {
        title: this.title,
        content: this.textarea,
        bookId: this.bookId
      }
      this.axois.post('/post/create', obj).then(data => {
        this.dialogVisible = false
        this.title = ''
        this.textarea = ''
        this.getPostList()
      })
    },
    //评论列表
    getPostList () {
      this.commentList = []
      this.axois.post('/post/list', {id: this.bookId}).then(data => {
        let list = data.data.data
        for (let i = 0; i < list.length; i++) {
          let obj = {}
          obj.imgUrl = list[i].author.avator
          obj.name = list[i].author.name
          obj.content = list[i].content
          obj.time = list[i].updatedAt
          obj.id = list[i]._id
          this.commentList.push(obj)
        }
      })
    },
    editBook(){
this.showBookEdit = true
    },
    //编辑成功后刷新数据
    createSucess(val){
      if(val){
          this.init()
      }
      this.showBookEdit = false
    },
    delectMsg(id){
      this.axois.post('/post/delect',{id:id}).then(data=>{
//删除评论成功刷新数据
this.getPostList()
      })
    }

  }
}
</script>
<style lang="scss">
.book-detail{
margin-top: 40px;
  .detail-head{
    display:flex;
    justify-content: center;
    align-items: center;
    .detail-img{
      width:200px;
      height:200px;
      margin-right: 20px;
      img{
        width:200px;
      height:200px;
      }
    }
    .detail-list{
      height:200px;
      display:flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
  .content-list{
    margin:40px auto;
    width:600px;
    ul{
      li{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        p:nth-of-type(1){
          img{
            width:60px;
            height:60px;
            vertical-align: middle;
            margin-right: 20px;
          }
        }
        p{
          margin:10px 0;
        }
      }
    }
  }
  .edit-book{
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-200px;
    margin-left:-200px;
    z-index:999;
    background: #cdcdcd;
  }
}
</style>
