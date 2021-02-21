import axios from 'axios';

//movie databaseからのbaseURLリクエストを作成
const instance = axios.create({
  baseURL:"https://api.themoviedb.org/3",
});

//named export
export default instance;