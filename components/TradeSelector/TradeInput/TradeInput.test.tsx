// import { render, fireEvent, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { useRef } from "react";
// import { TradeInput, TradeInputProps } from "./TradeInput";

// const TradeInputComponent = (props: Partial<TradeInputProps>) => {
//   const defaultProps = {
//     onChange: jest.fn(),
//     inputRef: useRef(null),
//     value: "",
//     placeholder: "e.g. Cleaner, builder, consultant",
//     onEdit: jest.fn(),
//     isEditable: false,
//   };

//   return <TradeInput {...defaultProps} {...props} />;
// };

// describe("TradeInput", () => {
//   it("renders selected trade", () => {
//     const initialTrade = "Landlord";
//     const onEdit = jest.fn();

//     render(<TradeInputComponent initialTrade={initialTrade} onEdit={onEdit} />);

//     const initialTradeText = screen.queryByText(initialTrade);
//     const changeButton = screen.queryByRole("button");

//     expect(initialTradeText?.parentNode?.textContent).toEqual(
//       `You have selected ‘${initialTrade}’ as your trade/profession. Change`,
//     );

//     fireEvent.click(changeButton!);

//     expect(onEdit).toHaveBeenCalled();
//   });

//   it("renders input field", async () => {
//     const onChange = jest.fn();

//     render(<TradeInputComponent onChange={onChange} />);

//     const inputField = screen.queryByRole("textbox");

//     expect(inputField).toBeInTheDocument();

//     await userEvent.tab();
//     await userEvent.keyboard("[Space]");

//     expect(onChange).toHaveBeenCalled();
//   });

//   it("sets classes for interaction states", async () => {
//     render(<TradeInputComponent />);

//     const inputField = screen.queryByRole("textbox");

//     await userEvent.tab();

//     expect(inputField).toHaveClass("--is-focused");

//     fireEvent.mouseEnter(inputField!);

//     expect(inputField).toHaveClass("--is-hovered");
//   });

//   it("allows user to edit trade", () => {
//     render(<TradeInputComponent isEditable />);

//     const cancelText = screen.queryByText("Cancel");

//     expect(cancelText).toBeInTheDocument();
//   });
// });
