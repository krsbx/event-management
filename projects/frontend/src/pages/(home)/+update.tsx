import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Location, useLocation } from "react-router-dom";
import { useModals } from "../../router";
import Input from "../../components/reuseable/Input";
import Label from "../../components/reuseable/Label";
import { useAuthStore } from "../../store/auth.store";
import Dropdown from "../../components/reuseable/Dropdown";
import { useAvailableEventStore } from "../../store/resources/available-event.resources";
import { useUserStore } from "../../store/resources/user.resources";
import { IEvent } from "../../types/api";
import { compact } from "lodash-es";
import Modal from "../../components/reuseable/Modal";
import UpdateEventAction from "../../components/dashboard/UpdateEventAction";
import {
  EventStatus,
  eventStatusOptions,
} from "../../utils/constants/services.constants";
import classNames from "classnames";

const UpdateEventModal = () => {
  const modals = useModals();
  const location: Location<IEvent> = useLocation();
  const { state: event } = location;

  const proposedDates = useMemo(() => {
    if (!event) return [];

    const date1 = dayjs(event.proposedDates?.[0]);
    const date2 = dayjs(event.proposedDates?.[1]);
    const date3 = dayjs(event.proposedDates?.[2]);

    const dates = [date1, date2, date3];

    return compact(
      dates.map((date) => {
        if (!date.isValid()) return null;

        return date.format("YYYY-MM-DD");
      }),
    );
  }, [event]);

  const availableEvents = useAvailableEventStore((state) => state.data);
  const users = useUserStore((state) => state.data);
  const user = useAuthStore((state) => state.user);

  const statusClass = classNames({
    "text-green-500": event.status === EventStatus.APPROVED,
    "text-red-500": event.status === EventStatus.REJECTED,
    "text-yellow-500": event.status === EventStatus.PENDING,
    "text-gray-500": event.status === EventStatus.CANCELED,
    "font-bold": true,
  });

  useEffect(() => {
    if (event) return;

    modals.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal>
      <p className="text-xl w-full text-center">Schedule an Event</p>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Event Name" />
        <Dropdown
          containerClass="col-span-2"
          value={event?.eventName?.eventName || "N/A"}
          disabled
          required
        >
          {availableEvents.map((event) => (
            <option value={event._id} key={`event-${event._id}`}>
              {event.eventName}
            </option>
          ))}
        </Dropdown>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Status" />
        <Dropdown
          containerClass="col-span-2"
          className={statusClass}
          value={event?.status}
          disabled
        >
          {eventStatusOptions.map((status) => (
            <option value={status.value} key={`status-${status.value}`}>
              {status.label}
            </option>
          ))}
        </Dropdown>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Location" />
        <Input
          containerClass="col-span-2"
          placeholder="Enter location of the event"
          value={event?.location}
          disabled
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Proposed Dates 1" />
        <Input
          containerClass="col-span-2"
          type="date"
          value={proposedDates[0]}
          disabled
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Proposed Dates 2" />
        <Input
          containerClass="col-span-2"
          type="date"
          value={proposedDates[1]}
          disabled
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Proposed Dates 3" />
        <Input
          containerClass="col-span-2"
          type="date"
          value={proposedDates[2]}
          disabled
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Proposed To" />
        <Dropdown
          containerClass="col-span-2"
          value={event?.proposedTo?._id}
          disabled
        >
          {users.map((user) => (
            <option value={user._id} key={`user-${user._id}`}>
              {user.username}
            </option>
          ))}
        </Dropdown>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <Label label="Company Name" />
        <Input
          containerClass="col-span-2"
          value={event?.companyName}
          disabled
        />
      </div>
      <UpdateEventAction event={event} user={user} />
    </Modal>
  );
};

export default UpdateEventModal;
