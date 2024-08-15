import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routes/error-page.tsx";
import Project, { loader as projectLoader } from "./routes/project.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import mixpanel from "mixpanel-browser";
import Layout from "./components/Layout.tsx";
import Tags from "./routes/tags.tsx";
import Home from "./routes/home.tsx";
import Tag from "./routes/tag.tsx";

mixpanel.init("e009bb1b3f206a98da6a7784a5495e76", {
  track_pageview: true,
  ignore_dnt: true,
  persistence: "localStorage",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout component
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
        loader: projectLoader,
      },
      {
        path: "tags/:tag",
        element: <Tag />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </NextUIProvider>
  </React.StrictMode>
);
