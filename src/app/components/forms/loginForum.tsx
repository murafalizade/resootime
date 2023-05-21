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
    // create state object for email and password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<any>();
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    // create function to handle submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // create object to send to server
        const data = {
            email,
            password,
        };
        // send data to server
        dispatch(makeLoading());
        try {
            const user = await UserService.login(data);
            // set cookie token
            console.log(user);
            Cookie.set(
                'token',
                user.token,
                'Tue, 19 Jan 2038 03:14:07 GMT',
                user.restaurant,
            );
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

    useEffect(() => {
        // check if token is logged in
        const token = Cookie.get('token');
        if (token) {
            Router.push('/');
        }
    }, []);

    return (
        <div className={styles.form_main}>
            {isLoading ? <Loading /> : null}
            <h4 className="text-center">Daxil ol</h4>
            <form className="form w-75">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e: any) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.email}
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Şifrə</label>
                    <input
                        onChange={(e: any) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Şifrə"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.password}
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-end">
                    <a className="text-muted mt-2 text-decoration-none fs-6 link">
                        Şifrənizi unutmusuz?
                    </a>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        onClick={(e: any) => handleSubmit(e)}
                        className="btn btn-primary my-4">
                        Daxil ol
                    </button>
                </div>
                <p className="text-muted text-center fs-6">
                    Əgər hesabınız yoxdursa, zəhmət olmasa{' '}
                    <a href="/register" className="fs-6">
                        qeydiyyatdan
                    </a>{' '}
                    keçin.
                </p>
            </form>
        </div>
    );
};

export default LoginForum;
