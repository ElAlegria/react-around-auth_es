const BASE_URL = 'https://register.nomoreparties.co'

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: '',
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const getToken = (JWT)=>{
  return fetch(`${BASE_URL}/users/me`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${JWT}`
    }
  })
}