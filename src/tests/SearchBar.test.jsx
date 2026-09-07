import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders the search input", () => {
    render(
      <SearchBar
        searchTerm=""
        onSearch={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText("Search projects...")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Focus Search"
      })
    ).toBeInTheDocument();
  });

  test("calls onSearch when the user types", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    function Wrapper() {
      const [searchTerm, setSearchTerm] = useState("");

      return (
        <SearchBar
          searchTerm={searchTerm}
          onSearch={(value) => {
            onSearch(value);
            setSearchTerm(value);
          }}
        />
      );
    }

    render(<Wrapper />);

    await user.type(
      screen.getByPlaceholderText("Search projects..."),
      "React"
    );

    expect(onSearch).toHaveBeenLastCalledWith("React");
  });

  test("focuses the search input when Focus Search is clicked", async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
        searchTerm=""
        onSearch={() => {}}
      />
    );

    const input =
      screen.getByPlaceholderText("Search projects...");

    const focusButton =
      screen.getByRole("button", {
        name: "Focus Search"
      });

    await user.click(focusButton);

    expect(input).toHaveFocus();
  });
});