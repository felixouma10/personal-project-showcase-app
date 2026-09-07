import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProjectContext } from "../context/useProjectContext";

function getInitialFormData(project) {
  return {
    title: project.title,
    description: project.description,
    technologies: project.technologies.join(", "),
    image: project.image,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    category: project.category,
    featured: project.featured
  };
}

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjectContext();

  const project = projects.find(
    (project) => String(project.id) === String(id)
  );

  if (!project) {
    return <p className="text-center">Project not found.</p>;
  }

  return (
    <ProjectEditForm
      key={project.id}
      id={id}
      project={project}
      navigate={navigate}
    />
  );
}

function ProjectEditForm({ id, project, navigate }) {
  const { updateProject } = useProjectContext();
  const [formData, setFormData] = useState(() => getInitialFormData(project));

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedProject = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      image: formData.image,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      category: formData.category,
      featured: formData.featured
    };

    await updateProject(id, updatedProject);

    navigate(`/projects/${id}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      <h1 className="text-3xl font-bold">Edit Project</h1>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
        Featured project
      </label>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}

export default EditProject;