import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
