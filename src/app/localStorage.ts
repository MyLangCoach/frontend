const local = window.localStorage;

const EXPIRATION_KEY = "auth_expiration";

export const getStorageValue = (key: string) => {
  const expiration = JSON.parse(local.getItem(EXPIRATION_KEY)!);
  if (expiration && new Date().getTime() > expiration) {
    local.removeItem(key);
    local.removeItem(EXPIRATION_KEY);
    window.location.replace("/login"); // Redirect to login page
    return null;
  }
  return JSON.parse(local.getItem(key)!);
};

export const setStorageValue = ({
  key,
  value,
  expirationInDays,
}: {
  key: string;
  value: string | boolean;
  expirationInDays?: number;
}) => {
  if (expirationInDays) {
    const expiration =
      new Date().getTime() + expirationInDays * 24 * 60 * 60 * 1000;
    local.setItem(EXPIRATION_KEY, JSON.stringify(expiration));
  }
  return local.setItem(key, JSON.stringify(value));
};

export const removeStorageValue = (key: string) => {
  local.removeItem(EXPIRATION_KEY);
  return local.removeItem(key);
};
