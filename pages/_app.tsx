import type { AppProps, NextWebVitalsMetric } from "next/app";
// import { Theme } from "@twilio-paste/core/theme";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import "../styles/fonts.css";
import CustomTheme from "./themes/theme.json";

const MyApp: React.FC<React.PropsWithChildren<AppProps>> = ({
  Component,
  pageProps,
}) => {
  return (
    // @ts-expect-error acknowledged bug by Paste creators
    // https://github.com/twilio-labs/paste/issues/3239#issuecomment-1553613071
    <CustomizationProvider baseTheme="default" theme={CustomTheme}>
      <style jsx global>{`
        * {
          font-family: "museosans";
        }
      `}</style>
      <Component {...pageProps} />
    </CustomizationProvider>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(metric);
}

export default MyApp;
