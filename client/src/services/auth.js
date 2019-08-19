import * as jwt_decode from 'jwt-decode';

export const TOKEN_KEY = "token-agenda";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const isAdm = () => {
  const token = getToken();
  if (token) {
    const tokenInfo = jwt_decode(token);
    const { scope, authorities } = tokenInfo;
    return scope.includes('read') && authorities.includes('ROLE_CADASTRAR');
  } else {
    return false;
  }
}

export const userName = () => {
  const token = getToken();
  if (token) {
    const { nome } = jwt_decode(token);
    return nome;
  }
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);

};