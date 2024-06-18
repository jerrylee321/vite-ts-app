import { APINoHyphenCapitalUuidInputSchema } from "./APIUuid";

test("APIBooleanSchema transform", () => {
  expect(
    APINoHyphenCapitalUuidInputSchema.parse(
      "d6065b5a-3ca6-4b27-b206-295ef148748b"
    )
  ).toEqual("D6065B5A3CA64B27B206295EF148748B");
});
