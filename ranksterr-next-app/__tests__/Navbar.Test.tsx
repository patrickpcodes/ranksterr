import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    (usePathname as jest.Mock).mockClear();
  });

  test("displays the correct title based on the current path - Home", () => {
    (usePathname as jest.Mock).mockReturnValue("/"); // Mocking the path to "/"
    render(<Navbar onToggleSidebar={mockToggleSidebar} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("displays the correct title based on the current path - Settings", () => {
    (usePathname as jest.Mock).mockReturnValue("/settings"); // Mocking the path to "/settings"
    render(<Navbar onToggleSidebar={mockToggleSidebar} />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("toggles dark mode when the button is clicked", () => {
    (usePathname as jest.Mock).mockReturnValue("/"); // Mocking the path to "/"
    render(<Navbar onToggleSidebar={mockToggleSidebar} />);
    const lightModeButton = screen.getByRole("button", { name: /light mode/i });
    fireEvent.click(lightModeButton);
    expect(lightModeButton).toHaveTextContent("Dark Mode");

    fireEvent.click(lightModeButton);
    expect(lightModeButton).toHaveTextContent("Light Mode");
  });
});
