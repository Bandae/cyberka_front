import axios from "axios";
// 3000
export default (
  auth = false,
  url = 'http://localhost:8000/api/'
  ) => {
  if (auth) {
    return axios.create({
      withCredentials: true,
      baseURL: url,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken'
    });
  }
  return axios.create({
    baseURL: url
  });
};
