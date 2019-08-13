import Vue from 'vue'

export const getUserList = (cb) => {
  let result = [];
  Vue.prototype.GLOBAL.DB().transaction((tx) => {
    tx.executeSql('select * from user;', [], (tx, resultSet) => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        result.push(resultSet.rows.item(i));
      }
      cb(result);
    }, (tx, error) => {
    });
  });
};

export const delUser = (username, cb) => {
  Vue.prototype.GLOBAL.DB().transaction((tx) => {
    tx.executeSql('delete from user where username=?;', [username], (tx, res) => {
      cb();
    });
  });
};

export const addUser = (username, password, cb) => {
  Vue.prototype.GLOBAL.DB().transaction((tx) => {
    tx.executeSql('insert into user (username,password) values (?,?);', [username, password], (tx, res) => {
      cb();
    }, (tx, error) => {
      if (error.code === 6) {
        tx.executeSql('update user set password=? where username=?', [password, username], (tx, res) => {
          cb();
        }, (tx, error) => {
          console.log(error);
        });
      }
    });
  });
};
