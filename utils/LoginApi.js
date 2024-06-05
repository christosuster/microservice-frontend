import { loginSuccess } from '../store/auth/authSlice';
import { toast } from "@/components/ui/use-toast";

export const login = async (props, dispatch) => {
  const { username, password } = props;

  try {
    fetch('http://0.0.0.0:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      }),
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
      })
      .then(data => {
          dispatch(loginSuccess({ access: data.access, refresh: data.refresh, isLoggedIn: data.isLoggedIn }));
      })
      .catch(error => {
          console.error("Login failed:", error);
          toast({
            title: "Login Failed",
            description:"Wrong Credential"
          });
      });

    } catch (error) { 
        console.error('API failed:', error);
  }
};
