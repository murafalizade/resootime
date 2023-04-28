import React, { useEffect } from 'react';
import { weekDay } from '@/app/constants/weekDay';
import styles from '@/app/styles/Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDay, selectWorkDays } from '@/app/redux/commonSlice';

const WorkDaySelector = ({ working_hours }: any) => {
    // all week day
    const days = weekDay;

    // redux
    const workTime = useSelector(selectWorkDays);
    const dispatch = useDispatch();

    // when compontent mount
    useEffect(() => {
        if (working_hours.length > 0) {
            dispatch(changeDay(working_hours));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const addDay = (day: string) => {
        // update redux
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
        dispatch(changeDay(newWorkTime));
    };

    // check day selected
    const checkingDaySelected = (day: string) => {
        return workTime.findIndex((item) => item.day === day) !== -1;
    };

    // set open date
    const setOpenDate = (time: string) => {
        const newWorkTime = [...workTime];
        if (newWorkTime[0]) {
            newWorkTime[0] = { ...newWorkTime[0], open_at: time };
            dispatch(changeDay(newWorkTime));
        } else {
            alert('Zəhmət olmasa ilk öncə iş gününü seçin');
        }
    };

    // set close date
    const setCloseDate = (time: string) => {
        const newWorkTime = [...workTime];
        if (newWorkTime[0]) {
            newWorkTime[0] = { ...newWorkTime[0], close_at: time };
            dispatch(changeDay(newWorkTime));
        } else {
            alert('Zəhmət olmasa ilk öncə iş gününü seçin');
        }
    };

    return (
        <>
            <div className={`${styles.day_selector}`}>
                {days.map((day, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => addDay(day.name)}
                            className={`border ${
                                checkingDaySelected(day.name)
                                    ? 'border-primary'
                                    : ''
                            } col-2 text-center py-2`}>
                            {day.day}
                        </div>
                    );
                })}
            </div>
            <div className="d-flex my-3  align-items-center">
                <input
                    value={workTime[0]?.open_at || '09:00'}
                    onChange={(e) => {
                        setOpenDate(e.target.value);
                    }}
                    type="time"
                    placeholder="Açılma saatı"
                    className="form-control"
                />
                <span className="mx-2">:</span>
                <input
                    min={workTime[0]?.open_at}
                    value={workTime[0]?.close_at || '18:00'}
                    type="time"
                    onChange={(e) => {
                        setCloseDate(e.target.value);
                    }}
                    placeholder="Bağlanma saatı"
                    className="form-control"
                />
            </div>
        </>
    );
};

export default WorkDaySelector;
