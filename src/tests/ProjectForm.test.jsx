import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectForm from "../components/ProjectForm";

const addProject = vi.fn();

vi.mock("../context/useProjectContext", () => ({
  useProjectContext: () => ({
    addProject
  })
}));

describe("ProjectForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the form fields", () => {
    render(<ProjectForm />);

    expect(screen.getByText("Add New Project")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Project title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Project description")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Technologies/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Project" })
    ).toBeInTheDocument();
  });

  test("submits a new project", async () => {
    const user = userEvent.setup();

    addProject.mockResolvedValue({
      id: 6,
      title: "New Project"
    });

    render(<ProjectForm />);

    await user.type(
      screen.getByPlaceholderText("Project title"),
      "New Project"
    );

    await user.type(
      screen.getByPlaceholderText("Project description"),
      "A new project"
    );

    await user.type(
      screen.getByPlaceholderText(/Technologies/),
      "React, JavaScript"
    );

    await user.type(
      screen.getByPlaceholderText("Category"),
      "Education"
    );

    await user.click(
      screen.getByRole("button", { name: "Add Project" })
    );

    expect(addProject).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Project",
        description: "A new project",
        technologies: ["React", "JavaScript"],
        category: "Education"
      })
    );

    expect(
      await screen.findByText("Project added successfully!")
    ).toBeInTheDocument();
  });
});