import { openModal, selectIsModelOpen } from '@/app/redux/commonSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import withErrorHandeler from '@/app/hof/withErrorHandler';
import RestaurantService from '@/app/api/services/restaurantService';
import { formatDate } from '@/app/constants/date';

const AdminModal = ({ date, selectedTable, restId }: any) => {
    const isOpenModel = useSelector(selectIsModelOpen);
    const [error, setError] = useState<any>({});
    const dispatch = useDispatch();
    const [reservDate, setReservDate] = React.useState(
        date
            ? new Date(
                  date.split('/')[1] +
                      '/' +
                      date.split('/')[0] +
                      '/' +
                      date.split('/')[2] +
                      ' ' +
                      new Date().toLocaleString().split(',')[1].slice(1, 6),
              )
            : new Date(),
    );
    const [userInfo, setUserInfo] = useState<any>({
        first_name: 'Admin',
        last_name: 'Admin',
        email: '',
        phone_number: '',
    });

    useEffect(() => {
        setReservDate(
            date
                ? new Date(
                      date.split('/')[1] +
                          '/' +
                          date.split('/')[0] +
                          '/' +
                          date.split('/')[2],
                  )
                : new Date(),
        );
    }, [date]);
    const makeReservation = async () => {
        if (!userInfo?.first_name) {
            setError({ first_name: 'Ad boş ola bilməz' });
            return;
        }
        if (!userInfo?.last_name) {
            setError({ last_name: 'Soyad boş ola bilməz' });
            return;
        }
        if (!userInfo?.email) {
            setError({ email: 'Email boş ola bilməz' });
            return;
        }
        // valid email check
        if (!userInfo?.email.includes('@') || !userInfo?.email.includes('.')) {
            setError({ email: 'Email düzgün deyil' });
            return;
        }
        if (!userInfo?.phone_number) {
            setError({ phone_number: 'Telefon nömrəsi boş ola bilməz' });
            return;
        }
        const localDate = reservDate.toLocaleDateString(formatDate.locale);
        const req = {
            date:
                localDate.split('/')[2] +
                '-' +
                localDate.split('/')[1] +
                '-' +
                localDate.split('/')[0] +
                'T' +
                reservDate
                    .toLocaleString(formatDate.locale)
                    .split(',')[1]
                    .slice(1, 6),
            user_id: '',
            table_id: selectedTable?.id,
            email: userInfo.email,
            phone_number: userInfo.phone_number,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
        };
        await withErrorHandeler(
            async (args: any) => {
                await RestaurantService.makeReservation(args.req, args.id);
            },
            'Rezervasiya uğurla tamamlandı',
            '',
            'Rezervasiya etmək mümkün olmadı',
        )({ req, id: restId });
        dispatch(openModal());
    };

    const inputHandler = (e: any) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return isOpenModel ? (
        <>
            <div
                className="modal mt-4 d-block"
                id="exampleModal"
                aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Rezervasiya
                            </h5>
                            <button
                                onClick={() => {
                                    dispatch(openModal());
                                }}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-between mt-3">
                                <div className="mx-3">
                                    <label>Tarix</label>
                                    <DatePicker
                                        selected={reservDate}
                                        className="form-control"
                                        dateFormat="dd MMM"
                                        disabled
                                        onChange={(date: Date) =>
                                            setReservDate(date)
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Saat</label>
                                    <DatePicker
                                        selected={reservDate}
                                        onChange={(date: Date) =>
                                            setReservDate(date)
                                        }
                                        showTimeSelect
                                        className="form-select"
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        dateFormat="HH:mm"
                                        timeFormat="HH:mm"
                                    />{' '}
                                </div>
                            </div>

                            <div className="mx-3 mt-3 mb-3">
                                <label>Avaible tables</label>
                                <select disabled className="form-select mx-1">
                                    <option value={selectedTable.name}>
                                        {selectedTable.name}
                                    </option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div className="mx-3">
                                    <label className="form-label">Ad</label>
                                    <input
                                        name="first_name"
                                        value={userInfo.first_name}
                                        onChange={(e: any) => inputHandler(e)}
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="invalid-feedback d-block">
                                        {error?.first_name}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">Soyad</label>
                                    <input
                                        name="last_name"
                                        value={userInfo.last_name}
                                        onChange={(e: any) => inputHandler(e)}
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="invalid-feedback d-block">
                                        {error?.last_name}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <div className="mx-3">
                                    <label className="form-label">
                                        Əlaqə nömrəsi
                                    </label>
                                    <input
                                        name="phone_number"
                                        value={userInfo.phone_number}
                                        onChange={(e: any) => inputHandler(e)}
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="invalid-feedback d-block">
                                        {error?.phone_number}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        value={userInfo.email}
                                        onChange={(e: any) => inputHandler(e)}
                                        type="email"
                                        className="form-control"
                                    />
                                    <div className="invalid-feedback d-block">
                                        {error?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={makeReservation}
                                type="button"
                                className="btn btn-lg btn-primary">
                                Rezervasiyanı tamamla
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default AdminModal;
