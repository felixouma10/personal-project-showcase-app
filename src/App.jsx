import { Route, Routes } from "react-router";

import ProjectProvider from "./context/ProjectProvider";
import UserProvider from "./context/UserProvider";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <UserProvider>
      <ProjectProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/projects/new"
              element={<NewProject />}
            />

            <Route
              path="/projects/:id"
              element={<ProjectDetails />}
            />

            <Route
              path="/projects/:id/edit"
              element={<EditProject />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </ProjectProvider>
    </UserProvider>
  );
}

export default App;