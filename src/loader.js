const URL = "http://localhost:4000";

export const loginLoader = async () => {
  const response = await fetch(URL + "/login");
  const login = await response.json();
  return login;
};

export const signupLoader = async () => {
  const response = await fetch(URL + "/signup");
  const signup = await response.json();
  return signup;
};
