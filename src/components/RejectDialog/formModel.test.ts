import { RejectType } from "../../apis/models/RejectOptions";

import { getRejectDialogFormInitialValue } from "./formModel";

test("getRejectDialogFormInitialValue", () => {
  expect(getRejectDialogFormInitialValue([])).toEqual({
    reason: "",
    rejectType: RejectType.redo,
  });

  expect(getRejectDialogFormInitialValue([RejectType.abandon])).toEqual({
    reason: "",
    rejectType: RejectType.abandon,
  });
});
