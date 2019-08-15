<template>
  <div style="height: 100%;display: flex;flex-direction: column">
    <div style="height: 100%;display: flex">
      <router-view/>
    </div>
    <TabBar :tab-data="tabBarData" :default="0" @select-item="select"></TabBar>
  </div>
</template>

<script>

    import TabBar from "./TabBar";

    export default {
        name: "index",
        data() {
            return {
                tabBarData: [{
                    id: 0,
                    icon: 'iconfont icon-calendar',
                    name: '课表',
                }, {
                    id: 1,
                    icon: 'iconfont icon-user',
                    name: '我',
                }]
            }
        },
        methods: {
            select(choice) {
                if(choice === 0)
                    this.$router.push('/index/class');
                else if(choice === 1)
                    this.$router.push('/index/setting')
            }
        },
        mounted() {
        },
        components: {
            TabBar
        }
    }
</script>

<style scoped>

</style>
