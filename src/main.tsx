import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Project, { loader as projectLoader } from "./routes/project.tsx";
import { inject } from "@vercel/analytics"; // Import inject

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "projects/:projectId",
    element: <Project />,
    loader: projectLoader,
    errorElement: <ErrorPage />,
  },
]);

inject(); // Inject the analytics

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
