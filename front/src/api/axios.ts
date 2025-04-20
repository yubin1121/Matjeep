import axios from 'axios'

const axiosInstance = axios.create({

	baseURL: 'http://localhost:3030',
    //안드로이드는 로컬호스트 연결안됨.
    //baseURL: 'http://10.0.2.2:3030',
	withCredentials : true,
});

export default axiosInstance;