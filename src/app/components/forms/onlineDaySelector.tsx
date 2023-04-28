import React, { useEffect } from 'react';
import { weekDay } from '@/app/constants/weekDay';
import styles from '@/app/styles/Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeReservationDay,
    selectReservationDay,
} from '@/app/redux/commonSlice';
import { IDay } from '@/app/types/IDay';

interface IOnlineDaySelectorProps {
    disabled?: boolean;
    data: IDay[];
}

const OnlineDaySelector = ({ data, disabled }: IOnlineDaySelectorProps) => {
    // all week day
    const days = weekDay;

    // redux
    const workTime = useSelector(selectReservationDay);
    const [selected, setSelected] = React.useState<string>('');
    const dispatch = useDispatch();

    // when compontent mount
    useEffect(() => {
        if (workTime.length > 0) {
            dispatch(changeReservationDay(data));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const addDay = (e: any, day: string) => {
        e.preventDefault();
        if (disabled) return;
        // update redux
        if (!day) {
            alert('Zəhmət olmasa gün seçin.');
            return;
        }
        const newWorkTime = [...workTime];
        const index = newWorkTime.findIndex((item) => item.day === day);
        if (index === -1) {
            newWorkTime.push({
                day,
                open_at: newWorkTime[0]?.open_at || '09:00',
                close_at: newWorkTime[0]?.close_at || '18:00',
            });
        }
        // update redux
        else {
            newWorkTime.splice(index, 1);
        }
        dispatch(changeReservationDay(newWorkTime));
    };

    // check day selected
    const checkingDaySelected = (day: string) => {
        return workTime.findIndex((item) => item.day === day) !== -1;
    };

    // set open date
    const setOpenDate = (selected: string, time: string) => {
        const newWorkTime = [...workTime];
        const index = newWorkTime.findIndex((item) => item.day === selected);
        if (newWorkTime[index]) {
            newWorkTime[index] = { ...newWorkTime[index], open_at: time };
            dispatch(changeReservationDay(newWorkTime));
        } else {
            alert('Zəhmət olmasa ilk öncə iş gününü əlavə edin.');
        }
    };

    // set close date
    const setCloseDate = (selected: string, time: string) => {
        const newWorkTime = [...workTime];
        const index = newWorkTime.findIndex((item) => item.day === selected);
        if (newWorkTime[index]) {
            newWorkTime[index] = { ...newWorkTime[index], close_at: time };
            dispatch(changeReservationDay(newWorkTime));
        } else {
            alert('Zəhmət olmasa ilk öncə iş gününü əlavə edin.');
        }
    };

    return (
        <>
            <div className={`${styles.day_selector}`}>
                {days.map((day, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setSelected(day.name)}
                            style={
                                disabled
                                    ? {
                                          cursor: 'not-allowed',
                                          pointerEvents: 'none',
                                          opacity: 0.5,
                                      }
                                    : {}
                            }
                            className={`border ${
                                day.name === selected ? 'border-primary' : ''
                            } col-2 text-center py-2`}>
                            {day.day}
                        </div>
                    );
                })}
            </div>
            <div className="d-flex justify-content-between">
                <p className=" py-0 fs-6">
                    {checkingDaySelected(selected)
                        ? selected + ' günü üçün iş saatı'
                        : null}
                </p>
                <button
                    disabled={disabled}
                    onClick={(e) => addDay(e, selected)}
                    className="btn btn-sm mt-2 px-2 py-0 fs-6 btn-primary">
                    {checkingDaySelected(selected) ? 'Sil' : 'Əlavə et'}
                </button>
            </div>
            <div className="d-flex my-3  align-items-center">
                <input
                    disabled={disabled}
                    value={
                        workTime.find((x) => x.day === selected)?.open_at ||
                        '09:00'
                    }
                    onChange={(e) => {
                        setOpenDate(selected, e.target.value);
                    }}
                    type="time"
                    placeholder="Açılma saatı"
                    className="form-control"
                />
                <span className="mx-2">:</span>
                <input
                    disabled={disabled}
                    value={
                        workTime.find((x) => x.day === selected)?.close_at ||
                        '18:00'
                    }
                    type="time"
                    onChange={(e) => {
                        setCloseDate(selected, e.target.value);
                    }}
                    placeholder="Bağlanma saatı"
                    className="form-control"
                />
            </div>
        </>
    );
};

export default OnlineDaySelector;
