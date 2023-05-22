// import { renderHook } from "@testing-library/react";
// import { useTradeSelectorUrl } from "./useTradeSelectorUrl";

// describe("useTradeSelectorUrl", () => {
//   it("should return a url", () => {
//     const { result } = renderHook(() =>
//       useTradeSelectorUrl("https://trade-api.example.com/search", "foo"),
//     );
//     expect(result.current).toBeInstanceOf(URL);
//   });

//   it("should return a url with the correct query params", () => {
//     const { result } = renderHook(() =>
//       useTradeSelectorUrl("https://trade-api.example.com/search", "foo", {
//         vertical: "bar",
//         searchScope: "baz",
//       }),
//     );
//     expect(result.current.searchParams.get("q")).toEqual("foo");
//     expect(result.current.searchParams.get("vertical")).toEqual("bar");
//     expect(result.current.searchParams.get("search_scope")).toEqual("baz");
//   });

//   it("should return a new url when the input changes", () => {
//     const { result, rerender } = renderHook(
//       ({ userInput }) =>
//         useTradeSelectorUrl("https://trade-api.example.com/search", userInput),
//       {
//         initialProps: { userInput: "foo" },
//       },
//     );
//     const firstUrl = result.current;
//     rerender({ userInput: "bar" });
//     const secondUrl = result.current;
//     expect(firstUrl).not.toEqual(secondUrl);
//   });
// });
