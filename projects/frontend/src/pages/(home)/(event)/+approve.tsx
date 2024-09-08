import { useCallback, useEffect } from "react";
import Modal from "../../../components/reuseable/Modal";
import { Form, Formik, FormikHelpers } from "formik";
import {
  updateEventSchema,
  UpdateEventSchema,
} from "../../../validations/event.validations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { EventStatus } from "../../../utils/constants/services.constants";
import { useModals } from "../../../router";
import { Location, useLocation } from "react-router-dom";
import { IEvent } from "../../../types/api";
import DropdownWithLabel from "../../../components/reuseable/DropdownWithLabel";
import DateSelection from "../../../components/dashboard/DateSelection";
import useUpdateEventApi from "../../../hooks/events/useUpdateEventApi";
import Button from "../../../components/reuseable/Button";
import useListEventApi from "../../../hooks/events/useListEventApi";

const ApproveEventModal = () => {
  const modals = useModals();
  const location: Location<IEvent> = useLocation();

  const { state: event } = location;
  const { isLoading, onUpdateEvent } = useUpdateEventApi(event._id);
  const { onListEvent } = useListEventApi();

  const onClose = useCallback(() => {
    modals.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    async (
      values: UpdateEventSchema,
      formikHelpers: FormikHelpers<UpdateEventSchema>,
    ) => {
      onUpdateEvent(values, formikHelpers).catch(() => {});
      onListEvent({ limit: 10 });
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (event) return;

    modals.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal>
      <Formik<UpdateEventSchema>
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(updateEventSchema)}
        validateOnBlur
        initialValues={{
          status: EventStatus.APPROVED,
          eventDate: null,
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="flex flex-col space-y-4 relative">
              <p className="text-xl w-full text-center">Approve an Event</p>
              <DropdownWithLabel
                label="Event Date"
                className="font-bold"
                value={values.eventDate || ""}
                placeholder="Select date for the event"
                onChange={handleChange("eventDate")}
                onBlur={handleBlur("eventDate")}
                errorMessage={errors.eventDate}
                error={touched.eventDate && !!errors.eventDate}
                disabled={isLoading}
                required
              >
                {event.proposedDates.map((date, index) => (
                  <DateSelection date={date} key={`proposed-date-${index}`} />
                ))}
              </DropdownWithLabel>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                type={"submit"}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ApproveEventModal;
