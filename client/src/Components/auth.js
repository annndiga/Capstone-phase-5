import { createAuthProvider } from 'react-token-auth';

const {
  useAuth,
  authFetch,
  login,
  logout,
} = createAuthProvider({
  accessTokenKey: 'access_token',
  onUpdateToken: (token) =>
    fetch('/auth/refresh', {
      method: 'POST',
      body: token.new_access_token,
    }).then((r) => r.json()),
});

export { useAuth, authFetch, login, logout };