import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEventStore } from "../../store/resources/event.resources";
import Button from "../reuseable/Button";
import useListEventApi from "../../hooks/events/useListEventApi";
import { useCallback } from "react";

const EventPaginator = () => {
  const { isLoading, onListEvent } = useListEventApi();
  const { information } = useEventStore((state) => ({
    information: state.page,
  }));

  const onPrevPage = useCallback(() => {
    if (information.current === 1) return;

    onListEvent({ page: information.current - 1, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  const onNextPage = useCallback(() => {
    if (information.current === information.total) return;

    onListEvent({ page: information.current + 1, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={onPrevPage}
        disabled={isLoading || information.current === 1}
      >
        <FaChevronLeft />
      </Button>
      <Button
        onClick={onNextPage}
        disabled={isLoading || information.current === information.total}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

export default EventPaginator;
