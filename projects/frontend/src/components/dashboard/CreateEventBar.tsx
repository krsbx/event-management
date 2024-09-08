import { useCallback } from "react";
import { useAuthStore } from "../../store/auth.store";
import { UserRoles } from "../../utils/constants/services.constants";
import Button from "../reuseable/Button";
import { useModals } from "../../router";

const CreateEventBar = () => {
  const user = useAuthStore((state) => state.user);
  const modals = useModals();

  const onCreateEvent = useCallback(() => {
    modals.open("/create");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.role === UserRoles.VENDOR) return null;

  return (
    <div className="w-full flex justify-end">
      <div>
        <Button onClick={onCreateEvent}>Create Event</Button>
      </div>
    </div>
  );
};

export default CreateEventBar;
