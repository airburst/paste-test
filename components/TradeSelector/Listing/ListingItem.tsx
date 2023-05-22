"use client";

// import { useFocusRing } from "@react-aria/focus";
// import { useHover } from "@react-aria/interactions";
import clsx from "clsx";
import { Ref, Key, forwardRef } from "react";
import { TradeProps } from "../types";

export type ListingItemElementType = HTMLButtonElement;

export type ListingItemProps = {
  key?: Key;
  trade: TradeProps;
  onClick: (trade: TradeProps) => void;
  selected: boolean;
};

export const ListingItem = forwardRef(
  (props: ListingItemProps, ref: Ref<ListingItemElementType>) => {
    const { trade, /* selected, */ onClick } = props;
    // const { isFocusVisible, focusProps } = useFocusRing({
    //   within: false,
    // });
    // const { hoverProps, isHovered } = useHover({});
    const classes = clsx(
      "chopin/TradeSelectorButton",
      "chopin/TradeSelectorOption"
      // {
      //   "--is-focused": isFocusVisible || selected,
      //   "--is-hovered": isHovered,
      // },
    );

    const handleClick = () => onClick(trade);

    return (
      <li className="chopin/TradeSelectorListItem">
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: trade.label }}
          className={classes}
          data-key={trade.value}
          // {...hoverProps}
          // {...focusProps}
        />
      </li>
    );
  }
);
