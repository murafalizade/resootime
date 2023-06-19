import {
    openModal,
    selectChoosenTable,
    selectIsModelOpen,
} from '@/app/redux/commonSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDateRange } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';
import { IoPeopleOutline } from 'react-icons/io5';
import RestaurantService from '@/app/api/services/restaurantService';
import Cookie from '@/app/utils/Cookie';
import UserService from '@/app/api/services/userService';
import withErrorHandeler from '@/app/hof/withErrorHandler';
import { formatDate } from '@/app/constants/date';

interface Props {
    restaurant_id: number;
    hotelName: string;
    date: Date;
    people: number;
    img: string;
}

const ReservationModal = (props: Props) => {
    const isOpenModel = useSelector(selectIsModelOpen);
    const [error, setError] = useState<any>({});
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        comment: '',
    });
    const selectedTable = useSelector(selectChoosenTable);
    const dispatch = useDispatch();

    const getUserInfo = async (token: string) => {
        const userInfo = await UserService.getUserByToken(token);
        setUserInfo(userInfo);
    };

    useEffect(() => {
        const token = Cookie.get('token');
        if (token) {
            setIsLogin(true);
            getUserInfo(token);
        }
    }, []);

    const makeReservation = async () => {
        if (!userInfo?.phone_number) {
            setError({ phone_number: 'Telefon nömrəsi boş ola bilməz' });
            return;
        }
        if (!userInfo?.first_name) {
            setError({ first_name: 'Ad boş ola bilməz' });
            return;
        }
        if (!userInfo?.last_name) {
            setError({ last_name: 'Soyad boş ola bilməz' });
            return;
        }
        const localDate = props.date.toLocaleDateString(formatDate.locale);
        const req = {
            date:
                localDate.split('/')[2] +
                '-' +
                localDate.split('/')[1] +
                '-' +
                localDate.split('/')[0] +
                'T' +
                props.date
                    .toLocaleString(formatDate.locale)
                    .split(',')[1]
                    .slice(1, 6),
            user_id: userInfo?.id ? userInfo?.id : '',
            table_id: selectedTable?.id,
            email: userInfo?.email,
            phone_number: userInfo?.phone_number,
            first_name: userInfo?.first_name,
            last_name: userInfo?.last_name,
            comment: userInfo?.comment,
            people_count: props.people,
        };
        await withErrorHandeler(
            async (args: any) => {
                await RestaurantService.makeReservation(args.req, args.id);
            },
            'Rezervasiya uğurla tamamlandı',
            userInfo?.id ? '/my-reservation' : '',
            'Rezervasiya etmək mümkün olmadı',
        )({ req, id: props.restaurant_id });
        dispatch(openModal());
    };

    const inputHandler = (e: any) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return isOpenModel ? (
        <>
            <div
                className="modal mt-4 d-block"
                id="ReservationCompleteModal"
                aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="ReservationCompleteModalLabel">
                                Rezervasiya məlumatları
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
                            <p className="mx-3">
                                <b>Demək olar ki, bitirdiniz!</b>
                            </p>
                            <div className="d-flex mx-3">
                                <div>
                                    <Image
                                        src={props.img}
                                        alt="img"
                                        className="me-3 mb-3"
                                        width={70}
                                        height={70}
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b>{props.hotelName}</b>
                                    </p>
                                    <p className="d-flex">
                                        <span className="d-flex align-items-center">
                                            <MdDateRange />
                                            {props.date.toDateString()}
                                        </span>
                                        <span className="d-flex mx-1 align-items-center">
                                            <BiTimeFive />
                                            {props.date
                                                .toLocaleString()
                                                .split(',')[1]
                                                .slice(0, 6)}
                                        </span>
                                        <span className="d-flex mx-1 align-items-center ">
                                            <IoPeopleOutline />
                                            {props.people} nəfərlik
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="mx-3">
                                    <label className="form-label">Ad</label>
                                    <input
                                        disabled={isLogin}
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
                                        disabled={isLogin}
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
                                        disabled={isLogin}
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
                                        disabled={isLogin}
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

                            {/* <div className="mx-3 mt-3">
                                <label>Əlavələriniz</label>
                                <textarea
                                    name="comment"
                                    value={userInfo.comment}
                                    onChange={(e: any) => inputHandler(e)}
                                    className="form-control"
                                    rows={3}
                                />
                            </div> */}
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => makeReservation()}
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

export default ReservationModal;
