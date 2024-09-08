import { IAvailableEvent, IEvent, RestListResponse } from "../types/api";
import {
  CreateEventSchema,
  UpdateEventSchema,
} from "../validations/event.validations";
import { axios } from "./axios.api";

export async function createEvent(payload: CreateEventSchema) {
  const { data } = await axios.post<IEvent>("/events", payload);

  return data;
}

export async function updateEvent(eventId: string, payload: UpdateEventSchema) {
  const { data } = await axios.patch<IEvent>(`/events/${eventId}`, payload);

  return data;
}

export async function listEvents(query: { limit: number; offset: number }) {
  const { data } = await axios.get<RestListResponse<IEvent>>("/events", {
    params: query,
  });

  return data;
}

export async function listAvailableEvents(query: {
  limit: number;
  offset: number;
}) {
  const { data } = await axios.get<RestListResponse<IAvailableEvent>>(
    "/available-events",
    {
      params: query,
    },
  );

  return data;
}
