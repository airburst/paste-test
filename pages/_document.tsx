import { Html, Head, Main, NextScript } from "next/document";

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        <link
          rel="preconnect"
          href="https://assets.twilio.com"
          crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
