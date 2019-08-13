import http from './public'

function convert(params) {
  let result = '';
  for (let index in params) {
    result = result + index + '=' + params[index] + '&';
  }
  return result.substring(0, result.length - 1);
}

export const getCaptcha = () => {
  return http.fetchGet('/img/captcha.jpg', {responseType: 'arraybuffer'});
};

export const login = (username, password, captcha) => {
  let params =
    convert({
      j_username: username,
      j_password: password,
      j_captcha: captcha
    });
  return http.fetchPost('/j_spring_security_check', params)
};

export const tryLogin = () => {
  return http.fetchGet('/index.jsp');
};

export const logOut = () => {
  return http.fetchGet('/logout');
};

export const nShapeArray = (value, ...shape) => {
  if (shape.length === 0) return value;
  let result = new Array(shape[0]);
  let arg = shape.slice(1);
  for (let i = 0; i < shape[0]; i++)
    result[i] = nShapeArray(value, ...arg);
  return result;
};
