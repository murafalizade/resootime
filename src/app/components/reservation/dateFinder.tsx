import React, { useState } from "react";
import styles from "@/app/styles/dateFinder.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTables,
  makeLoading,
  openModal,
  selectChoosenTable,
} from "@/app/redux/commonSlice";
import ReservationModal from "./reservationModal";
import RestaurantService from "@/app/api/services/restaurantService";
import { formatDate } from "@/app/constants/date";

interface DateFinderProps {
  restName: string;
  restImage: string;
  restId: number;
  allowed?: boolean;
}

const DateFinder = ({
  restName,
  restImage,
  restId,
  allowed = true,
}: DateFinderProps) => {
  
  // dates
  const now = new Date();
  const [minTime,setMinTime] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    )
  );
  const [maxTime,setMaxTime] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0)
  );
  const [date, setDate] = useState(now);

  const [count, setCount] = useState(1);
  
  // tables
  const table = useSelector(selectChoosenTable);
  const dispatch = useDispatch();

  const handleCount = (e: any) => {
    setCount(e.target.value);
  };

  // open modal for make reservation
  const makeReservation = async () => {
    if (table) {
      dispatch(openModal());
    } else {
      dispatch(makeLoading());
      const filterTable = await RestaurantService.getAvailableTables(
        restId,
        date.toLocaleDateString(formatDate.locale),
        count
      );
      dispatch(filterTables(filterTable));
      dispatch(makeLoading());
    }
  };

  // change date
  const handleChangeDate = (date: any) => {
    setDate(date);
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    console.log(
      date.getTime(),tomorrow.getTime(),
    )
    if (date.getTime() >= tomorrow.getTime()) {
      // Allow selecting from 00:01 tomorrow
      setMinTime(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 1));
      setMaxTime(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59));
    } else {
      // Set minimum time to now and maximum time to end of day
      setMinTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));
      setMaxTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59));
    }
  };

  return (
    <div className={styles.date_finder}>
      <ReservationModal
        restaurant_id={restId}
        date={date}
        people={count}
        hotelName={restName}
        img={restImage}
      />
      <h4 className="fw-bold">Rezervasiya</h4>
      <label className={styles.label}>Ziyarətçi sayı</label>

      <select
        onChange={(e: any) => handleCount(e)}
        className="form-select mx-1 p-3 rounded-pill"
      >
        <option value="1">1 nəfər</option>
        <option value="2">2 nəfər</option>
        <option value="3">3 nəfər</option>
        <option value="4">4 nəfər</option>
        <option value="5">5+ nəfər</option>
      </select>
      <div className="d-flex justify-content-center my-2">
        <div className="mt-3 me-2 w-50">
          <label className={styles.label}>Tarix</label>
          <DatePicker
            selected={date}
            className="form-control p-3 rounded-pill"
            dateFormat="dd MMM"
            minDate={now}
            onChange={handleChangeDate}
          />
        </div>
        <div className="mt-3 ms-2 w-50">
          <label className={styles.label}>Saat</label>
          <DatePicker
            selected={date}
            onChange={handleChangeDate}
            showTimeSelect
            className="form-select p-3 rounded-pill"
            showTimeSelectOnly
            timeIntervals={30}
            minTime={minTime}
            maxTime={maxTime}
            dateFormat="HH:mm"
            timeFormat="HH:mm"
          />{" "}
        </div>
      </div>

      <button
        type="button"
        disabled={!allowed}
        onClick={makeReservation}
        className="btn btn-primary btn-lg mt-4 mb-2"
      >
        {table ? `Reserv edin ${table.name}` : "Masaları axtarın"}
      </button>
      {!allowed ?? (
        <span className="text-danger fs-6">
          Rezervasiya halhazırda mümkün deyil
        </span>
      )}
    </div>
  );
};

export default DateFinder;
