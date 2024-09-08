import { useCallback, useState } from "react";
import { useEventStore } from "../../store/resources/event.resources";
import { createEvent } from "../../api/event.api";
import { CreateEventSchema } from "../../validations/event.validations";
import { FormikHelpers } from "formik";
import { onApiError } from "../../utils/common.utils";

const useCreateEventApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addData, setInformation } = useEventStore((state) => ({
    addData: state.addData,
    setInformation: state.setInformation,
  }));

  const onCreateEvent = useCallback(
    async (
      values: CreateEventSchema,
      formikHelpers: FormikHelpers<CreateEventSchema>,
    ) => {
      try {
        setIsLoading(true);

        const resource = await createEvent(values);

        formikHelpers.resetForm();

        addData(resource);

        setInformation((prev) => ({
          ...prev,
          total: prev.total + 1,
        }));
      } catch (e) {
        onApiError(e, formikHelpers);

        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    isLoading,
    onCreateEvent,
  };
};

export default useCreateEventApi;
