const key = "token";

function readStorage() {
  return localStorage.getItem(key);
}

function updateStorage(token) {
  localStorage.setItem(key, token);
}

function removeStorage() {
  localStorage.removeItem(key);
}

export { readStorage, updateStorage, removeStorage };
