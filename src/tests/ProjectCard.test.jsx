import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProjectCard from "../components/ProjectCard";

const project = {
  id: 1,
  title: "Test Project",
  description: "A test project description",
  technologies: ["React", "JavaScript"],
  image: "/test-image.png",
  githubUrl: "https://github.com/test/project",
  liveUrl: "https://example.com",
  category: "Web Application",
  featured: true
};

vi.mock("../context/useProjectContext", () => ({
  useProjectContext: () => ({
    deleteProject: vi.fn()
  })
}));

describe("ProjectCard", () => {
  test("displays project information", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(
      screen.getByText("A test project description")
    ).toBeInTheDocument();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  test("renders View, Edit and Delete buttons", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} />
      </MemoryRouter>
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});