import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getProjectById } from "../scripts/projects";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Params {
  id: string;
}

export async function loader({ params }: LoaderFunctionArgs<Params>) {
  const { title, body } = (await getProjectById(params.projectId || "")) || {
    title: "",
    body: "",
  };
  return { title, body };
}

export default function Project() {
  const project = useLoaderData() as {
    title: string;
    body: string;
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-5xl mx-auto p-8">
        <span
          onClick={() => navigate(-1)}
          className="transition duration-300 ease-in-out transform hover:text-blue-500 hover:underline cursor-pointer"
        >
          &laquo; Go Back
        </span>
        <h1 className="font-bold text-5xl py-8 ">{project.title}</h1>
        <Markdown
          components={{
            p: ({ node, ...props }) => <p className="py-4" {...props} />,
            a: ({ node, ...props }) => <a className="underline" {...props} />,
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold py-8" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-semibold py-6" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-semibold py-4" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc px-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal px-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="py-0" {...props} />,
            img: ({ node, ...props }) => (
              <img className="rounded-lg m-2" {...props} />
            ),
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dracula}
                  ref={null}
                  className="rounded-md p-4 overflow-x-scroll"
                />
              ) : (
                <code {...rest} className="bg-gray-200 rounded-sm px-1">
                  {children}
                </code>
              );
            },
          }}
        >
          {project.body}
        </Markdown>
      </div>
    </div>
  );
}
