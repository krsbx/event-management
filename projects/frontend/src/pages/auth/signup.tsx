import { useCallback, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FaBuilding, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import DropdownWithLabel from "../../components/reuseable/DropdownWithLabel";
import InputWithLabel from "../../components/reuseable/InputWithLabel";
import { userRoleOptions } from "../../utils/constants/services.constants";
import { Link } from "../../router";
import {
  userSignUpSchema,
  UserSignUpSchema,
} from "../../validations/auth.validations";
import Button from "../../components/reuseable/Button";
import useSignUpApi from "../../hooks/auths/useSignUpApi";

const SignIn = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { isLoading, onSignUp: onSubmit } = useSignUpApi();

  const PassRightIcon = isPassVisible ? FaEyeSlash : FaEye;

  const onChangePassVisibility = useCallback(() => {
    setIsPassVisible((prev) => !prev);
  }, []);

  return (
    <Formik<UserSignUpSchema>
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(userSignUpSchema)}
      validateOnBlur
      initialValues={{
        username: "",
        password: "",
        role: "" as never,
        companyName: "",
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
            <InputWithLabel
              label={"Company Name"}
              placeholder="Enter your company name"
              className="font-bold"
              leftIcon={<FaBuilding />}
              value={values.companyName}
              onChange={handleChange("companyName")}
              onBlur={handleBlur("companyName")}
              errorMessage={errors.companyName}
              error={touched.companyName && !!errors.companyName}
              disabled={isLoading}
              required
            />
            <DropdownWithLabel
              label="Role"
              placeholder="User Role"
              className="font-bold"
              leftIcon={<FaBuilding />}
              value={values.role}
              onChange={handleChange("role")}
              onBlur={handleBlur("role")}
              errorMessage={errors.role}
              error={touched.role && !!errors.role}
              disabled={isLoading}
              required
            >
              {userRoleOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </DropdownWithLabel>
            <Button disabled={isLoading} type={"submit"} isLoading={isLoading}>
              Sign Up
            </Button>
            <p className="text-xs">
              Already have an account?{" "}
              <Link
                to={"/auth/signin"}
                className="transition duration-300 ease-in-out  text-blue-500 font-bold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
