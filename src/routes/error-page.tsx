import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col text-center min-h-screen justify-center"
    >
      <h1 className="text-4xl p-8">Oops!</h1>
      <p className="p-4">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
