import ProjectForm from "../components/ProjectForm";

function NewProject() {
  return (
    <section>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Create a Project
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new project to your portfolio.
        </p>
      </div>

      <ProjectForm />
    </section>
  );
}

export default NewProject;