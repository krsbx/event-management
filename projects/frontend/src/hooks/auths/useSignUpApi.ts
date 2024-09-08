import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import { UserSignUpSchema } from "../../validations/auth.validations";
import { signUpUser } from "../../api/auth.api";
import { useNavigate } from "../../router";
import { onApiError } from "../../utils/common.utils";

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
        onApiError(e, formikHelpers);

        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    isLoading,
    onSignUp,
  };
};

export default useSignUpApi;
