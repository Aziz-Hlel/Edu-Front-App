import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import getUrl from '../useContext/getUrl';




export type authTokensType = {
    access: string;
    refresh: string
}





const useAxios = (): AxiosInstance => {
  const navigate = useNavigate();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: getUrl(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    instance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refresh_token');

          if (refreshToken) {
            try {
              const { data } = await axios.post(getUrl()+'users/token/refresh/', { refresh: refreshToken });
              localStorage.setItem('access_token', data.access);

              // Update the Authorization header and retry the original request
              originalRequest.headers.Authorization = `Bearer ${data.access}`;
              return instance(originalRequest);
            } catch (refreshError) {
              // If refresh token fails, redirect to the login page
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              navigate('/login');
            }
          } else {
            // No refresh token available, redirect to login
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [navigate]);

  return axiosInstance;
};

export default useAxios;


































// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import getUrl from "../useContext/getUrl";
// import { useAuth } from "../useContext/AuthContext";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";







// const useAxios = () => {
    
//     const { authTokens, setUser, setAuthTokens } = useAuth()
//     const baseURL = getUrl();
//     const navigate = useNavigate()
//     const axiosInstance = axios.create({
//         baseURL,
//         headers: { Authorization: `Bearer ${authTokens?.access}`, }
//     });


//     axiosInstance.interceptors.response.use(
//         (response) => {
//             return response;
//         },

//         async function (error) {

//             const originalRequest = error.config;

//             if (typeof error.response === 'undefined') {
//                 alert(
//                     'A server/network error occurred. ' +
//                     'Looks like CORS might be the problem. ' +
//                     'Sorry about this - we will get it fixed shortly.'
//                 );
//                 Swal.fire({
//                     icon: "error",
//                     title: "La connexion au serveur a échoué ",
//                     text: "N'hésitez pas à nous contacter au numéro 50099988 pour résoudre le problème",
//                     showConfirmButton: false,
//                     width: 750,

//                 });

//                 return Promise.reject(error);
//             }

//             if (
//                 error.response.status === 401 &&
//                 originalRequest.url === baseURL + 'users/token/refresh/'
//             ) {
//                 // window.location.href = '/login/';
//                 console.log('token expired mche l login')
//                 navigate('/login')
//                 return Promise.reject(error);
//             }

//             if (
//                 error.response.data.code === 'token_not_valid' &&
//                 error.response.status === 401 &&
//                 error.response.statusText === 'Unauthorized'
//             ) {
//                 const authTokens: authTokensType | null = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null;

//                 if (authTokens) {
//                     const tokenParts = JSON.parse(atob(authTokens.refresh.split('.')[1]));

//                     // exp date in token is expressed in seconds, while now() returns milliseconds:
//                     const now = Math.ceil(Date.now() / 1000);
//                     console.log(tokenParts.exp);
//                     console.log(now)
//                     if (tokenParts.exp > now) {
//                         console.log('sendin request')
//                         return await axiosInstance
//                             .post('users/token/refresh/', { refresh: authTokens.refresh })
//                             .then((response) => {

//                                 localStorage.setItem('authTokens', JSON.stringify(response.data));
//                                 axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`
//                                 originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`

//                                 const user = jwtDecode(authTokens.access);
//                                 setUser(user)
//                                 setAuthTokens(authTokens)

//                                 return axiosInstance(originalRequest);
//                             })
//                             .catch((err) => {
//                                 console.log(err);
//                             });
//                     } else {
//                         console.log('Refresh token is expired', tokenParts.exp, now);
//                         // window.location.href = '/login/';
//                         localStorage.removeItem('authTokens')

//                     }
//                 } else {
//                     console.log('Refresh token not available.');
//                     navigate('/login')
//                     // localStorage.removeItem('authTokens')
//                     // window.location.href = '/login/';
//                 }
//             }

//             // specific error handling done elsewhere
//             return Promise.reject(error);
//         }
//     );


//     return axiosInstance;
// };

// export default useAxios;












// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";
// import getUrl from "../useContext/getUrl";
// import { useAuth } from "../useContext/AuthContext";


// export type authTokensType = {
//     access: string;
//     refresh: string
// }


// const baseURL = getUrl();

// const useAxios = () => {
//     const { authTokens, setUser, setAuthTokens } = useAuth()

//     const axiosInstance = axios.create({
//         baseURL,
//         headers: { Authorization: `Bearer ${authTokens?.access}`, }
//     });

//     axiosInstance.interceptors.request.use(async req => {
//         const user = jwtDecode(authTokens.access);
//         const isExpired = dayjs.unix((user.exp) as any).diff(dayjs()) < 1;

//         console.log('t5l axios')
//         if (!isExpired) return req;

//         const response = await axios.post(`${baseURL}users/token/refresh/`, {
//             refresh: authTokens.refresh
//         });
//         localStorage.setItem("authTokens", JSON.stringify(response.data));
//         // localStorage.setItem("authTokens", JSON.stringify(response.data));

//         setAuthTokens(response.data);
//         setUser(jwtDecode(response.data.access));

//         req.headers.Authorization = `Bearer ${response.data.access}`;
//         return req;
//     });

//     return axiosInstance;
// };

// export default useAxios;