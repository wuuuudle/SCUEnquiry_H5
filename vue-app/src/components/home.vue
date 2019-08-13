<template>
  <div>
    这是home页面,welcome {{username}}
    <el-button style="width: 100%" type="danger" @click="_logOut"> 注销</el-button>
  </div>
</template>

<script>
    import {logOut} from "../api";
    import {mapState} from 'vuex'

    export default {
        name: "home",
        computed: {
            ...mapState(['username'])
        },
        methods: {
            _logOut() {
                logOut().then((res) => {
                    this.$router.push('/');
                });
            }
        }
    }
</script>

<style scoped>

</style>
