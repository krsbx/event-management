import dayjs from "dayjs";
import { memo, useMemo } from "react";

type Props = {
  date: Date | string;
};

const DateSelection = memo<Props>((props) => {
  const date = useMemo(() => {
    const date = dayjs(props.date);

    return {
      value: date.toISOString(),
      label: date.format("DD MMM YYYY"),
    };
  }, [props.date]);

  return <option value={date.value}>{date.label}</option>;
});

export default DateSelection;
