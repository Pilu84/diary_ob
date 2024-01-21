import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


describe("Base to test", ()  => {
  it("renders learn react link", () => {
    render (<App />);
    const element = screen.getByRole("main");
    expect(element).toBeInTheDocument();
  })
})