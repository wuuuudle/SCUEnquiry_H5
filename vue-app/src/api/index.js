import http from './public'

//post对象由object转换为string对象
function convert(params) {
  let result = '';
  for (let index in params) {
    result = result + index + '=' + params[index] + '&';
  }
  return result.substring(0, result.length - 1);
}

//获取验证码
export const getCaptcha = () => {
  return http.fetchGet('/img/captcha.jpg', {responseType: 'arraybuffer'});
};

//登录
export const login = (username, password, captcha) => {
  let params =
    convert({
      j_username: username,
      j_password: password,
      j_captcha: captcha
    });
  return http.fetchPost('/j_spring_security_check', params)
};

//缓存登录
export const tryLogin = () => {
  return http.fetchGet('/index.jsp');
};

//退出
export const logOut = () => {
  return http.fetchGet('/logout');
};

//得到照片
export const getPhoto = () => {
  return http.fetchGet('/main/queryStudent/img', {responseType: 'arraybuffer'});
};

//得到学期列表
export const getAcademicTerm = () => {
  return http.fetchGet('/student/courseSelect/calendarSemesterCurriculum/index');
};

//获取课表
export const getCourseTable = (planCode) => {
  return http.fetchPost('/student/courseSelect/thisSemesterCurriculum/ajaxStudentSchedule/callback', '&planCode=' + planCode);
};

export const nShapeArray = (value, ...shape) => {
  if (shape.length === 0) return value;
  let result = new Array(shape[0]);
  let arg = shape.slice(1);
  for (let i = 0; i < shape[0]; i++)
    result[i] = nShapeArray(value, ...arg);
  return result;
};
