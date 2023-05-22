import { useMemo } from "react";

export type TradeSelectorUrlOptions = {
  vertical?: string;
  searchScope?: string;
  site?: string;
};

function addQueryParam(url: URL, key: string, value?: string) {
  if (value) url.searchParams.set(key, value);
}

export function useTradeSelectorUrl(
  tradeApi: string,
  userInput: string,
  { vertical, searchScope, site }: TradeSelectorUrlOptions = {},
) {
  return useMemo(() => {
    const url = new URL(tradeApi);
    addQueryParam(url, "q", userInput);
    addQueryParam(url, "vertical", vertical);
    addQueryParam(url, "search_scope", searchScope);
    addQueryParam(url, "site", site);
    return url;
  }, [tradeApi, userInput, vertical, searchScope, site]);
}
