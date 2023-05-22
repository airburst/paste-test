"use client";

import { RefObject, ChangeEvent, MouseEvent } from "react";
import { AriaLabelingProps, DOMProps } from "@react-types/shared";
// import clsx from "clsx";
// import { useFocusRing } from "@react-aria/focus";
// import { useHover } from "@react-aria/interactions";
import { Text } from "@twilio-paste/core/text";
import { Input } from "@twilio-paste/core/input";

export type TradeInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  inputProps?: AriaLabelingProps & DOMProps;
  value: string;
  className?: string;
  label?: string;
  placeholder: string;
  initialTrade?: string;
  onEdit: (event: MouseEvent<HTMLButtonElement>) => void;
  isEditable: boolean;
};

export const TradeInput = (props: TradeInputProps) => {
  const {
    onChange,
    onEdit,
    inputRef,
    inputProps,
    value,
    // className,
    label,
    placeholder,
    initialTrade,
    isEditable,
    // ...otherProps
  } = props;
  const selectedTrade = initialTrade && !isEditable;
  // const { isFocusVisible, focusProps } = useFocusRing({
  //   within: true,
  // });
  // const { hoverProps, isHovered } = useHover({
  //   ...otherProps,
  // });
  // const classes = clsx(
  //   "chopin",
  //   "chopin/TradeSelectorInput",
  //   {
  //     "--is-focused": isFocusVisible,
  //     "--is-hovered": isHovered,
  //   },
  //   className,
  // );

  return (
    <div /* {...focusProps} */>
      {selectedTrade ? (
        <Text as="p">
          You have selected ‘<strong>{initialTrade}</strong>’ as your
          trade/profession.{" "}
          <button
            type="button"
            className="mobius/Link chopin/TradeSelectorButton"
            aria-label="Change your selected profession"
            onClick={onEdit}
          >
            Change
          </button>
        </Text>
      ) : (
        <div className="chopin/TradeSelectorInputContainer">
          <Input
            // {...hoverProps}
            {...inputProps}
            type="text"
            placeholder={placeholder}
            aria-label={label}
            // className={classes}
            onChange={onChange}
            ref={inputRef}
            value={value}
          />
          {isEditable && (
            <button
              type="button"
              className="mobius/Link chopin/TradeSelectorButton"
              aria-label="Cancel changes"
              onClick={onEdit}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};
