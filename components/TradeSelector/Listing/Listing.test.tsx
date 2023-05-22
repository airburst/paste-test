// import React, { useRef } from "react";
// import { fireEvent, render, screen } from "@testing-library/react";
// import { mockTrade } from "../mockApiResults";
// import { Listing } from "./Listing";

// jest.mock("react", () => ({
//   ...jest.requireActual<typeof React>("react"),
//   useRef: jest.fn(),
// }));

// describe("Listing", () => {
//   it("renders a list of trades", () => {
//     jest.spyOn(React, "useRef").mockReturnValue({
//       current: {},
//     });

//     const title = "Exact matches for your search";
//     const trades = [mockTrade];
//     const resultRefs = useRef([]);
//     const onClick = jest.fn();
//     const selectedId = 0;

//     render(
//       <Listing
//         title={title}
//         trades={trades}
//         resultRefs={resultRefs}
//         onClick={onClick}
//         selectedId={selectedId}
//       />,
//     );

//     const header = screen.getByText(title);
//     const trade = screen.getByText("Landlord");

//     expect(header).toBeInTheDocument();
//     expect(trade).toBeInTheDocument();

//     fireEvent.click(trade!);
//     expect(onClick).toHaveBeenCalled();
//   });
// });
