import { useCallback } from "react";
import { useAvailableEventStore } from "../../store/resources/available-event.resources";
import { listAvailableEvents } from "../../api/event.api";

const useListAvailableEventApi = () => {
  const {
    isFetched,
    setIsFetched,
    setData,
    setInformation,
    data,
    page,
    isLoading,
    setIsLoading,
  } = useAvailableEventStore((state) => ({
    isFetched: state.isFetched,
    setIsFetched: state.setIsFetched,
    setData: state.setData,
    setInformation: state.setInformation,
    data: state.data,
    page: state.page,
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
  }));

  const onListAvailableEvent = useCallback(
    async (query?: { limit?: number; page?: number }) => {
      try {
        setIsLoading(true);

        const resource = await listAvailableEvents({
          limit: query?.limit || 0,
          page: query?.page || 1,
        });

        setData(resource.data);
        setInformation(resource.page);

        setIsFetched(true);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    isLoading,
    isFetched,
    onListAvailableEvent,
    resource: {
      data,
      page,
    },
  };
};

export default useListAvailableEventApi;
