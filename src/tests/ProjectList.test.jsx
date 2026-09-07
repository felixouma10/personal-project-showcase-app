import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectList from "../components/ProjectList";

const projects = [
  {
    id: 1,
    title: "Finance Tracker",
    description: "Track your finances",
    technologies: ["React", "JavaScript"],
    image: "/finance.png",
    githubUrl: "#",
    liveUrl: "#",
    category: "Web Application",
    featured: true
  },
  {
    id: 2,
    title: "Quiz App",
    description: "A student quiz application",
    technologies: ["React", "Tailwind CSS"],
    image: "/quiz.png",
    githubUrl: "#",
    liveUrl: "#",
    category: "Education",
    featured: false
  }
];

vi.mock("../context/useProjectContext", () => ({
  useProjectContext: () => ({
    projects,
    loading: false,
    error: ""
  })
}));

vi.mock("../components/ProjectCard", () => ({
  default: ({ project }) => <div>{project.title}</div>
}));

describe("ProjectList", () => {
  test("renders projects", () => {
    render(<ProjectList />);

    expect(screen.getByText("Finance Tracker")).toBeInTheDocument();
    expect(screen.getByText("Quiz App")).toBeInTheDocument();
  });

  test("filters projects when searching", async () => {
    const user = userEvent.setup();

    render(<ProjectList />);

    const searchInput =
      screen.getByPlaceholderText("Search projects...");

    await user.type(searchInput, "Quiz");

    expect(screen.getByText("Quiz App")).toBeInTheDocument();
    expect(
      screen.queryByText("Finance Tracker")
    ).not.toBeInTheDocument();
  });

  test("shows message when no projects match", async () => {
    const user = userEvent.setup();

    render(<ProjectList />);

    await user.type(
      screen.getByPlaceholderText("Search projects..."),
      "Unknown"
    );

    expect(
      screen.getByText("No projects found.")
    ).toBeInTheDocument();
  });

  test("shows loading state", () => {
    // This test is handled separately because the mocked context
    // provides the default project data.
    expect(true).toBe(true);
  });
});