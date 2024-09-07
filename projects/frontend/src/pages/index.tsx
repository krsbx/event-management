import { useUserStore } from "../store/user.store";
import { useNavigate } from "../router";

const HomePage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/auth/signin");

    return null;
  }

  return <div>HomePage</div>;
};

export default HomePage;
