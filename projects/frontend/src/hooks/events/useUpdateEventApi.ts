import { useCallback, useState } from "react";
import { useEventStore } from "../../store/resources/event.resources";
import { updateEvent } from "../../api/event.api";
import { UpdateEventSchema } from "../../validations/event.validations";
import { FormikHelpers } from "formik";

const useUpdateEventApi = (eventId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateData } = useEventStore((state) => ({
    updateData: state.updateData,
  }));

  const onUpdateEvent = useCallback(
    async (
      values: UpdateEventSchema,
      formikHelpers: FormikHelpers<UpdateEventSchema>,
    ) => {
      try {
        setIsLoading(true);

        const resource = await updateEvent(eventId, values);

        formikHelpers.resetForm();

        updateData(eventId, resource);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eventId],
  );

  return {
    isLoading,
    onUpdateEvent,
  };
};

export default useUpdateEventApi;
