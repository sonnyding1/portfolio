import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the directory containing the markdown files
const directory = path.join(process.cwd(), "src/projects");

// Read all file names in the directory
const filenames = fs.readdirSync(directory);

// Map each filename to its parsed frontmatter
const projects = filenames.map((filename) => {
  // Construct the full path of the file
  const filePath = path.join(directory, filename);

  // Read the file contents
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse the frontmatter of the markdown file
  // const { data } = matter(fileContents);
  const { data, content } = matter(fileContents);
  const { id, title, technologies, featured, og } = data;

  // Return the parsed data
  return { id, title, technologies, featured, og, body: content };
});

// Define the output path
const outputPath = path.join(process.cwd(), "src/projects.json");

// Write the data to the output file
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
