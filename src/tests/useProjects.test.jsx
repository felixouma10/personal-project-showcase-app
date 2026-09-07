import { beforeEach, describe, expect, test, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import useProjects from "../hooks/useProjects";

describe("useProjects", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("GET - fetches projects", async () => {
    const projects = [
      {
        id: 1,
        title: "Test Project"
      }
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => projects
    });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual(projects);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/projects"
    );
  });

  test("POST - adds a new project", async () => {
    const newProject = {
      title: "New Project",
      description: "A new project"
    };

    const createdProject = {
      id: 6,
      ...newProject
    };

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => createdProject
      });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.addProject(newProject);
    });

    expect(result.current.projects).toContainEqual(
      createdProject
    );

    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      "http://localhost:3000/projects",
      expect.objectContaining({
        method: "POST"
      })
    );
  });

  test("PATCH - updates a project", async () => {
    const existingProject = {
      id: 1,
      title: "Old Title"
    };

    const updatedProject = {
      id: 1,
      title: "Updated Title"
    };

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [existingProject]
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedProject
      });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.updateProject(1, {
        title: "Updated Title"
      });
    });

    expect(result.current.projects).toEqual([
      updatedProject
    ]);

    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      "http://localhost:3000/projects/1",
      expect.objectContaining({
        method: "PATCH"
      })
    );
  });

  test("DELETE - removes a project", async () => {
    const projects = [
      {
        id: 1,
        title: "Project One"
      },
      {
        id: 2,
        title: "Project Two"
      }
    ];

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => projects
      })
      .mockResolvedValueOnce({
        ok: true
      });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deleteProject(1);
    });

    expect(result.current.projects).toEqual([
      {
        id: 2,
        title: "Project Two"
      }
    ]);

    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      "http://localhost:3000/projects/1",
      expect.objectContaining({
        method: "DELETE"
      })
    );
  });
});