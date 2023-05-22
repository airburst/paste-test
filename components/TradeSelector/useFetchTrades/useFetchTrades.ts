"use client";

import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { TradeProps } from "../types";

export const useFetchTrades = (endpoint: URL, debounceInMs: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [trades, setTrades] = useState<TradeProps[] | null>(null);
  const [fetchTrades, setFetchTrades] = useState<boolean>(false);

  const getTrades = useCallback(
    // eslint-disable-next-line consistent-return
    async (signal: AbortSignal) => {
      try {
        const response = await fetch(endpoint, {
          signal,
        });
        const json = await response.json();
        setIsLoading(false);

        if (!response.ok) {
          throw new Error(json.message || json.statusText);
        }

        setError(null);
        return setTrades(json.results);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          // eslint-disable-next-line no-console
          console.error(err);
          setError(err);
        }
      }
    },
    [endpoint],
  );

  useEffect(() => {
    const controller = new AbortController();

    if (fetchTrades) {
      setIsLoading(true);

      const fetchData = debounce(async () => {
        const { signal } = controller;
        await getTrades(signal);
      }, debounceInMs);

      fetchData();
    }

    return () => controller.abort();
  }, [getTrades, debounceInMs, fetchTrades]);

  useEffect(() => {
    if (!isLoading) {
      setFetchTrades(false);
    }
  }, [isLoading]);

  return {
    isLoading,
    error,
    trades,
    fetchTrades: setFetchTrades,
  };
};
