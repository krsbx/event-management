import { useCallback } from "react";
import { useEventStore } from "../../store/resources/event.resources";
import { listEvents } from "../../api/event.api";

const useListEventApi = () => {
  const {
    isFetched,
    setIsFetched,
    setData,
    setInformation,
    data,
    page,
    isLoading,
    setIsLoading,
  } = useEventStore((state) => ({
    isFetched: state.isFetched,
    setIsFetched: state.setIsFetched,
    setData: state.setData,
    setInformation: state.setInformation,
    data: state.data,
    page: state.page,
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
  }));

  const onListEvent = useCallback(
    async (query?: { limit?: number; page?: number }) => {
      try {
        setIsLoading(true);

        const resource = await listEvents({
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
    onListEvent,
    resource: {
      data,
      page,
    },
  };
};

export default useListEventApi;
