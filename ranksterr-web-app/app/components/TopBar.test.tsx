import { render, screen, fireEvent } from "@testing-library/react";
import TopBar from "./TopBar";

describe("TopBar Component", () => {
  it("toggles dark mode on button click", () => {
    render(<TopBar />);

    // Check initial state (light mode)
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Find the button and click it
    const button = screen.getByRole("button", { name: /toggle dark mode/i });
    fireEvent.click(button);

    // Check if dark mode is enabled
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Click the button again to toggle back
    fireEvent.click(button);

    // Check if dark mode is disabled
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
