import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import { jwtDecode } from "jwt-decode";
import { UserSignInSchema } from "../../validations/auth.validations";
import { signInUser } from "../../api/auth.api";
import { useNavigate } from "../../router";
import { useAuthStore } from "../../store/auth.store";
import { IUser } from "../../types/api";
import { onApiError } from "../../utils/common.utils";

const useSignInApi = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken, setUser } = useAuthStore((state) => ({
    setIsAuthenticated: state.setIsAuthenticated,
    setToken: state.setToken,
    setUser: state.setUser,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = useCallback(
    async (
      values: UserSignInSchema,
      formikHelpers: FormikHelpers<UserSignInSchema>,
    ) => {
      setIsLoading(true);

      try {
        const { token } = await signInUser(values);

        formikHelpers.resetForm();

        setIsAuthenticated(true);
        setToken(token);
        setUser(jwtDecode(token) as IUser);

        navigate("/");
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
    onSignIn,
  };
};

export default useSignInApi;
