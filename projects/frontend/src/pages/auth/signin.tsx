import { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import InputWithLabel from "../../components/reuseable/InputWithLabel";
import { Link } from "../../router";
import {
  userSignInSchema,
  UserSignInSchema,
} from "../../validations/auth.validations";
import Button from "../../components/reuseable/Button";
import useSignInApi from "../../hooks/auths/useSignInApi";

const SignIn = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { isLoading, onSignIn: onSubmit } = useSignInApi();

  const PassRightIcon = isPassVisible ? FaEyeSlash : FaEye;

  const onChangePassVisibility = useCallback(() => {
    setIsPassVisible((prev) => !prev);
  }, []);

  return (
    <Formik<UserSignInSchema>
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(userSignInSchema)}
      validateOnBlur
      initialValues={{
        username: "",
        password: "",
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <div className="flex flex-col space-y-4">
            <InputWithLabel
              label={"Username"}
              placeholder="Enter your username"
              className="font-bold"
              leftIcon={<FaUser />}
              value={values.username}
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
              errorMessage={errors.username}
              error={touched.username && !!errors.username}
              disabled={isLoading}
              required
            />
            <InputWithLabel
              label={"Password"}
              placeholder="Enter your password"
              className="font-bold"
              leftIcon={<FaKey />}
              rightIcon={
                <PassRightIcon
                  className="hover:cursor-pointer"
                  onClick={onChangePassVisibility}
                />
              }
              type={isPassVisible ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMessage={errors.password}
              error={touched.password && !!errors.password}
              disabled={isLoading}
              required
            />
            <Button disabled={isLoading} isLoading={isLoading} type={"submit"}>
              Sign In
            </Button>
            <p className="text-xs">
              Don&apos;t have an account?{" "}
              <Link
                to={"/auth/signup"}
                className="transition duration-300 ease-in-out  text-blue-500 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
