import * as tf from '@tensorflow/tfjs'
import {vue} from './main'

let db = null;
let model = null;

//打开数据库
document.addEventListener('deviceready', () => {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default'
  });
  //数据库表初始化
  db.transaction((tx) => {
    tx.executeSql('create table if not exists user (username varchar(20) primary key, password varchar(50))');
  }, error => {
    console.log("error:" + error.message)
  }, () => {
    console.log("OK");
  });
  let exitAppTicker = 0;

  document.addEventListener('backbutton', () => {
    console.log(vue.$route.path);
    if (exitAppTicker === 0) {
      exitAppTicker++;
      window.plugins.toast.showShortBottom('再点一次退出!');
      setTimeout(function () {
        exitAppTicker = 0;
      }, 2000);
    } else if (exitAppTicker === 1) {
      navigator.app.exitApp(); //退出app
    }
  });
});

async function loadModel() {
  model = await tf.loadLayersModel('https://github.com/wuuuudle/SCUExtension/raw/master/model/model.json');
  return model;
}

loadModel().then();

const MODEL = () => {
  return model;
};

const DB = () => {
  return db;
};

const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

export default {
  DB, MODEL, characters
}
