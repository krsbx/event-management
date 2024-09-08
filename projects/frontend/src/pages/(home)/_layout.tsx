import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/dashboard/NavigationBar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen p-2 space-y-2">
      <NavigationBar />
      <div className="w-full h-full p-2 rounded-lg bg-sky-200 ">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
