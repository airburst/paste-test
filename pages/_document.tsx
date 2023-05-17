import { Html, Head, Main, NextScript } from "next/document";
// import localFont from "@next/font/local";

// const poppins = localFont({
//   src: [
//     {
//       path: "../../public/fonts/Poppins-Regular.ttf",
//       weight: "400",
// style: "normal",
//     },
//     {
//       path: "../../public/fonts/Poppins-Bold.ttf",
//       weight: "700",
//     },
//   ],
//   variable: "--font-poppins",
// });

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        {/* <Head className={`${poppins.variable} font-sans`}> */}
        <link
          rel="preconnect"
          href="https://assets.twilio.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://assets.twilio.com/public_assets/paste-fonts/1.5.0/fonts.css"
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
