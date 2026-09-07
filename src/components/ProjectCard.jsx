import { Link } from "react-router";
import { useProjectContext } from "../context/useProjectContext";

function ProjectCard({ project }) {
  const { deleteProject } = useProjectContext();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(project.id);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <article className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/projects/${project.id}`}>
        <img
          src={project.image}
          alt={project.title}
          className="mb-4 h-48 w-full rounded-lg object-cover"
        />

        <h2 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600">
          {project.title}
        </h2>
      </Link>

      <p className="mb-4 text-gray-600">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/projects/${project.id}`}
          className="rounded-lg bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-800"
        >
          View
        </Link>

        <Link
          to={`/projects/${project.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;