<template>
  <el-row type="flex" justify="space-around" class="tab-bar">
    <el-col :span="4" v-for="(item,i) in tabData" :key="i"
            @click.native="didClickedItem(item.id)"
            :class="{active:item.id===choice}">
      <div>
        <i :class="item.icon"></i>
      </div>
      <div>
        <span>{{item.name}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "TabBar",
        props: {
            tabData: Array,
            default: 0,
        },
        data() {
            return {
                choice: 0,
            }
        },
        methods: {
            didClickedItem(tag) {
                this.choice = tag;
                this.$emit('select-item', tag);
            }
        },
        mounted() {
            this.choice = this.default;
        }
    }
</script>

<style scoped>
  .tab-bar {
    background-color: white;
    border: 0 solid rgb(210, 210, 210);
    bottom: 0;
    width: 100%;
    align-items: center;
    min-height: 60px;
  }

  .active {
    color: #F56C6C;
  }

  i {
    font-size: 16px;
  }
</style>
