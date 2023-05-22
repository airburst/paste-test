"use client";

import { useMemo, useState, useRef, useEffect, ChangeEvent } from "react";
import { Box } from "@twilio-paste/core/box";
import { InputRef, TradeProps, TradeSelectorProps } from "./types";
import { getConfig } from "./config";
import { useTradeSelectorUrl } from "./useTradeSelectorUrl";
import { useFetchTrades } from "./useFetchTrades";
import { Header } from "./Header";
import { TradeInput } from "./TradeInput";
import { Text } from "@twilio-paste/core/text";
import { SearchResults } from "./SearchResults";

export const ERROR_MESSAGE_SERVICE_UNAVAILABLE =
  "The service is currently unavailable. Please try again later";

export const TradeSelector = (props: TradeSelectorProps) => {
  const {
    minInput = 3,
    apiRequestDebounceInMs = 250,
    urls,
    labels,
    // className,
    onTradeSelected,
    hideLabel,
    initialTrade = "",
    vertical,
    searchScope,
  } = props;
  const { site, baseUrl, defaultLabels } = getConfig();
  const fieldLabels = {
    ...defaultLabels,
    ...labels,
  };
  const links = useMemo(
    () => ({
      quoteRedirect: site,
      tradeApi: baseUrl,
      allOccupations:
        "https://quote.simplybusiness.co.uk/trades?vertical=business",
      ...urls,
    }),
    [site, baseUrl, urls]
  );
  // const classes = clsx("chopin", "chopin/TradeSelector", className);
  const [userInput, setUserInput] = useState<string>("");
  const [selectedTrade, setSelectedTrade] = useState<TradeProps | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const currentTrade = selectedTrade ? selectedTrade.value : initialTrade;
  const endpoint = useTradeSelectorUrl(links.tradeApi, userInput, {
    site: links.quoteRedirect,
    vertical,
    searchScope,
  });
  const { trades, isLoading, error, fetchTrades } = useFetchTrades(
    endpoint,
    apiRequestDebounceInMs
  );
  // const errorMessage = error?.message;
  // const errorMessageId = useSlotId([Boolean(errorMessage)]);
  // const { labelProps, fieldProps } = useLabel({
  //   label: fieldLabels.input,
  // });
  // const ariaLabel = hideLabel ? fieldLabels.input : undefined;
  // const inputProps = hideLabel ? undefined : fieldProps;
  // const describedBy = spaceDelimitedList([
  //   errorMessageId,
  //   props["aria-describedby"],
  // ]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUserInput(event.target.value);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleOverlayClose = () => {
    setIsOverlayVisible(false);
  };

  const handleTradeSelect = (trade: TradeProps) => {
    setSelectedTrade(trade);

    if (editMode) {
      toggleEditMode();
    }

    if (trade && onTradeSelected) {
      try {
        onTradeSelected(trade);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("onTradeSelected returned the following error", err);
      }
    }
  };

  useEffect(() => {
    if (editMode && currentTrade) {
      setUserInput(currentTrade);
    }

    if (!editMode) {
      setUserInput("");
    }
  }, [editMode, currentTrade]);

  useEffect(() => {
    if (userInput.length >= minInput) {
      setIsOverlayVisible(true);
      fetchTrades(true);
    }

    if (userInput.length < minInput) {
      setIsOverlayVisible(false);
    }
  }, [minInput, fetchTrades, userInput.length]);

  return (
    <Box paddingY="space50">
      {/* <div ref={ref} className={classes} data-cy={props["data-cy"]}> */}
      <Header
        isOpen={!hideLabel}
        // labelProps={labelProps}
        labels={fieldLabels}
      />
      <TradeInput
        inputRef={inputRef}
        // inputProps={inputProps}
        value={userInput}
        onChange={handleChange}
        // label={ariaLabel}
        placeholder={fieldLabels.placeholder}
        initialTrade={currentTrade}
        onEdit={toggleEditMode}
        isEditable={editMode}
      />
      {error ? (
        // <ErrorMessage
        //   id={errorMessageId}
        //   errorMessage={ERROR_MESSAGE_SERVICE_UNAVAILABLE}
        // />
        <Text as="p">{ERROR_MESSAGE_SERVICE_UNAVAILABLE}</Text>
      ) : (
        <SearchResults
          isOpen={isOverlayVisible}
          labels={fieldLabels}
          onClick={handleTradeSelect}
          onClose={handleOverlayClose}
          results={trades}
          isLoading={isLoading}
          fallbackUrl={links.allOccupations}
          // describedBy={describedBy}
          inputRef={inputRef}
        />
      )}
      {/* </div> */}
    </Box>
  );
};
