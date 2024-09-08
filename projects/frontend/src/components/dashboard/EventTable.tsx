import { useEffect } from "react";
import useListAvailableEventApi from "../../hooks/available-events/useListAvailableEventApi";
import useListEventApi from "../../hooks/events/useListEventApi";
import useListUserApi from "../../hooks/users/useListUserApi";
import classNames from "classnames";
import LoadingSpinner from "../reuseable/LoadingSpinner";

const EventTable = () => {
  const { isLoading: isLoadingUser, onListUser } = useListUserApi();
  const { isLoading: isLoadingAvailableEvent, onListAvailableEvent } =
    useListAvailableEventApi();
  const { isLoading: isLoadingEvent, onListEvent } = useListEventApi();
  const isLoading = isLoadingUser || isLoadingAvailableEvent || isLoadingEvent;

  useEffect(() => {
    Promise.all([
      onListUser(),
      onListAvailableEvent(),
      onListEvent({
        limit: 10,
      }),
    ]);
  }, []);

  return (
    <div className="w-full flex-1 relative">
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
};

export default EventTable;
