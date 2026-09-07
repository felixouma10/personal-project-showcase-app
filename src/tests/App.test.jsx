import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet } from "react-router";
import App from "../App";

vi.mock("../context/UserContext", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    UserProvider: ({ children }) => children,
    useUserContext: () => ({
      user: null,
      setUser: vi.fn()
    })
  };
});

vi.mock("../context/ProjectContext", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    ProjectProvider: ({ children }) => children,
    useProjectContext: () => ({
      projects: [],
      loading: false,
      error: "",
      addProject: vi.fn(),
      updateProject: vi.fn(),
      deleteProject: vi.fn()
    })
  };
});

vi.mock("../components/ProjectList", () => ({
  default: () => <div>Project List</div>
}));

vi.mock("../components/ProjectForm", () => ({
  default: () => <div>Add Project Form</div>
}));

vi.mock("../pages/Home", () => ({
  default: () => <div>Home Page</div>
}));

vi.mock("../pages/Projects", () => ({
  default: () => <div>Projects Page</div>
}));

vi.mock("../pages/NewProject", () => ({
  default: () => <div>New Project Page</div>
}));

vi.mock("../pages/ProjectDetails", () => ({
  default: () => <div>Project Details</div>
}));

vi.mock("../pages/EditProject", () => ({
  default: () => <div>Edit Project</div>
}));

vi.mock("../pages/NotFound", () => ({
  default: () => <div>Not Found Page</div>
}));

vi.mock("../layouts/Layout", () => ({
  default: () => (
    <div>
      <div>Layout</div>
      <Outlet />
    </div>
  )
}));

describe("App", () => {
  test("renders the home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Home Page")
    ).toBeInTheDocument();
  });

  test("renders the projects route", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Projects Page")
    ).toBeInTheDocument();
  });

  test("renders the new project route", () => {
    render(
      <MemoryRouter initialEntries={["/projects/new"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("New Project Page")
    ).toBeInTheDocument();
  });

  test("renders the project details route", () => {
    render(
      <MemoryRouter initialEntries={["/projects/1"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Project Details")
    ).toBeInTheDocument();
  });

  test("renders the edit project route", () => {
    render(
      <MemoryRouter initialEntries={["/projects/1/edit"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Edit Project")
    ).toBeInTheDocument();
  });

  test("renders the not found route", () => {
    render(
      <MemoryRouter initialEntries={["/does-not-exist"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Not Found Page")
    ).toBeInTheDocument();
  });
});