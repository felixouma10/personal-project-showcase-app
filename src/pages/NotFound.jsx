import { Link } from "react-router";

function NotFound() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Return Home
      </Link>
    </section>
  );
}

export default NotFound;