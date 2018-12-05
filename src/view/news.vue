<template>
    <div style="margin-top:50px;">
你好！{{list.name}}
    </div>
</template>
<script>
    export default{
        data(){
            return {
             news:{}
            }
           
        },
        computed:{
            list(){
                return this.$store.state.news
            }
        }
    }
</script>
<style lang="scss">

</style>

