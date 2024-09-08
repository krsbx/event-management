import { memo, useCallback, useMemo } from "react";
import Table from "../reuseable/Table";
import { IEvent } from "../../types/api";
import dayjs from "dayjs";
import classNames from "classnames";
import { capitalize } from "lodash-es";
import { EventStatus } from "../../utils/constants/services.constants";
import Button from "../reuseable/Button";
import { useModals } from "../../router";

type Props = { event: IEvent };

const EventRow = memo<Props>(({ event }) => {
  const modals = useModals();
  const dates = useMemo(() => {
    if (event.eventDate) {
      return dayjs(event.eventDate).format("DD MMM YYYY hh:mm A");
    }

    return event.proposedDates
      .map((date) => dayjs(date).format("DD MMM YYYY hh:mm A"))
      .join(" | ");
  }, [event.eventDate, event.proposedDates]);
  const status = useMemo(() => {
    return capitalize(event.status);
  }, [event]);
  const statusClass = classNames({
    "text-green-500": event.status === EventStatus.APPROVED,
    "text-red-500": event.status === EventStatus.REJECTED,
    "text-yellow-500": event.status === EventStatus.PENDING,
    "text-gray-500": event.status === EventStatus.CANCELED,
    "font-bold": true,
  });
  const createdAt = useMemo(() => {
    return dayjs(event.createdAt).format("DD MMM YYYY hh:mm A");
  }, [event]);

  const onViewEvent = useCallback(() => {
    modals.open("/update", {
      state: event,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Table.Tr
      key={`event-${event._id}`}
      className="bg-blue-100 hover:bg-gray-50"
    >
      <Table.Td className="text-sm font-bold">
        {event.eventName.eventName}
      </Table.Td>
      <Table.Td className="text-xs">
        {event.proposedTo?.username || "N/A"}
      </Table.Td>
      <Table.Td className="text-xs">{dates}</Table.Td>
      <Table.Td className={statusClass}>{status}</Table.Td>
      <Table.Td className="text-xs">{createdAt}</Table.Td>
      <Table.Td>
        <div>
          <Button className="text-xs" onClick={onViewEvent}>
            View
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  );
});

export default EventRow;
