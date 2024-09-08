import { IAvailableEvent, IEvent, RestListResponse } from "../types/api";
import {
  CreateEventSchema,
  UpdateEventSchema,
} from "../validations/event.validations";
import { axios } from "./axios.api";

export async function createEvent({
  proposedDate1,
  proposedDate2,
  proposedDate3,
  ...payload
}: CreateEventSchema) {
  const { data } = await axios.post<IEvent>("/events", {
    ...payload,
    proposedDates: [proposedDate1, proposedDate2, proposedDate3],
  });

  return data;
}

export async function updateEvent(eventId: string, payload: UpdateEventSchema) {
  const { data } = await axios.patch<IEvent>(`/events/${eventId}`, payload);

  return data;
}

export async function listEvents(query: { limit: number; page: number }) {
  const { data } = await axios.get<RestListResponse<IEvent>>("/events", {
    params: query,
  });

  return data;
}

export async function listAvailableEvents(query: {
  limit: number;
  page: number;
}) {
  const { data } = await axios.get<RestListResponse<IAvailableEvent>>(
    "/available-events",
    {
      params: query,
    },
  );

  return data;
}
