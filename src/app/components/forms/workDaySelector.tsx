import React, { useEffect } from 'react';
import { weekDay } from '@/app/constants/weekDay';
import styles from '@/app/styles/Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDay, selectWorkDays } from '@/app/redux/commonSlice';
import SelectOptions from '@/app/components/forms/selectOptions';

const WorkDaySelector = ({ working_hours }: any) => {
    // all week day
    const days = weekDay;

    // redux
    const workTime = useSelector(selectWorkDays);
    const dispatch = useDispatch();

    // when compontent mount
    // useEffect(() => {
    //     if (working_hours.length > 0) {
    //         dispatch(changeDay(working_hours));
    //     }
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const allDayHours = [
        { value: '1', label: '00:00' },
        { value: '2', label: '00:30' },
        { value: '3', label: '01:00' },
        { value: '4', label: '01:30' },
        { value: '5', label: '02:00' },
        { value: '6', label: '02:30' },
        { value: '7', label: '03:00' },
        { value: '8', label: '03:30' },
        { value: '9', label: '04:00' },
        { value: '10', label: '04:30' },
        { value: '11', label: '05:00' },
        { value: '12', label: '05:30' },
        { value: '13', label: '06:00' },
        { value: '14', label: '06:30' },
        { value: '15', label: '07:00' },
        { value: '16', label: '07:30' },
        { value: '17', label: '08:00' },
        { value: '18', label: '08:30' },
        { value: '19', label: '09:00' },
        { value: '20', label: '09:30' },
        { value: '21', label: '10:00' },
        { value: '22', label: '10:30' },
        { value: '23', label: '11:00' },
        { value: '24', label: '11:30' },
        { value: '25', label: '12:00' },
        { value: '26', label: '12:30' },
        { value: '27', label: '13:00' },
        { value: '28', label: '13:30' },
        { value: '29', label: '14:00' },
        { value: '30', label: '14:30' },
        { value: '31', label: '15:00' },
        { value: '32', label: '15:30' },
        { value: '33', label: '16:00' },
        { value: '34', label: '16:30' },
        { value: '35', label: '17:00' },
        { value: '36', label: '17:30' },
        { value: '37', label: '18:00' },
        { value: '38', label: '18:30' },
        { value: '39', label: '19:00' },
        { value: '40', label: '19:30' },
        { value: '41', label: '20:00' },
        { value: '42', label: '20:30' },
        { value: '43', label: '21:00' },
        { value: '44', label: '21:30' },
        { value: '45', label: '22:00' },
        { value: '46', label: '22:30' },
        { value: '47', label: '23:00' },
        { value: '48', label: '23:30' },
    ];

    return (
        <>
            <div className={`${styles.day_selector}`}>
                {days.map((day, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => addDay(day.name)}
                            className={`${
                                checkingDaySelected(day.name)
                                    ? 'selected-day'
                                    : 'unselected-day'
                            } col-2 text-center py-2`}>
                            {day.day}
                        </div>
                    );
                })}
            </div>
            <div className="d-flex mt-3 align-items-center w-444">
                <SelectOptions
                    options={allDayHours}
                    placeholder="Açılma vaxtı"
                    isHourSelector={true}
                />
                <span className="mx-2">:</span>
                <SelectOptions
                    options={allDayHours}
                    placeholder="Bağlanma vaxtı"
                    isHourSelector={true}
                />

                {/* <input
                    value={workTime[0]?.open_at || '09:00'}
                    onChange={(e) => {
                        setOpenDate(e.target.value);
                    }}
                    type="time"
                    placeholder="Açılma saatı"
                    className="form-control"
                />
                <input
                    min={workTime[0]?.open_at}
                    value={workTime[0]?.close_at || '18:00'}
                    type="time"
                    onChange={(e) => {
                        setCloseDate(e.target.value);
                    }}
                    placeholder="Bağlanma saatı"
                    className="form-control"
                /> */}
            </div>
        </>
    );
};

export default WorkDaySelector;
