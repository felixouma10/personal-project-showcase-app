import ProjectList from "../components/ProjectList";

function Projects() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          My Projects
        </h1>

        <p className="mt-2 text-gray-600">
          Browse, search, and manage my projects.
        </p>
      </div>

      <ProjectList />
    </section>
  );
}

export default Projects;