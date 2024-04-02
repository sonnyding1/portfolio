import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Project, { loader as projectLoader } from "./routes/project.tsx";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const posthogApiKey = process.env.REACT_APP_POSTHOG_API_KEY || ""; // Set a default value if the environment variable is undefined
posthog.init(posthogApiKey, {
  api_host: "https://app.posthog.com",
});

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <NextUIProvider>
        {/* <App /> */}
        <RouterProvider router={router} />
      </NextUIProvider>
    </PostHogProvider>
  </React.StrictMode>
);
