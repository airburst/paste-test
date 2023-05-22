import clsx from "clsx";
import { MutableRefObject } from "react";
import { TradeProps } from "../types";
import { ListingItem } from "./ListingItem";

export type ListingProps = {
  title: string;
  trades: TradeProps[];
  resultRefs?: MutableRefObject<HTMLButtonElement[]>;
  refCountStart?: number;
  className?: string;
  onClick: (trade: TradeProps) => void;
  selectedId: number;
};

export const Listing = (props: ListingProps) => {
  const {
    title,
    trades,
    resultRefs,
    refCountStart = 0,
    selectedId,
    className,
    onClick,
  } = props;
  const listClasses = clsx("chopin/TradeSelectorList", className);

  return (
    <nav aria-label={title}>
      <header className="chopin/TradeSelectorListTitle">{title}</header>
      <ul className={listClasses}>
        {trades.map((trade, i) => {
          const id = refCountStart + i;
          const selected = selectedId === id;
          return (
            <ListingItem
              key={trade.value}
              trade={trade}
              ref={el => {
                if (!el || !resultRefs) return;
                resultRefs.current[id] = el;
              }}
              onClick={onClick}
              selected={selected}
            />
          );
        })}
      </ul>
    </nav>
  );
};
