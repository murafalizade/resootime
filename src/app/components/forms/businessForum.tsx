import UserService from '@/app/api/services/userService';
import { makeLoading, selectIsLoading } from '@/app/redux/commonSlice';
import Cookie from '@/app/utils/Cookie';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../layout/loading';
import styles from '@/app/styles/Form.module.scss';
import Swal from 'sweetalert2';
import Link from 'next/link';

const BusinessForum = () => {
    // create state object which include  all inputs
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        passwordComfirm: '',
        location: '',
        restaurantName: '',
    });

    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    // handle change function
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    // create function to handle submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // create object to send to server
        const data = {
            email: inputs.email,
            password: inputs.password,
            phone_number: inputs.phone,
            first_name: inputs.firstName,
            last_name: inputs.lastName,
            password2: inputs.password,
            location: inputs.location,
            restaurant_name: inputs.restaurantName,
        };
        // send data to server
        dispatch(makeLoading());
        try {
            const user = await UserService.register(data);
            // set cookie token

            Cookie.set('token', user.token, user.expire, user.restaurant);
            // set cookie for complete notification
            Cookie.set('CompleteInfo', 'true', user.expiry);

            // redirect to home page
            Router.push('/');
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:
                    err.email ||
                    err.password ||
                    err.phone_number ||
                    err.message ||
                    err.error ||
                    err,
            });
        }
    };

    return (
        <div className={styles.form_main}>
            {isLoading ? <Loading /> : null}
            <h4 className="text-center">Qeydiyyat</h4>

            <form className="form w-75">
                <div>
                    <label htmlFor="firstName">Ad</label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="firstName"
                        placeholder="Ad"
                        value={inputs.firstName}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Soyad</label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="lastName"
                        value={inputs.lastName}
                        type="text"
                        placeholder="Soyad"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={(e: any) => handleChange(e)}
                        placeholder="Email"
                        value={inputs.email}
                        name="email"
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="phone">Mobil nömrə</label>
                    <input
                        type="phone"
                        onChange={(e: any) => handleChange(e)}
                        placeholder="Mobil nömrə"
                        name="phone"
                        value={inputs.phone}
                        className="form-control"
                    />
                </div>
                <div>
                    <label htmlFor="restaurantName">Restoran adı</label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="restaurantName"
                        type="text"
                        placeholder="Restoran adı"
                        value={inputs.restaurantName}
                        className="form-control"
                    />
                </div>
                {/* <div>
                    <label htmlFor="location">
                        Restoranın yerləşdiyi şəhər
                    </label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="location"
                        value={inputs.location}
                        type="text"
                        placeholder="Restoranın yerləşdiyi şəhər"
                        className="form-control"
                    />
                </div> */}
                <div>
                    <label htmlFor="password">Şifrə</label>
                    <input
                        type="password"
                        onChange={(e: any) => handleChange(e)}
                        name="password"
                        placeholder="Şifrə"
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        onClick={(e: any) => handleSubmit(e)}
                        className="btn btn-primary my-4">
                        Qeydiyyat
                    </button>
                </div>
                <p className="text-muted  text-center fs-6">
                    Hesabınız varsa,{' '}
                    <a href={'/login'} className="fs-6">
                        daxil olun
                    </a>
                    .
                </p>
            </form>
        </div>
    );
};

export default BusinessForum;
