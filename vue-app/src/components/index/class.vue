<template>
  <div class="background" v-loading="loading">
    <el-select
      v-model="valueA"
      placeholder="学期"
      @change="academicSelect">
      <el-option
        v-for="item in academicTerm"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select
      v-model="valueB"
      placeholder="周次"
      @change="weekSelect">
      <el-option
        v-for="item in weeks"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div style="height: 100%;overflow: scroll;display: grid;">
      <!--table style="width: 100%">
        <thead>
        <tr>
          <th colspan="2">节次</th>
          <th>星期日</th>
          <th>星期一</th>
          <th>星期二</th>
          <th>星期三</th>
          <th>星期四</th>
          <th>星期五</th>
          <th>星期六</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in trs" :style="'background-color:'+item.color">
          <th v-if="item.num" :rowspan="item.num">{{item.big}}</th>
          <th>{{item.small}}</th>
          <td v-for="j in Array.from(Array(7),(v,k)=>(k+6)%7+1)" :id="j+'_'+(i+1)">
            {{j+'_'+(i+1)}}
          </td>
        </tr>
        </tbody>
      </table-->
      <div v-for="item in girdLayout" :style="item.area">{{item.name}}</div>
    </div>
    <el-button @click="test">testButton</el-button>
  </div>
</template>

<script>
    import {getAcademicTerm, getCourseTable} from "../../api";
    import $ from 'jquery';

    export default {
        name: "class",
        data() {
            return {
                loading: false,
                academicTerm: [],
                weeks: [],
                valueA: '',
                valueB: '',
                trs: [{big: '第一大节', num: 2, small: '第一节', color: 'rgba(207,255,228,0.7)'},
                    {big: '', num: 0, small: '第二节', color: 'rgba(207,255,228,0.7)'},
                    {big: '第二大节', num: 2, small: '第三节', color: 'rgba(207,255,228,0.7)'},
                    {big: '', num: 0, small: '第四节', color: 'rgba(207,255,228,0.7)'},
                    {big: '第三大节', num: 3, small: '第五节', color: 'rgba(255,230,207,0.7)'},
                    {big: '', num: 0, small: '第六节', color: 'rgba(255,230,207,0.7)'},
                    {big: '', num: 0, small: '第七节', color: 'rgba(255,230,207,0.7)'},
                    {big: '第四大节', num: 2, small: '第八节', color: 'rgba(255,230,207,0.7)'},
                    {big: '', num: 0, small: '第九节', color: 'rgba(255,230,207,0.7)'},
                    {big: '第五大节', num: 3, small: '第十节', color: 'rgba(207,228,255,0.7)'},
                    {big: '', num: 0, small: '第十一节', color: 'rgba(207,228,255,0.7)'},
                    {big: '', num: 0, small: '第十二节', color: 'rgba(207,228,255,0.7)'}],
                girdLayout: [
                    {area: 'grid-area: 1/1/2/3', name: '节次'},
                    {area: 'grid-area: 1/3/2/4', name: '星期日'},
                    {area: 'grid-area: 1/4/2/5', name: '星期一'},
                    {area: 'grid-area: 1/5/2/6', name: '星期二'},
                    {area: 'grid-area: 1/6/2/7', name: '星期三'},
                    {area: 'grid-area: 1/7/2/8', name: '星期四'},
                    {area: 'grid-area: 1/8/2/9', name: '星期五'},
                    {area: 'grid-area: 1/9/2/10', name: '星期六'},
                    {area: 'grid-area: 2/1/4/2', name: '第一大节'},
                    {area: 'grid-area: 4/1/6/2', name: '第二大节'},
                    {area: 'grid-area: 6/1/9/2', name: '第三大节'},
                    {area: 'grid-area: 9/1/11/2', name: '第四大节'},
                    {area: 'grid-area: 11/1/14/2', name: '第五大节'},
                    {area: 'grid-area: 2/2/3/3', name: '第一节'},
                    {area: 'grid-area: 3/2/4/3', name: '第二节'},
                    {area: 'grid-area: 4/2/5/3', name: '第三节'},
                    {area: 'grid-area: 5/2/6/3', name: '第四节'},
                    {area: 'grid-area: 6/2/7/3', name: '第五节'},
                    {area: 'grid-area: 7/2/8/3', name: '第六节'},
                    {area: 'grid-area: 8/2/9/3', name: '第七节'},
                    {area: 'grid-area: 9/2/10/3', name: '第八节'},
                    {area: 'grid-area: 10/2/11/3', name: '第九节'},
                    {area: 'grid-area: 11/2/12/3', name: '第十节'},
                    {area: 'grid-area: 12/2/13/3', name: '第十一节'},
                    {area: 'grid-area: 13/2/14/3', name: '第十一节'}],
            }
        },
        methods: {
            academicSelect() {
                this.valueB = -1;
                this.loading = true;
                getCourseTable(this.valueA).then(response => {
                    console.log(response.data);
                    this.loading = false;
                });
            },
            weekSelect() {
                console.log(this.valueB);
            },
            test() {
                String.prototype.format = function (args) {
                    let result = this;
                    if (arguments.length > 0) {
                        if (arguments.length === 1 && typeof (args) == "object") {
                            for (let key in args) {
                                if (args[key] !== undefined) {
                                    let reg = new RegExp("({" + key + "})", "g");
                                    result = result.replace(reg, args[key]);
                                }
                            }
                        } else {
                            for (let i = 0; i < arguments.length; i++) {
                                if (arguments[i] !== undefined) {
                                    let reg = new RegExp("({)" + i + "(})", "g");
                                    result = result.replace(reg, arguments[i]);
                                }
                            }
                        }
                    }
                    return result;
                };
            }
        },
        mounted() {
            //debug
            //this.loading = true;
            this.weeks.push({
                label: '总览',
                value: -1
            });
            for (let i = 0; i < 24; i++)
                this.weeks.push({
                    label: '第' + (i + 1) + '周',
                    value: i
                });
            getAcademicTerm().then(response => {
                $.each($.parseHTML(response.data), (i, item) => {
                    if (item.id === 'main-container') {
                        this.academicTerm = $.map($(item).find('#planCode option'), (item) => {
                            let temp = $(item);
                            return {
                                label: temp.text().trim(),
                                value: temp.attr('value')
                            }
                        });
                        this.valueA = this.academicTerm.length !== 0 ? this.academicTerm[0].value : '';
                        this.loading = false;
                    }
                });
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

  table {
    background-color: white;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-spacing: 0;

    td {
      border: 1px solid #ddd;
      height: 80px;
      max-height: 80px;
      max-width: 50px;
      padding: 0;
    }

    th {
      font-size: 14px;
      font-weight: normal;
      color: #909399;
      border: 1px solid #ddd;
      padding: 0;
    }

    thead {
      th {
        min-width: 50px;
      }
    }

    tbody {
      th {
        height: 75px;
      }
    }
  }
</style>
