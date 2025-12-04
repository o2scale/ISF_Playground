import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    save: jest.fn(),
  }));
});

jest.mock("jspdf-autotable", () => jest.fn());

test("renders student login form", () => {
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
