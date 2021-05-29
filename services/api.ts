import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

// const cookies = parseCookies();
let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // console.log(error.response.status);
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        // renovar token
        cookies = parseCookies(); // pegar os cookies atualizados

        const { 'nextauth.refreshToken': refreshToken } = cookies;

        api
          .post('/refresh', {
            refreshToken,
          })
          .then((response) => {
            const { token } = response.data;

            setCookie(undefined, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });
            setCookie(
              undefined,
              'nextauth.refreshToken',
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              }
            );

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
          });

          
      } else {
        // delogar usuário
      }
    }
  }
);
