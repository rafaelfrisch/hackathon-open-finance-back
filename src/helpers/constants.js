export const apiUrl = "/api";

export const publicRoutes = [
  {
    method: 'GET',
    path: `${apiUrl}`,
  },
  {
    method: 'POST',
    path: `${apiUrl}/users/login`,
  },
  {
    method: 'POST',
    path: `${apiUrl}/users`,
  },
];
