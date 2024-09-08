import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "../../router";
import { useEffect } from "react";
import CreateEventBar from "../../components/dashboard/CreateEventBar";
import EventTable from "../../components/dashboard/EventTable";

const HomePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return;

    navigate("/auth/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center space-y-2 justify-center w-full h-[calc(100vh-6rem)]">
      <CreateEventBar />
      <EventTable />
    </div>
  );
};

export default HomePage;
