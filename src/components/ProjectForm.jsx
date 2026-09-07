import { useId, useState } from "react";
import { useProjectContext } from "../context/useProjectContext";

function ProjectForm() {
  const { addProject } = useProjectContext();

  // useId creates a unique ID for the technologies field
  const technologiesId = useId();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    category: "",
    featured: false
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newProject = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
    };

    try {
      await addProject(newProject);

      setMessage("Project added successfully!");

      setFormData({
        title: "",
        description: "",
        technologies: "",
        image: "",
        githubUrl: "",
        liveUrl: "",
        category: "",
        featured: false
      });
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-xl bg-white p-6 shadow-md"
    >
      <h1 className="text-3xl font-bold">
        Add New Project
      </h1>

      {/* Project Title */}
      <div>
        <label
          htmlFor="project-title"
          className="mb-1 block font-medium"
        >
          Project Title
        </label>

        <input
          id="project-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project title"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="project-description"
          className="mb-1 block font-medium"
        >
          Description
        </label>

        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project description"
          required
          rows="4"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Technologies */}
      <div>
        <label
          htmlFor={technologiesId}
          className="mb-1 block font-medium"
        >
          Technologies
        </label>

        <input
          id={technologiesId}
          name="technologies"
          type="text"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Technologies (e.g. React, JavaScript, Tailwind CSS)"
          required
          className="w-full rounded-lg border p-3"
        />

        <p className="mt-1 text-sm text-gray-500">
          Separate technologies with commas.
        </p>
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="project-image"
          className="mb-1 block font-medium"
        >
          Image URL
        </label>

        <input
          id="project-image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label
          htmlFor="github-url"
          className="mb-1 block font-medium"
        >
          GitHub URL
        </label>

        <input
          id="github-url"
          name="githubUrl"
          type="url"
          value={formData.githubUrl}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Live URL */}
      <div>
        <label
          htmlFor="live-url"
          className="mb-1 block font-medium"
        >
          Live Project URL
        </label>

        <input
          id="live-url"
          name="liveUrl"
          type="url"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="Live project URL"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="project-category"
          className="mb-1 block font-medium"
        >
          Category
        </label>

        <input
          id="project-category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Featured */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4"
        />

        <span className="font-medium">
          Featured project
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Add Project
      </button>

      {/* Success/Error Message */}
      {message && (
        <p className="text-center font-medium">
          {message}
        </p>
      )}
    </form>
  );
}

export default ProjectForm;