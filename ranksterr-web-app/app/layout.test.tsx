import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for additional matchers
import { AppLayout } from "@/app/layout"; // Adjust the import path as necessary

describe("Layout Component", () => {
  it("should close the sidebar when the close button is clicked", () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );

    // Check if the sidebar is initially visible (not translated)
    const sidebar = screen.getByRole("navigation"); // Assuming the sidebar is a nav element
    expect(sidebar).not.toHaveClass("-translate-x-full"); // Check that the sidebar does not have the hidden class

    // Click the close sidebar button
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Check if the sidebar now has the hidden class
    expect(sidebar).toHaveClass("-translate-x-full"); // Check that the sidebar has the hidden class
  });
});
