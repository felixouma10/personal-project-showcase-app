import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/projects";

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addProject = async (project) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    const newProject = await response.json();
    setProjects((currentProjects) => [...currentProjects, newProject]);

    return newProject;
  };

  const updateProject = async (id, updatedProject) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    const updated = await response.json();

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updated.id ? updated : project
      )
    );

    return updated;
  };

  const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  setProjects((currentProjects) =>
    currentProjects.filter((project) => project.id !== id)
  );
};

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject
  };
}

export default useProjects;