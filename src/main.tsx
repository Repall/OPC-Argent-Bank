import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import P404 from "./pages/P404.tsx";


import { Provider } from "react-redux";
import store from "./app/store.ts";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <P404 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

console.warn = (...args) => {
  if (!args[0]?.includes('React Router Future Flag Warning')) {
    console.warn(...args);
  }
};