import axios from "axios";
const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/api/v1`;

const axiosinstance=axios.create();
axiosinstance.defaults.baseURL=BASE_URL;
axiosinstance.defaults.withCredentials=true;
export default axiosinstance;