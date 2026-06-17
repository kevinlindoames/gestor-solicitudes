import { render, screen } from "@testing-library/react";

import { RequestPriorityBadge } from "./RequestPriorityBadge";

describe("RequestPriorityBadge", () => {
  it("should render low priority label", () => {
    render(<RequestPriorityBadge priority="low" />);

    expect(screen.getByText("Baja")).toBeInTheDocument();
  });

  it("should render high priority label", () => {
    render(<RequestPriorityBadge priority="high" />);

    expect(screen.getByText("Alta")).toBeInTheDocument();
  });

  it("should render critical priority label", () => {
    render(<RequestPriorityBadge priority="critical" />);

    expect(screen.getByText("Crítica")).toBeInTheDocument();
  });
});