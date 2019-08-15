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
    <div class="CTable">
      <!-- 添加表头 -->
      <div v-for="item in girdLayout" :style="item.area">{{item.name}}</div>
      <!-- 添加背景颜色 -->
      <div style=" grid-area: 2/1/6/10;z-index: 0;background-color: rgba(207,255,228,0.5);border: 0"></div>
      <div style=" grid-area: 6/1/11/10;z-index: 0;background-color: rgba(255,230,207,0.5);border: 0"></div>
      <div style=" grid-area: 11/1/14/10;z-index: 0;background-color: rgba(207,228,255,0.5);border: 0"></div>
      <!-- 展示课程 -->
      <template v-for="item in classInfo">
        <div v-for="times in item.time" class="clazz"
             :style="'grid-area: '+(times.classSession+1)+'/'+(times.classDay%7+3)+'/'+(times.classSession+times.continuingSession+1)+'/'+(times.classDay%7+4)">
          {{item.name+'@'+times.location}}
        </div>
      </template>
    </div>
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
                valueB: -1,
                girdLayout: [
                    {area: 'grid-area: 1/1/2/3', name: '节 次'},
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
                    {area: 'grid-area: 13/2/14/3', name: '第十二节'}],
                classInfo: [],
                originData: {}
            }
        },
        methods: {
            academicSelect() {
                this.valueB = -1;
                this.loading = true;
                getCourseTable(this.valueA).then(response => {
                    this.originData = response.data;
                    this.show();
                    this.loading = false;
                });
            },
            weekSelect() {
                this.show();
            },
            show() {
                this.classInfo = this.originData.dateList[0].selectCourseList.map(item => {
                    let name = item.courseName;
                    let time = null;
                    if (item.timeAndPlaceList)
                        time = item.timeAndPlaceList.filter(item2 => {
                            if (this.valueB === -1)
                                return true;
                            return item2.classWeek[this.valueB] === '1';
                        }).map(item2 => {
                            let classDay = item2.classDay;
                            let classSession = item2.classSessions;
                            let continuingSession = item2.continuingSession;
                            let location = item2.campusName + item2.teachingBuildingName + item2.classroomName;
                            return {classDay, classSession, continuingSession, location}
                        });
                    return {name, time};
                });
            }
        },
        mounted() {
            this.loading = true;
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
                        this.loading = false;
                        if (this.academicTerm.length !== 0) {
                            this.valueA = this.academicTerm[0].value;
                            this.academicSelect();
                        }
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

  .CTable {
    user-select: none;
    background-color: white;
    height: 100%;
    overflow: scroll;
    display: grid;
    grid-template-columns: 30px 30px 60px 60px 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 75px 75px 75px 75px 75px 75px 75px 75px 75px 75px 100px 100px;

    .clazz {
      display: block;
      overflow-wrap: break-word;
      border-radius: 10px;
      background-color: rgba(9*16, 9*16+3, 9*16+9, 0.5);
      padding-top: 5px;
      font-size: 12px;
      z-index: 1;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: normal;
      color: #909399;
      padding: 0;
      border: 1px solid #ddd;
      margin-right: -1px;
      margin-bottom: -1px;
      z-index: 1;
    }
  }

</style>
