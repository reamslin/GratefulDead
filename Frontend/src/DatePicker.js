/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";

export default function DatePicker() {
  let history = useHistory();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1989-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      let month = (date.getMonth() + 1).toString();
      let day = date.getDate().toString();
      let year = date.getFullYear();

      month = month.length === 1 ? "0" + month : month;
      day = day.length === 1 ? "0" + day : day;
      if (month && day && year) {
        history.push(`/setlists?year=${year}&month=${month}&day=${day}`);
      }
    }
  };

  return (
    <span>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          margin="normal"
          id="date-picker-dialog"
          label="Select a Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </span>
  );
}
