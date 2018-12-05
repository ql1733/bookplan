<template>
    <div class="book-list">
         <el-input placeholder="请输入内容" v-model="searchInput">
    <template slot="append"><el-button @click="search"></el-button></template>
  </el-input>
        <ul class="content-list">
            <li v-for="(item,index) in bookList" :key="index" @click="goDetail(item)">
                <div>
                    <img :src="item.url" alt="" style="width:100px;height:100px;">
                </div>
                <p>
                    <span>书名：&nbsp;{{item.cBookName}}</span>
                     <span>作者：&nbsp;{{item.author}}</span>
                     <span>出版社：&nbsp;{{item.press}}</span>
                      <span>出版时间：&nbsp;{{item.publishTime}}</span>
                       <span>书编号：&nbsp;{{item.isbn}}</span>
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
import Vue from 'vue'
export default{
  data () {
    return {
      bookList: [],
      searchInput: '',
      pageSize: 5,
      currentPage: 1
    }
  },
  mounted () {
   // window.location.reload()
    this.getData()
  },
  methods: {
    getData () {
      let obj = {
        keyWord: this.searchInput,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      this.axois.post('/book/list', obj).then(data => {
        this.bookList = data.data.result
        let list = this.bookList.length
        for (let i = 0; i < list; i++) {
          let img = this.getUrl.getImg(this.bookList[i].img)
          let item = {
            cBookName: this.bookList[i].cBookName,
            author: this.bookList[i].author,
            press: this.bookList[i].press,
            publishTime: this.bookList[i].publishTime ? this.bookList[i].publishTime.split('T')[0] : '',
            isbn: this.bookList[i].isbn,
            url: img
          }
          Vue.set(this.bookList, i, item)
        // console.log(this.bookList)
        }
      })
    },
    handleSizeChange () {

    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getData()
    },
    search () {
      this.getData()
    },
    goDetail (item) {
      this.$router.push({name: 'detail', params: {id: item.isbn}})
    }
  }
}
</script>
<style lang='scss'>
.book-list{
    width:1200px;
    margin:100px auto;
    .content-list{
        margin-top:20px;
        li{
            display:flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
            p{
                margin-left:24px;
               display:flex;
               flex-direction:column;
               justify-content: flex-start;
               align-items: flex-start;
            }
        }
    }
}
</style>
