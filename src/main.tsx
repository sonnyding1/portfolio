import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Project, { loader as projectLoader } from "./routes/project.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import mixpanel from "mixpanel-browser";
import { PostHogProvider } from "posthog-js/react";

mixpanel.init("e009bb1b3f206a98da6a7784a5495e76", {
  track_pageview: true,
  ignore_dnt: true,
  persistence: "localStorage",
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
    <PostHogProvider
      apiKey="phc_npn686JeeLdaGoCHOdFvqNb289AFZk3W3T11ohrLgb5"
      options={{ api_host: "https://app.posthog.com" }}
    >
      <NextUIProvider>
        {/* <App /> */}
        <RouterProvider router={router} />
        <Analytics />
        <SpeedInsights />
      </NextUIProvider>
    </PostHogProvider>
  </React.StrictMode>
);
