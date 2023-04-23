import UserService from '@/app/api/services/userService';
import { makeLoading, selectIsLoading } from '@/app/redux/commonSlice';
import Cookie from '@/app/utils/Cookie';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../layout/loading';
import styles from '@/app/styles/Form.module.scss';
import Swal from 'sweetalert2';

const LoginForum = () => {
    // create state object which include  all inputs
    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = React.useState<any>();

    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    // handle change function
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    useEffect(() => {
        // check if token is logged in
        const token = Cookie.get('token');
        if (token) {
            Router.push('/');
        }
    }, []);

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
            location: '',
            restaurant_name: '',
        };
        // send data to server
        dispatch(makeLoading());
        try {
            const user = await UserService.register(data);
            // set cookie token
            Cookie.set('token', user.token, user.expiry);
            // redirect to home page
            Router.push('/');
        } catch (err: any) {
            setError(err);
            Swal.fire({
                icon: 'error',
                title: 'Xəta baş verdi',
                text:
                    err.email ||
                    err.password ||
                    err.phone_number ||
                    err.password2 ||
                    err.message ||
                    err.error ||
                    err,
            });
        }
        dispatch(makeLoading());
    };

    return (
        <div className={styles.form_main}>
            {isLoading ? <Loading /> : null}
            <h4 className="text-center">Qeydiyyat</h4>
            <form className="form w-75">
                <div>
                    <label htmlFor="firstname">Ad</label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="firstName"
                        type="text"
                        placeholder="Ad"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.first_name}
                    </div>
                </div>
                <div>
                    <label htmlFor="lastName">Soyad</label>
                    <input
                        onChange={(e: any) => handleChange(e)}
                        name="lastName"
                        type="text"
                        placeholder="Soyad"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.last_name}
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={(e: any) => handleChange(e)}
                        placeholder="Email"
                        name="email"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.email}
                    </div>
                </div>
                <div>
                    <label htmlFor="phone">Mobil nömrə</label>
                    <input
                        type="phone"
                        onChange={(e: any) => handleChange(e)}
                        placeholder="Mobil nömrə"
                        name="phone"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.phone_number}
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Şifrə</label>
                    <input
                        type="password"
                        onChange={(e: any) => handleChange(e)}
                        name="password"
                        placeholder="Şifrə"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.password}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        onClick={(e: any) => handleSubmit(e)}
                        className="btn btn-primary my-4">
                        Qeydiyyat
                    </button>
                </div>
                <p className="text-muted text-center fs-6">
                    Hesabınız varsa,{' '}
                    <a href="/login" className="fs-6">
                        daxil olun
                    </a>
                    .
                </p>
            </form>
        </div>
    );
};

export default LoginForum;
