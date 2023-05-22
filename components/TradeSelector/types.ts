import { Ref, RefAttributes } from "react";
import { DOMProps } from "@react-types/shared";

export type DialogRef = HTMLDialogElement;
export type InputRef = HTMLInputElement;

export type TradeSelectorSearchScope =
  | "all_verticals"
  | "current_and_supported_verticals"
  | "current_vertical"
  | "except_current_vertical"
  | "usa_contractors"
  | "commercial_landlord_business_types"
  | "contractors_combined"
  | "supported_for_current_vertical"
  | "commercial_combined_manufacturer"
  | "commercial_combined_wholesaler"
  | "commercial_combined_all";

// TODO: We could probably use a union type here instead of a string
//       but we may not want to restrict the possible values.
export type TradeSelectorVertical = string;

export type TradeProps = {
  value: string;
  vertical: string;
  /* eslint-disable camelcase */
  supported_verticals: string[] | null;
  label: string;
  type: string;
  /* eslint-disable camelcase */
  trade_detail: string | null;
  /* eslint-disable camelcase */
  trade_type: string | null;
  blocked: boolean;
};

export type LabelProps = {
  input: string;
  exact: string;
  suggested: string;
  noResults: string;
  loading: string;
  description: string;
  placeholder: string;
};

export type UrlProps = {
  quoteRedirect: string;
  tradeApi: string;
  allOccupations: string;
};

export type TradeSelectorCommonProps = {
  minInput: number;
  apiRequestDebounceInMs: number;
  urls: UrlProps;
  onTradeSelected?: (trade: TradeProps | string) => void;
  initialTrade?: string;
  vertical?: TradeSelectorVertical;
  searchScope?: TradeSelectorSearchScope;
};

export type TradeSelectorElementType = HTMLDivElement;

export interface TradeSelectorProps
  extends Partial<TradeSelectorCommonProps>,
    DOMProps,
    RefAttributes<TradeSelectorElementType> {
  /** Custom class name for setting specific CSS */
  className?: string;
  elementType?: string | React.ElementType;
  onTradeSelected?: (trade: TradeProps | string) => void;
  labels?: LabelProps;
  hideLabel?: boolean;
  "data-cy"?: string;
  "aria-describedby"?: string;
}

export type TradeSelectorRef = Ref<TradeSelectorElementType>;
