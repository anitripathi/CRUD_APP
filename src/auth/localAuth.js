const USERS_KEY = 'users';
const AUTH_KEY = 'is_authenticated';
const CURRENT_USER_KEY = 'current_user';

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
export const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
export const isAuthenticated = () => JSON.parse(localStorage.getItem(AUTH_KEY)) === true;

export const signup = (email, password) => {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User already exists');
  }
  const newUser = { email, password };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const login = (email, password) => {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error('Invalid email or password');

  localStorage.setItem(AUTH_KEY, JSON.stringify(true));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};
