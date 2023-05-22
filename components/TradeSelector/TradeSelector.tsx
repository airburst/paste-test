"use client";

import { Box } from "@twilio-paste/core/box";
import { Input } from "@twilio-paste/core/input";
import { Label } from "@twilio-paste/core/label";

export const TradeSelector = () => {
  return (
    <Box paddingY="space50">
      <Label htmlFor="trade_selector">
        What is your specific trade/profession?
      </Label>
      <Input
        id="trade_selector"
        name="trade_selector"
        type="text"
        placeholder="e.g. Cleaner, builder, consultant"
      />
    </Box>
  );
};
