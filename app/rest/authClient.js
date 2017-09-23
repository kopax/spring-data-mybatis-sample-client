import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import { stringify } from 'query-string';
import { getCookie, getParameter, checkStatus, parseJSON } from 'util-request';

const oauthClient = {
  clientId: 'backoffice',
  clientSecret: 'backoffice',
  accessTokenUri: 'http://localhost:8080/oauth/token',
  authorizationUri: 'http://localhost:8080/oauth/authorize',
  authorizationGrants: ['code'],
  redirectUri: 'http://localhost:8080/cb/backoffice',
  scopes: [
    'write',
  ],
};

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    // 1. first cookie
    const fetchCookie = (request) => fetch(request)
      .catch((error) => Promise.resolve(error));
    // 2. user session
    const fetchUserSession = (request) => fetch(request);
    // 3. authorization code
    const fetchOAuthCode = (request) => fetch(request);
    // 4. jwt
    const fetchOAuthJwt = (request) => fetch(request);

    const requestFail = new Request('http://localhost:8080/', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetchCookie(requestFail)
      .then(() => {
        const requestUser = new Request(`http://localhost:8080/login?${stringify(params)}`, {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          }),
        });
        return fetchUserSession(requestUser);
      })
      .then(() => {
        const paramsCode = {
          response_type: 'code',
          client_id: oauthClient.clientId,
          redirect_uri: oauthClient.redirectUri,
        };
        const requestOAuthCode = new Request(`${oauthClient.authorizationUri}?${stringify(paramsCode)}`, {
          method: 'GET',
          credentials: 'include',
        });
        return fetchOAuthCode(requestOAuthCode);
      })
      .then((response) => {
        const code = getParameter('code', response.url);
        if (!code) {
          return Promise.reject(new Error('It appear there is a problem with your account, please contact the webmaster.'));
        }
        return Promise.resolve(code);
      })
      .then((code) => {
        const paramsJwt = {
          grant_type: 'authorization_code',
          redirect_uri: oauthClient.redirectUri,
          code,
        };
        if (params.scope) {
          paramsJwt.scope = typeof params.scope === 'string' ? params.scope : params.scope.join(' ');
        }
        const requestOAuthJwt = new Request(`${oauthClient.accessTokenUri}?${stringify(paramsJwt)}`, {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            Authorization: `Basic ${btoa(`${oauthClient.clientId}:${oauthClient.clientSecret}`)}`,
            'Content-type': 'application/x-www-form-urlencoded',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          }),
        });
        return fetchOAuthJwt(requestOAuthJwt);
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((jwt) => localStorage.setItem('jwt', JSON.stringify(jwt)));
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('jwt');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem('jwt');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('jwt') ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject('Unknown method');
};
