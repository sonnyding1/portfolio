import { Badge } from "@/components/ui/badge";
import { getAllTags } from "@/scripts/projects";
import { Link } from "react-router-dom";

function Tags() {
  const tags = getAllTags();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="my-32">
        <p className="font-bold text-5xl py-8" id="about">
          Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(([tag, count]) => (
            <Link key={tag} to={`/tags/${tag}`}>
              <Badge
                key={tag}
                variant="secondary"
                className="text-md px-4 text-gray-400 transition duration-500 ease-in-out hover:scale-105 cursor-pointer active:bg-gray-200"
              >
                #<span className="text-black">{tag}</span>: {count}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
