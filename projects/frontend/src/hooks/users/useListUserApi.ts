import { useCallback, useState } from "react";
import { useUserStore } from "../../store/resources/user.resources";
import { listUsers } from "../../api/users.api";

const useListUserApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isFetched, setIsFetched, setData, setInformation, data, page } =
    useUserStore((state) => ({
      isFetched: state.isFetched,
      setIsFetched: state.setIsFetched,
      setData: state.setData,
      setInformation: state.setInformation,
      data: state.data,
      page: state.page,
    }));

  const onListUser = useCallback(
    async (query: { limit?: number; offset?: number }) => {
      try {
        setIsLoading(true);

        const resource = await listUsers({
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
    onListUser,
    resource: {
      data,
      page,
    },
  };
};

export default useListUserApi;
