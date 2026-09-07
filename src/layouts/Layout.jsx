import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;