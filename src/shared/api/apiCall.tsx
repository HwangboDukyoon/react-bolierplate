// axiosConfig.js
import Axios from 'axios';

//refreshToken을 주기 받기 위한 설정
Axios.defaults.withCredentials = true;

//API URL 설정
const apiHost = import.meta.env.VITE_APP_HOST;
const apiPort = import.meta.env.VITE_APP_PORT;
const apiUrl = `${apiHost}:${apiPort}`;
console.log(`==== API CALL :> API 호출 정보 : ${apiUrl}`)

const apiCall = Axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiCall.interceptors.request.use(
    (config: any) => {
        if (!config.headers) return config;
        let accessToken: string | null = null;
        accessToken = sessionStorage.getItem('accessToken');
        if (accessToken !== null) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (err: any) => {
        return Promise.reject(err);
    },
);
apiCall.interceptors.response.use(
    (config: any) => {
        return config;
    },
    (err: any) => {
        //백엔드 자체가 죽어있을 경우 무조건 서버 이상 페이지로 이동
        const code = err.code;
        if (code === "ERR_NETWORK") {
            sessionStorage.clear();

            window.location.href = "/common/errorPage";
        }

        //현재 권한 없음으로 떨어지는 케이스는 로그인 후 서버 재기동 시 발생(토큰 값 유효하지 않음)
        //이 경우 로그아웃 처리 후 로그인 페이지로 이동 시킨다.
        //지금은 임시 조치. 추후에 refresh Token을 이용하여 재시도 해주자.
        //참고 : https://gusrb3164.github.io/web/2022/08/07/refresh-with-axios-for-client/
        console.log(err)
        const errorStatus = err.response.status;
        if (errorStatus === 401) {
            // const message = err.response.data.error;
            // if (message === "Unauthorized") {
            //     return errorAlert(err.response.data.message)
            // } else if (message === "USER_NOT_FOUNT") {
            //     return errorAlert("존재하지 않는 아이디입니다.")
            // } else {
            //     // 세션 만료
            //     sessionStorage.clear();
            //     window.location.href = "/";
            // }
            sessionStorage.clear();
            window.location.href = "/";
        } else {
            return Promise.reject(err);
        }
    },
);
export default apiCall;
