import { useEffect } from "react";
import useListAvailableEventApi from "../../hooks/available-events/useListAvailableEventApi";
import useListEventApi from "../../hooks/events/useListEventApi";
import useListUserApi from "../../hooks/users/useListUserApi";
import LoadingSpinner from "../reuseable/LoadingSpinner";
import Table from "../reuseable/Table";
import EventRow from "./EventRow";

const EventTable = () => {
  const { isLoading: isLoadingUser, onListUser } = useListUserApi();
  const { isLoading: isLoadingAvailableEvent, onListAvailableEvent } =
    useListAvailableEventApi();
  const {
    isLoading: isLoadingEvent,
    onListEvent,
    resource: { data: events },
  } = useListEventApi();
  const isLoading = isLoadingUser || isLoadingAvailableEvent || isLoadingEvent;

  useEffect(() => {
    Promise.all([
      onListUser(),
      onListAvailableEvent(),
      onListEvent({
        limit: 10,
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex-1 relative">
      <LoadingSpinner isLoading={isLoading} />
      <div className="w-full max-h-[calc(100vh-10rem)] overflow-auto">
        <Table>
          <Table.Thead className="text-xs text-gray-900 uppercase bg-white">
            <Table.Tr>
              <Table.Th scope="col">Event Name</Table.Th>
              <Table.Th scope="col">Vendor Name</Table.Th>
              <Table.Th scope="col">Confirmed Date</Table.Th>
              <Table.Th scope="col">Status</Table.Th>
              <Table.Th scope="col">Date Created</Table.Th>
              <Table.Th scope="col">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {events.map((event) => (
              <EventRow event={event} key={`event-${event._id}`} />
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default EventTable;
