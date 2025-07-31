import MarketingPage from "@/app/(marketing)/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Home Page", () => {
  describe("Page Content", () => {
    it("should have Home Page Text", () => {
      render(<MarketingPage />); // ARRANGE

      const award = screen.getByTestId("main_award"); // ACTION

      expect(award).toBeInTheDocument(); // ASSERTION
      expect(award).toHaveTextContent("No 1 task managment");

      expect(screen.getByTestId("main_title")).toBeInTheDocument();
      expect(screen.getByTestId("main_title")).toHaveTextContent(
        "Frello helps team move"
      );
      expect(screen.getByTestId("main_subtitle")).toBeInTheDocument();
      expect(screen.getByTestId("main_subtitle")).toHaveTextContent(
        "work forward."
      );
      expect(screen.getByTestId("main_description")).toBeInTheDocument();
      expect(screen.getByTestId("main_description")).toHaveTextContent(
        /Collaborate, manage projects/i
      );
    });

    it("should have a clickable button with text Get Frello for free", () => {
      render(<MarketingPage />);

      const button = screen.getByTestId("main_button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Get Frello for free");
      userEvent.click(button);
    });
  });
});
