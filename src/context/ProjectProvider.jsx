import useProjects from "../hooks/useProjects";
import { ProjectContext } from "./ProjectContext";

function ProjectProvider({ children }) {
  const projectData = useProjects();

  return (
    <ProjectContext.Provider value={projectData}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;