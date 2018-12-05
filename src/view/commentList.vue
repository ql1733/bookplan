<template>
    <div class="comments">
        <el-input placeholder="请输入内容" v-model="searchInput">
            <template slot="append"><el-button @click="search"></el-button></template>
        </el-input>
        <ul class="comments-list">
            <li v-for="(item,index) in commentsList" :key="index">
               <p>
                <img src="../assets/logo.png" alt="">
                <span>姓名:&nbsp;{{item.author.name}}</span>
                </p>

                <p>{{item.content}}</p>
                <p>
                     <span> {{item.updatedAt}}</span>
                    <el-button @click="delectMsg(item._id)">删除</el-button>
                </p>
            </li>
        </ul>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>


    </div>
</template>
<script>
    export default{
        data(){
            return {
                commentsList:[],
                searchInput:'',
                pageSize:20,
                currentPage:1
            }
        },
        mounted(){
            this.getComments()
        },
        methods:{
            getComments(){
            let obj = {
                keyWord: this.searchInput,
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }
            this.axois.post('/post/allList', obj).then(data=>{
                
                this.commentsList = data.data.result
            })
        },
        search(){
             this.getComments()
        },
        handleSizeChange(val){
            this.pageSize = val
             this.getComments()
        },
        handleCurrentChange(val){
            
            this.currentPage = val
             this.getComments()
        },
          delectMsg(id){
              
      this.axois.post('/post/delect',{id:id}).then(data=>{
//删除评论成功刷新数据
this.getComments()
      })
    }
     }
       
    }
</script>
<style lang="scss">
.comments{
 width:1200px;
    margin:100px auto;
    .comments-list{
        margin-top:20px;
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
</style>

