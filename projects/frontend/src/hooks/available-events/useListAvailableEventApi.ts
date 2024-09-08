import { useCallback, useState } from "react";
import { useAvailableEventStore } from "../../store/resources/available-event.resources";
import { listAvailableEvents } from "../../api/event.api";

const useListAvailableEventApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isFetched, setIsFetched, setData, setInformation, data, page } =
    useAvailableEventStore((state) => ({
      isFetched: state.isFetched,
      setIsFetched: state.setIsFetched,
      setData: state.setData,
      setInformation: state.setInformation,
      data: state.data,
      page: state.page,
    }));

  const onListEvent = useCallback(
    async (query: { limit?: number; offset?: number }) => {
      try {
        setIsLoading(true);

        const resource = await listAvailableEvents({
          limit: query.limit || 0,
          offset: query.offset || 0,
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

export default useListAvailableEventApi;
