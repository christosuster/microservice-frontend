// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://0.0.0.0:8000/api/', // Replace with your backend URL
// });

export const register = (props) => {
  const { first_name, last_name, email, username, password, confirmPassword } = props;
  console.log("props ",props)

  fetch('http://0.0.0.0:8000/api/register/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "username": username,
      "password": password,
      "confirm_password": confirmPassword
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw err; });
    }
    return res.json();
  })
  .then(data => {
    console.log("Registration successful:", data);
  })
  .catch(error => {
    console.error("Registration failed:", error);
  });
};

// Add more API calls as needed


