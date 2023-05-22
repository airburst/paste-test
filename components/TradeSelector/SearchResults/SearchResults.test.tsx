import React, { useRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { jestHTMLDialogPolyfill } from "../jestHTMLDialogPolyfill";
import { SearchResults, SearchResultsProps } from "./SearchResults";
import { mockTrade } from "../mockApiResults";
import { getConfig } from "../config";

jestHTMLDialogPolyfill();

jest.mock("react", () => ({
  ...jest.requireActual<typeof React>("react"),
  useRef: jest.fn(),
}));

jest.mock("@react-aria/focus", () => ({
  useFocusRing: () => ({
    isFocusVisible: () => {},
    focusProps: () => {},
  }),
}));

jest.mock("@react-aria/interactions", () => ({
  useHover: () => ({
    hoverProps: () => {},
    isHovered: () => {},
  }),
}));

const SearchResultsComponent = (props: Partial<SearchResultsProps>) => {
  const { defaultLabels } = getConfig();

  const defaultProps = {
    isOpen: true,
    inputRef: useRef(null),
    results: [mockTrade],
    fallbackUrl: "https://www.example.com",
    labels: {
      ...defaultLabels,
    },
    isLoading: false,
    onClick: jest.fn(),
    onClose: jest.fn(),
  };

  return <SearchResults {...defaultProps} {...props} />;
};

describe("SearchResults", () => {
  beforeEach(() => {
    jest.spyOn(React, "useRef").mockReturnValue({
      current: [],
    });
  });

  const loadingText = "Loading...";
  const tradeText = "Landlord";
  const noResultsText = "View all trades";

  it("renders loading state", () => {
    render(<SearchResultsComponent isLoading />);

    const loading = screen.queryByText(loadingText);
    const trade = screen.queryByText(tradeText);
    const noResultsLink = screen.queryByText(noResultsText);

    expect(loading).toBeInTheDocument();
    expect(noResultsLink).not.toBeInTheDocument();
    expect(trade).not.toBeInTheDocument();
  });

  it("renders no results state", () => {
    render(<SearchResultsComponent results={[]} />);

    const loading = screen.queryByText(loadingText);
    const trade = screen.queryByText(tradeText);
    const noResultsLink = screen.queryByText(noResultsText);

    expect(loading).not.toBeInTheDocument();
    expect(noResultsLink).toBeInTheDocument();
    expect(trade).not.toBeInTheDocument();
  });

  it("renders trades list", () => {
    render(<SearchResultsComponent />);

    const loading = screen.queryByText(loadingText);
    const trade = screen.queryByText(tradeText);
    const noResultsLink = screen.queryByText(noResultsText);

    expect(loading).not.toBeInTheDocument();
    expect(noResultsLink).not.toBeInTheDocument();
    expect(trade).toBeInTheDocument();
  });

  describe("pressing Enter key", () => {
    it("selects the first trade from the list", () => {
      const onClick = jest.fn();

      const { container } = render(
        <SearchResultsComponent onClick={onClick} />,
      );

      const button = container.querySelector("button");
      expect(button).toHaveClass("--is-focused");

      fireEvent.keyDown(container, {
        key: "Enter",
        code: "Enter",
      });

      expect(onClick).toHaveBeenCalled();
    });
  });
});
