import { fetchUtils } from 'admin-on-rest';
import { getCookie } from 'util-request';

/* eslint-disable no-param-reassign */
export default (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  const jwtString = localStorage.getItem('jwt');
  if (jwtString) {
    const { access_token: accessToken } = JSON.parse(jwtString);
    options.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (options.method && ['PUT', 'POST', 'PATCH', 'DELETE'].includes(options.method)) {
    options.headers.set('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    console.log('httpClient', url);
    console.log('httpClient options', options);
  }
  return fetchUtils.fetchJson(url, options);
};
