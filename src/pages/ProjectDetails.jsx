import { Link, useParams } from "react-router";
import { useProjectContext } from "../context/useProjectContext";

function ProjectDetails() {
  const { id } = useParams();
  const { projects, loading } = useProjectContext();

  const project = projects.find(
    (project) => String(project.id) === String(id)
  );

  if (loading) {
    return <p className="text-center">Loading project...</p>;
  }

  if (!project) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Project Not Found</h1>

        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
      <img
        src={project.image}
        alt={project.title}
        className="mb-6 h-80 w-full rounded-xl object-cover"
      />

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-blue-600">
          {project.category}
        </p>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {project.title}
        </h1>

        <p className="text-lg leading-relaxed text-gray-600">
          {project.description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-xl font-bold">
          Technologies
        </h2>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-gray-800 px-5 py-3 font-medium text-white hover:bg-gray-700"
        >
          View GitHub
        </a>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          Live Demo
        </a>

        <Link
          to={`/projects/${project.id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Edit Project
        </Link>

        <Link
          to="/"
          className="rounded-lg border px-5 py-3 font-medium hover:bg-gray-100"
        >
          Back
        </Link>
      </div>
    </article>
  );
}

export default ProjectDetails;