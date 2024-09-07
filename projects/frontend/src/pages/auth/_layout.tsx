import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-r from-sky-600 to-blue-900">
      <div className="w-[80%] xl:w-[65%] 2xl:w-[50%] min-h-[65%] grid md:grid-cols-2 items-center justify-center">
        <div className="w-full h-full p-8 md:p-14 rounded-s-2xl rounded-e-2xl md:rounded-e-none bg-sky-200">
          <Outlet />
        </div>
        <div className="w-full h-full invisible md:visible bg-blue-200 bg-[url('/images/auth/backgrounds.jpg')] bg-cover rounded-e-2xl"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
