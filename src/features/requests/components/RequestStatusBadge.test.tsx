import { render, screen } from "@testing-library/react";

import { RequestStatusBadge } from "./RequestStatusBadge";

describe("RequestStatusBadge", () => {
  it("should render pending status label", () => {
    render(<RequestStatusBadge status="pending" />);

    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it("should render in review status label", () => {
    render(<RequestStatusBadge status="in_review" />);

    expect(screen.getByText("En revisión")).toBeInTheDocument();
  });

  it("should render approved status label", () => {
    render(<RequestStatusBadge status="approved" />);

    expect(screen.getByText("Aprobada")).toBeInTheDocument();
  });
});