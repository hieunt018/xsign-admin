const TOKEN_ITEM = "token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_ITEM, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_ITEM);
};

export const revokeToken = () => {
  localStorage.removeItem(TOKEN_ITEM);
};

