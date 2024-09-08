import { useCallback } from "react";
import { IEvent, IUser } from "../../types/api";
import { ModalPath, useModals } from "../../router";
import {
  EventStatus,
  UserRoles,
} from "../../utils/constants/services.constants";
import Button from "../reuseable/Button";

type Props = {
  user: IUser;
  event: IEvent;
};

const UpdateEventAction = ({ event, user }: Props) => {
  const modals = useModals();

  const onAction = useCallback(
    (path: ModalPath) => () => {
      modals.open(path, {
        state: event,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [event],
  );

  if (event.status !== EventStatus.PENDING) return null;

  if (user.role === UserRoles.HUMAN_RESOURCE) {
    return (
      <Button onClick={onAction("/cancel")} className="text-red-500">
        Cancel
      </Button>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={onAction("/approve")} className="text-green-500">
        Approve
      </Button>
      <Button onClick={onAction("/reject")} className="text-red-500">
        Reject
      </Button>
    </div>
  );
};

export default UpdateEventAction;
