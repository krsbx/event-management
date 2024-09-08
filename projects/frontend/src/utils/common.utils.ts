import { FormikHelpers } from "formik";
import { has, isNil } from "lodash-es";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onApiError(e: unknown, formikHelpers: FormikHelpers<any>) {
  if (!(e instanceof Error)) return;

  if (e.name !== "BlazeError") return;

  if (has(e, "errors") && !isNil(e.errors)) {
    formikHelpers.setErrors(e.errors as Record<string, string>);
  }
}
