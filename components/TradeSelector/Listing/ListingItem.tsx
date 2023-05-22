"use client";

// import { useFocusRing } from "@react-aria/focus";
// import { useHover } from "@react-aria/interactions";
import clsx from "clsx";
import { Ref, Key, forwardRef } from "react";
import { TradeProps } from "../types";
import { ListItem } from "@twilio-paste/core/list";
import { Button } from "@twilio-paste/core/button";

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
      <ListItem /* className="chopin/TradeSelectorListItem" */>
        <Button
          variant="link"
          ref={ref}
          type="button"
          onClick={handleClick}
          className={classes}
          data-key={trade.value}
          // {...hoverProps}
          // {...focusProps}
        >
          <span dangerouslySetInnerHTML={{ __html: trade.label }} />
        </Button>
      </ListItem>
    );
  }
);
