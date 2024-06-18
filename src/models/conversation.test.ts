import { useTranslation } from "react-i18next";

import { renderHookWithProviders } from "../utils/test/render";

import {
  isValidConversationUserType,
  normalizeAPIConversationUserType,
  translateConversationUserType,
} from "./conversation";

test("normalizeAPIConversationUserType", () => {
  expect(normalizeAPIConversationUserType(null)).toEqual(null);
  expect(normalizeAPIConversationUserType("eMPF")).toEqual("empf");
  expect(normalizeAPIConversationUserType("MPFA")).toEqual("mpfa");
  expect(normalizeAPIConversationUserType("TRUSTEE")).toEqual("trustee");
  expect(normalizeAPIConversationUserType("ADM")).toEqual("adm");
});

test("isValidConversationUserType", () => {
  expect(isValidConversationUserType("mpfa")).toEqual(true);
  expect(isValidConversationUserType("empf")).toEqual(true);
  expect(isValidConversationUserType("trustee")).toEqual(true);
  expect(isValidConversationUserType("adm")).toEqual(true);
  expect(isValidConversationUserType("abc")).toEqual(false);
});

test("translateConversationUserType", () => {
  const {
    result: {
      current: { t },
    },
  } = renderHookWithProviders(() => useTranslation());
  expect(translateConversationUserType(t, null)).toEqual(null);
  expect(translateConversationUserType(t, "mpfa")).toEqual("MPFA");
  expect(translateConversationUserType(t, "empf")).toEqual("eMPF");
  expect(translateConversationUserType(t, "trustee")).toEqual("Trustee");
  expect(translateConversationUserType(t, "adm")).toEqual("eMPF");
  expect(translateConversationUserType(t, "abcde")).toEqual("abcde");
});
