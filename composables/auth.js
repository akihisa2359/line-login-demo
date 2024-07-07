export const useAuth = () => {
  const me = useState("me", () => null);

  const login = (user) => {
    me.value = user;
  };

  const logout = () => {
    me.value = null;
  };

  return {
    me,
    login,
    logout,
  };
};
