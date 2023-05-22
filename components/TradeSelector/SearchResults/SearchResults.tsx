"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Listing } from "../Listing";
import type { DialogRef, LabelProps, TradeProps } from "../types";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export type SearchResultsProps = {
  isOpen: boolean;
  inputRef: RefObject<HTMLInputElement>;
  results: TradeProps[] | null;
  fallbackUrl: string;
  labels: LabelProps;
  className?: string;
  isLoading: boolean;
  describedBy?: string;
  onClick: (trade: TradeProps) => void;
  onClose: () => void;
};

export const SearchResults = (props: SearchResultsProps) => {
  const {
    isOpen,
    labels,
    className,
    results,
    isLoading,
    fallbackUrl,
    describedBy,
    inputRef,
    onClick,
    onClose,
  } = props;
  const dialogRef = useRef<DialogRef>(null);
  const resultRefs = useRef<HTMLButtonElement[]>([]);
  const [focusId, setFocusId] = useState<number>(0);
  const classes = clsx(
    "chopin/TradeSelectorResults",
    {
      "--is-open": isOpen,
    },
    className
  );

  const closeSearchResults = useCallback(() => {
    setFocusId(0);
    onClose();

    if (dialogRef.current) {
      dialogRef.current.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnClickOutside(dialogRef, () => {
    if (dialogRef.current && dialogRef.current.open) {
      closeSearchResults();
    }
  });

  const handleTradeClick = useCallback(
    (trade: TradeProps) => {
      closeSearchResults();
      onClick(trade);
    },
    [closeSearchResults, onClick]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!dialogRef.current?.open || !results) return;

      if (event.code === "ArrowDown") {
        if (focusId === results.length - 1) {
          setFocusId(0);
          return;
        }

        setFocusId(focusId + 1);
      }

      if (event.code === "ArrowUp") {
        if (focusId === 0) {
          setFocusId(results.length - 1);
          return;
        }

        setFocusId(focusId - 1);
      }

      if (event.code === "Escape") {
        closeSearchResults();
      }

      if (event.code === "Enter") {
        if (focusId === 0 && results) {
          const [firstTrade] = results;
          handleTradeClick(firstTrade);
        }
      }
    },
    [focusId, closeSearchResults, results, handleTradeClick]
  );

  useEffect(() => {
    if (dialogRef.current?.open && resultRefs.current[focusId]) {
      resultRefs.current[focusId].focus();
    }
  }, [focusId]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (dialogRef.current && isOpen) {
      if (!dialogRef.current.open && inputRef.current) {
        dialogRef.current.show();
        // Return focus from <dialog> back to <input>
        inputRef.current.focus();
      }
    }
  }, [isOpen, inputRef]);

  if (!isOpen) return null;

  const searchResponseExact = results
    ? results.filter((result: TradeProps) => result.type === "exact")
    : [];

  const searchResponseSuggested = results
    ? results.filter((result: TradeProps) => result.type === "suggested")
    : [];

  const noResults = results?.length === 0;

  return (
    <dialog className={classes} ref={dialogRef} aria-describedby={describedBy}>
      {isLoading ? (
        <header className="chopin/TradeSelectorListTitle">
          {labels.loading}
        </header>
      ) : noResults ? (
        <header className="chopin/TradeSelectorListTitle">
          <a href={fallbackUrl} className="chopin/TradeSelectorListTitleLink">
            {labels.noResults}
          </a>
        </header>
      ) : (
        <>
          {searchResponseExact.length > 0 && (
            <Listing
              title={labels.exact}
              trades={searchResponseExact}
              resultRefs={resultRefs}
              onClick={handleTradeClick}
              selectedId={focusId}
            />
          )}
          {searchResponseSuggested.length > 0 && (
            <Listing
              title={labels.suggested}
              trades={searchResponseSuggested}
              resultRefs={resultRefs}
              refCountStart={searchResponseExact.length}
              onClick={handleTradeClick}
              selectedId={focusId}
            />
          )}
        </>
      )}
    </dialog>
  );
};
