import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getProjectById } from "../scripts/projects";

interface Params {
  id: string;
}

export async function loader({ params }: LoaderFunctionArgs<Params>) {
  console.log(params.projectId);
  const { title, description, body } = (await getProjectById(
    params.projectId || ""
  )) || { title: "", description: "", body: "" };
  return { title, description, body };
}

export default function Project() {
  const project = useLoaderData() as {
    title: string;
    description: string;
    body: string;
  };

  return (
    <div>
      <h1 className="text-4xl">{project.title}</h1>
      <p>{project.description}</p>
      <p>{project.body}</p>
    </div>
  );
}
