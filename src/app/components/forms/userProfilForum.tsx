import React, { useEffect } from 'react';
import styles from '@/app/styles/Form.module.scss';
import Cookie from '@/app/utils/Cookie';
import UserService from '@/app/api/services/userService';
// import withErrorHandeler from '@/app/hof/withErrorHandler';
import Swal from 'sweetalert2';
import Router from 'next/router';

const UserSettingsForm = ({ user }: any) => {
    const [error, setError] = React.useState<any>();

    // get token from cookie
    const [token, setToken] = React.useState<any>(null);

    useEffect(() => {
        const token = Cookie.get('token');
        setToken(token);
    }, []);

    // create object state which will be used to store the form data
    const [formData, setFormData] = React.useState<any>({
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone_number: user?.phone_number,
        email: user?.email,
        old_password: user?.old_password,
        new_password: user?.new_password,
    });

    // handle the change of the input in typescript
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
    };

    // handle the error of the inputs
    const handleError = (
        callback: ({ args }: { args: any }) => void,
        succesMsj: string,
        callbackUrl?: string,
    ) => {
        return async (args: any) => {
            try {
                await callback(args);
                Swal.fire(succesMsj, '', 'success').then(() => {
                    callbackUrl ? Router.push(callbackUrl) : Router.reload();
                });
            } catch (err: any) {
                setError(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Xəta',
                    text:
                        err.email ||
                        err.phone_number ||
                        err.message ||
                        err.error ||
                        err,
                });
            }
        };
    };

    // handle the submit of the form
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.first_name) {
            setError({ first_name: 'İstifadəçinin adı boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.last_name) {
            setError({ last_name: 'İstifadəçinin soyadı boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.phone_number) {
            setError({
                phone_number: 'İstifadəçinin telefon nömrəsi boş ola bilməz',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.email) {
            setError({ email: 'İstifadəçinin email ünvanı boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setError({ email: 'Düzgün email ünvanı daxil edin' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        } else {
            setError({});
        }

        // formdata state converting request
        const request = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            email: formData.email,
            old_password: formData.old_password,
            new_password: formData.new_password,
        };

        handleError(async (req: any) => {
            await UserService.updateUser(req, user.id, token);
        }, 'İstifadəçinin məlumatları yeniləndi')(request);
    };

    return (
        <>
            <form className={`${styles.complete_form} form w-50`}>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="first_name">
                        Ad
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Ad"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.first_name}
                    </div>
                </div>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="last_name">
                        Soyad
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Soyad"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.last_name}
                    </div>
                </div>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="phone_number">
                        Nömrə
                    </label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Nömrə"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.phone_number}
                    </div>
                </div>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.email}
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="btn w-50 btn-primary my-4">
                        Yadda Saxla
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserSettingsForm;
