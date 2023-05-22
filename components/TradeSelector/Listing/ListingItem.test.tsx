// import { fireEvent, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { mockTrade } from "../mockApiResults";
// import { ListingItem } from "./ListingItem";

// describe("ListingItem", () => {
//   it("renders trade", () => {
//     const onClick = jest.fn();
//     const { container } = render(
//       <ListingItem trade={mockTrade} onClick={onClick} selected={false} />,
//     );

//     const button = container.querySelector("button");

//     expect(button).toHaveAttribute("data-key", "Landlord");
//     expect(button).toHaveTextContent("Landlord");
//   });

//   it("sets classes for interaction states", async () => {
//     const onClick = jest.fn();
//     const { container } = render(
//       <ListingItem trade={mockTrade} onClick={onClick} selected={false} />,
//     );

//     const button = container.querySelector("button");

//     fireEvent.mouseEnter(button!);
//     expect(button).toHaveClass("--is-hovered");

//     await userEvent.tab();
//     expect(button).toHaveClass("--is-focused");
//   });

//   it("sets interaction class when selected prop is true", () => {
//     const onClick = jest.fn();
//     const { container } = render(
//       <ListingItem trade={mockTrade} onClick={onClick} selected />,
//     );

//     const button = container.querySelector("button");
//     expect(button).toHaveClass("--is-focused");
//   });

//   it("calls onClick", () => {
//     const onClick = jest.fn();
//     const { container } = render(
//       <ListingItem trade={mockTrade} onClick={onClick} selected={false} />,
//     );

//     const button = container.querySelector("button");
//     fireEvent.click(button!);
//     expect(onClick).toHaveBeenCalled();
//   });
// });
