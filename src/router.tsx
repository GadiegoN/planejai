import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <h1>Hello, World!</h1>,
      },
      {
        path: "/resultado",
        element: <h1>Resultado da rota!</h1>,
      },
      {
        path: "/historico",
        element: <h1>Histórico da rota!</h1>,
      },
    ],
  },
]);
