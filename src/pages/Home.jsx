import { Link } from "react-router";
import { useProjectContext } from "../context/useProjectContext";

function Home() {
  const { projects, loading } = useProjectContext();

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <section>
      <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-md">
        <p className="mb-3 font-semibold uppercase tracking-wide text-blue-600">
          Welcome to my portfolio
        </p>

        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
          Personal Project Showcase
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Explore projects I have built using modern web
          technologies and see how I turn ideas into useful
          applications.
        </p>

        <Link
          to="/projects"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Projects
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bold">
          Featured Projects
        </h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : featuredProjects.length === 0 ? (
          <p className="text-gray-600">
            No featured projects available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl bg-white p-5 shadow-md"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />

                <h3 className="mb-2 text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mb-4 text-gray-600">
                  {project.description}
                </p>

                <Link
                  to={`/projects/${project.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  View Project →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;