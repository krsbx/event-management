import { useAuthStore } from "../../store/auth.store";
import { UserRoleMap } from "../../utils/constants/services.constants";
import Button from "../reuseable/Button";

const NavigationBar = () => {
  const { reset, user } = useAuthStore((state) => ({
    reset: state.reset,
    user: state.user,
  }));

  return (
    <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-sky-200 to-blue-600 h-12">
      <p className="uppercase font-bold">{user.companyName}</p>
      <div className="flex items-center space-x-2">
        <p className="invisible md:visible min-w-20 max-w-[50vw] text-ellipsis text-center text-nowrap overflow-hidden text-sm">
          {user.username}{" "}
          <span className="font-medium">({UserRoleMap[user.role]})</span>
        </p>
        <div>
          <Button onClick={reset} className="max-w-20">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
