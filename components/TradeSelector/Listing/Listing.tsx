// import clsx from "clsx";
import { MutableRefObject } from "react";
import { TradeProps } from "../types";
import { ListingItem } from "./ListingItem";
import { UnorderedList } from "@twilio-paste/core/list";
import styles from "../styles/shared.module.css";

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
    // className,
    onClick,
  } = props;
  // const listClasses = clsx("chopin/TradeSelectorList", className);

  return (
    <nav aria-label={title}>
      <header className={styles.TradeSelectorListTitle}>{title}</header>
      <UnorderedList /* className={listClasses} */>
        {trades.map((trade, i) => {
          const id = refCountStart + i;
          const selected = selectedId === id;
          return (
            <ListingItem
              key={trade.value}
              trade={trade}
              ref={(el) => {
                if (!el || !resultRefs) return;
                resultRefs.current[id] = el;
              }}
              onClick={onClick}
              selected={selected}
            />
          );
        })}
      </UnorderedList>
    </nav>
  );
};
