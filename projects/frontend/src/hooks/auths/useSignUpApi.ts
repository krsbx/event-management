import { has, isNil } from "lodash-es";
import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import { UserSignUpSchema } from "../../validations/auth.validations";
import { signUpUser } from "../../api/auth.api";
import { useNavigate } from "../../router";

const useSignUpApi = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = useCallback(
    async (
      values: UserSignUpSchema,
      formikHelpers: FormikHelpers<UserSignUpSchema>,
    ) => {
      try {
        setIsLoading(true);

        await signUpUser(values);

        formikHelpers.resetForm();

        navigate("/auth/signin");
      } catch (e) {
        if (!(e instanceof Error)) return;

        if (e.name !== "BlazeError") return;

        if (has(e, "errors") && !isNil(e.errors)) {
          formikHelpers.setErrors(e.errors as Record<string, string>);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    onSignUp,
  };
};

export default useSignUpApi;
