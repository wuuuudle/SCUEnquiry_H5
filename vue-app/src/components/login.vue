<template>
  <div style="height: 100%">
    <el-row style="margin: 15px;" class="content">
      <el-col :span="24">
        <el-autocomplete
          v-model="username"
          :fetch-suggestions="querySearch"
          placeholder="学号"
          @select="handleSelect"
          style="width: 100%"
          popper-class="usernameClass"
        >
          <div slot-scope="{item}" style="margin: 10px">
            <span>{{item.username}}</span>
            <i class="el-icon-delete el-input__icon"
               @click="()=>{dialogVisible = true;
               username_choice = item.username;
               delAll = false;}"></i>
          </div>
        </el-autocomplete>
      </el-col>
      <el-col :span="24">
        <el-input type="password" v-model="password" placeholder="密码"></el-input>
      </el-col>
      <el-col :span="14">
        <el-input type="text" v-model="captcha" placeholder="验证码"></el-input>
      </el-col>
      <el-col :span="10">
        <img id="captcha" :src="pic" style="height: 40px" @click="_getCaptcha">
      </el-col>
      <el-col :span="24">
        <el-button type="primary" style="width: 100%" @click="_Login">登录</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%">
      <span>您确定要删除账号:{{username_choice}}</span>
      <div>同时删除该账号数据
        <el-switch
          v-model="delAll"
          active-color="#13ce66">
        </el-switch>
      </div>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="_delUser(username_choice)">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {getCaptcha, login, tryLogin, nShapeArray} from "../api";
    import {getUserList, delUser, addUser} from '../api/databases';
    import * as tf from '@tensorflow/tfjs'
    import {mapMutations} from 'vuex'
    import $ from 'jquery'

    export default {
        name: "home",
        data() {
            return {
                username: '',
                password: '',
                captcha: '',
                pic: '', //验证码图片
                mutex: false,
                sqlData: [],
                dialogVisible: false,
                username_choice: '',
                delAll: false,
            }
        },
        methods: {
            ...mapMutations(['setUsername']),
            gotoHome(data) {
                this.$notify.success({message: '登录成功'});
                $.each($.parseHTML(data), (i, item) => {
                    if (item.id === 'navbar') {
                        let name = $($.parseHTML($(item).find('.user-info:first').html())[2]).text().trim();
                        this.setUsername(name);
                        this.$router.push('/home');
                    }
                });
            },
            _Login() {
                let loadinstance = this.$loading({
                    fullscreen: true,
                    text: '正在登录...'
                });

                login(this.username, this.password, this.captcha).then(res => {
                    this._addUser(this.username, this.password);
                    loadinstance.close();
                    this.gotoHome(res.data);
                }).catch(err => {
                    let bad = err.response.request.responseURL;
                    if (bad.endsWith('badCaptcha'))
                        this.$notify.error({message: '验证码错误'});
                    if (bad.endsWith('badCredentials'))
                        this.$notify.error({message: '账号或密码错误'});
                    loadinstance.close();
                    this._getCaptcha();
                });
            },
            _getCaptcha() {
                getCaptcha().then(response => {
                    this.pic = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                });
            },
            _addUser(username, password) {
                addUser(username, password, () => {
                    this.flashUser();
                });
            },
            _delUser(username) {
                delUser(username, () => {
                    this.flashUser();
                });
                this.dialogVisible = false;
            },
            imRead(imageSource) {
                let img = null;
                img = document.getElementById(imageSource);

                let canvas = null;
                let ctx = null;

                canvas = document.createElement("canvas");
                canvas.width = 180;
                canvas.height = 60;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 180, 60);
                let temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let array = nShapeArray(null, 1, 60, 180, 3);
                array[0].forEach((value, item1, arr) => {
                    arr[item1].forEach((value, item2, arr) => {
                        arr[item2].forEach((value, item3, arr) => {
                            arr[item3] = temp.data[4 * (item1 * 180 + item2) + item3] / 255.0;
                        })
                    });
                });
                return array;
            },
            getYZM() {
                if (this.mutex)
                    return;
                if (this.GLOBAL.MODEL() == null)
                    return;
                this.mutex = true;
                this.captcha = tf.tidy(() => {
                    let data = tf.tensor4d(this.imRead('captcha'));
                    let predict = this.GLOBAL.MODEL().predict(data);
                    return predict.reduce((data, item) => {
                        return data + this.GLOBAL.characters[item.as1D().argMax().arraySync()];
                    }, '');
                });
                this.mutex = false;
            },
            querySearch(queryString, cb) {
                let temp = this.sqlData;
                let result = queryString ?
                    this.sqlData.filter((item) => {
                        return (item.username.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    }) : temp;
                cb(result);
            },
            handleSelect(item) {
                this.username = item.username;
                this.password = item.password;
            },
            flashUser() {
                getUserList((data) => {
                    this.sqlData = data;
                });
            }
        },
        mounted() {
            let loadinstances = this.$loading({fullscreen: true, text: '缓存登录中...'});
            let ifLoginSuccess = false;
            tryLogin().then(res => {

                if (res.request.responseURL.endsWith('index.jsp')) {
                    ifLoginSuccess = true;
                    this.gotoHome(res.data);
                }
            }).finally(() => {
                loadinstances.close();
                if (!ifLoginSuccess) {
                    let loadinstance = this.$loading({fullscreen: true, text: '模型加载中...'});
                    let index = 0;
                    let interval = setInterval(() => {
                        if (index++ > 100) {
                            clearInterval(interval);
                            loadinstance.close();
                            this.$notify.error({message: '模型加载失败'});
                        }
                        if (this.GLOBAL.MODEL() != null) {
                            clearInterval(interval);
                            loadinstance.close();
                            this.$notify.success({message: '模型加载成功'});
                            document.getElementById('captcha').onload = () => {
                                this.getYZM();
                            };
                            this._getCaptcha();
                        }
                    }, 100);
                    this.flashUser();
                }
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .content {
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .el-col {
    min-height: 60px;
  }

  .el-input__inner {
    height: 60px;
  }

  .usernameClass {
    i {
      float: right;
    }

  }

  .is-active {
    color: #606266;
  }

</style>
