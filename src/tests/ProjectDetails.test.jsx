import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import ProjectDetails from "../pages/ProjectDetails";

const project = {
  id: 1,
  title: "Finance Tracker",
  description: "Track income and expenses",
  technologies: ["React", "JavaScript"],
  image: "/finance.png",
  githubUrl: "https://github.com/test/finance",
  liveUrl: "https://example.com/finance",
  category: "Web Application",
  featured: true
};

vi.mock("../context/useProjectContext", () => ({
  useProjectContext: () => ({
    projects: [project],
    loading: false
  })
}));

describe("ProjectDetails", () => {
  test("displays project details", () => {
    render(
      <MemoryRouter initialEntries={["/projects/1"]}>
        <Routes>
          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Finance Tracker" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Track income and expenses")
    ).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Web Application")).toBeInTheDocument();
  });

  test("shows not found when project does not exist", () => {
    render(
      <MemoryRouter initialEntries={["/projects/99"]}>
        <Routes>
          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Project Not Found")
    ).toBeInTheDocument();
  });
});