<template>
  <div class="background">
    <div class="topColumns">
      <img :src="pic" alt="" class="photo">
      你好 {{username}}
    </div>
    <ul class="func-list">
      <li>
        <div>
          功能1
        </div>
      </li>
      <li>
        <div>
          功能2
        </div>
      </li>
      <li>
        <div>
          功能3
        </div>
      </li>
      <li>
        <div>
          功能4
        </div>
      </li>
      <li>
        <div>
          功能5
        </div>
      </li>

      <li style="height: 1px;margin-top: 10px;margin-bottom: 10px"></li>
      <li>
        <el-button type="danger" @click="_logOut"> 注销</el-button>
      </li>
    </ul>


  </div>
</template>

<script>
    import {logOut, getPhoto} from "../../api";
    import {mapState} from 'vuex'

    export default {
        name: "setting",
        data() {
            return {
                pic: '',
            }
        },
        computed: {
            ...mapState(['username'])
        },
        methods: {
            _logOut() {
                logOut().then((res) => {
                    this.$router.push('/');
                });
            },
        },
        mounted() {
            getPhoto().then(response => {
                this.pic = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .background {
    display: flex;
    flex-direction: column;
    background-color: #EEEEEE;
    height: 100%;
    width: 100%;
  }

  .topColumns {
    padding-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: #606266;

    .photo {
      border-radius: 100%;
      border: 2px solid #FFF;
      height: 80px;
    }
  }

  .func-list {
    max-height: 100%;
    list-style: none;
    padding: 0;
    overflow: scroll;
    margin: 15px 0 0;

    li {
      height: 40px;

      div {
        color: #606266;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 15px;
        background-color: white;
        border-top: 1px solid #EEEEEE;
        border-bottom: 1px solid #EEEEEE;
        user-select: none;
      }

      div:active {
        background-color: #EEEEEE;
      }
    }

    .el-button {
      width: 100%;
    }
  }
</style>
