import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useModals } from "../../router";
import { Form, Formik, FormikHelpers } from "formik";
import {
  createEventSchema,
  CreateEventSchema,
} from "../../validations/event.validations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "../../components/reuseable/Input";
import Label from "../../components/reuseable/Label";
import { useAuthStore } from "../../store/auth.store";
import Button from "../../components/reuseable/Button";
import Dropdown from "../../components/reuseable/Dropdown";
import { useAvailableEventStore } from "../../store/resources/available-event.resources";
import { useUserStore } from "../../store/resources/user.resources";
import useCreateEventApi from "../../hooks/events/useCreateEventApi";
import useListEventApi from "../../hooks/events/useListEventApi";
import Modal from "../../components/reuseable/Modal";

const CreateEventModal = () => {
  const modals = useModals();
  const { isLoading, onCreateEvent } = useCreateEventApi();
  const { onListEvent } = useListEventApi();
  const user = useAuthStore((state) => state.user);
  const availableEvents = useAvailableEventStore((state) => state.data);
  const users = useUserStore((state) => state.data);
  const [minDate, setMinDate] = useState<string>();
  const onClose = useCallback(() => {
    modals.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = useCallback(
    async (
      values: CreateEventSchema,
      formikHelpers: FormikHelpers<CreateEventSchema>,
    ) => {
      await onCreateEvent(values, formikHelpers);
      onListEvent({ limit: 10 });
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    setMinDate(dayjs().add(2, "day").format("YYYY-MM-DD"));
  }, []);

  return (
    <Modal>
      <Formik<CreateEventSchema>
        onSubmit={onCreate}
        validationSchema={toFormikValidationSchema(createEventSchema)}
        validateOnBlur
        initialValues={{
          companyName: user.companyName,
          eventName: "",
          location: "",
          proposedDate1: "",
          proposedDate2: "",
          proposedDate3: "",
          proposedTo: "",
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="flex flex-col space-y-4 relative">
              <p className="text-xl w-full text-center">Schedule an Event</p>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Event Name" />
                <Dropdown
                  containerClass="col-span-2"
                  value={values.eventName}
                  placeholder="Select event"
                  onChange={handleChange("eventName")}
                  onBlur={handleBlur("eventName")}
                  errorMessage={errors.eventName}
                  error={touched.eventName && !!errors.eventName}
                  disabled={isLoading}
                  required
                >
                  {availableEvents.map((event) => (
                    <option value={event._id} key={`event-${event._id}`}>
                      {event.eventName}
                    </option>
                  ))}
                </Dropdown>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Location" />
                <Input
                  containerClass="col-span-2"
                  placeholder="Enter location of the event"
                  value={values.location}
                  onChange={handleChange("location")}
                  onBlur={handleBlur("location")}
                  errorMessage={errors.location}
                  error={touched.location && !!errors.location}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Proposed Dates 1" />
                <Input
                  containerClass="col-span-2"
                  type="datetime-local"
                  value={values.proposedDate1}
                  onChange={handleChange("proposedDate1")}
                  onBlur={handleBlur("proposedDate1")}
                  errorMessage={errors.proposedDate1 || ""}
                  error={touched.proposedDate1 && !!errors.proposedDate1}
                  min={minDate}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Proposed Dates 2" />
                <Input
                  containerClass="col-span-2"
                  type="datetime-local"
                  value={values.proposedDate2}
                  onChange={handleChange("proposedDate2")}
                  onBlur={handleBlur("proposedDate2")}
                  errorMessage={errors.proposedDate2 || ""}
                  error={touched.proposedDate2 && !!errors.proposedDate2}
                  min={minDate}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Proposed Dates 3" />
                <Input
                  containerClass="col-span-2"
                  type="datetime-local"
                  value={values.proposedDate3}
                  onChange={handleChange("proposedDate3")}
                  onBlur={handleBlur("proposedDate3")}
                  errorMessage={errors.proposedDate3 || ""}
                  error={touched.proposedDate3 && !!errors.proposedDate3}
                  min={minDate}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Proposed To" />
                <Dropdown
                  containerClass="col-span-2"
                  value={values.proposedTo}
                  placeholder="Select user"
                  onChange={handleChange("proposedTo")}
                  onBlur={handleBlur("proposedTo")}
                  errorMessage={errors.proposedTo}
                  error={touched.proposedTo && !!errors.proposedTo}
                  disabled={isLoading}
                  required
                >
                  {users.map((user) => (
                    <option value={user._id} key={`user-${user._id}`}>
                      {user.username}
                    </option>
                  ))}
                </Dropdown>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label label="Company Name" />
                <Input
                  containerClass="col-span-2"
                  value={values.companyName}
                  onChange={handleChange("companyName")}
                  onBlur={handleBlur("companyName")}
                  errorMessage={errors.companyName}
                  error={touched.companyName && !!errors.companyName}
                  disabled
                  required
                />
              </div>
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

export default CreateEventModal;
