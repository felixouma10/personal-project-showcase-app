import { useState } from "react";
import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import { useProjectContext } from "../context/useProjectContext";

function ProjectList() {
  const { projects, loading, error } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <p className="text-center">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase();

    return (
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.category.toLowerCase().includes(search) ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(search)
      )
    );
  });

  return (
    <section>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-600">
          No projects found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectList;