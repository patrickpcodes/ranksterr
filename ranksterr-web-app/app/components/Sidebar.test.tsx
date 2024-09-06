import { render, screen } from "@testing-library/react";
import Sidebar from "@/app/components/Sidebar"; // Adjust the import path as necessary

describe("Sidebar Component", () => {
  it("should contain a link to Settings", () => {
    // Render the Sidebar component with the isOpen prop set to true
    render(<Sidebar isOpen={true} />);

    // Check if the sidebar contains the "Settings" link
    const settingsLink = screen.getByRole("link", { name: /settings/i });
    expect(settingsLink).toBeTruthy(); // Assert that the link is present
  });
});
