import React, { useEffect } from 'react';
import styles from '@/app/styles/Form.module.scss';
import Cookie from '@/app/utils/Cookie';
import UserService from '@/app/api/services/userService';
import Swal from 'sweetalert2';
import Router from 'next/router';

const UserChangePasswordForm = ({ user }: any) => {
    const [error, setError] = React.useState<any>(null);

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
                        err.old_password ||
                        err.new_password ||
                        err.message ||
                        err.error ||
                        err,
                });
            }
        };
    };

    // handle the submit of the form
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!formData.old_password) {
            setError({ old_password: 'Köhnə parolu daxil edin' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.new_password) {
            setError({ new_password: 'Yeni parolu daxil edin' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (formData.new_password.length < 8) {
            setError({
                new_password: 'Parol ən azı 8 simvoldan ibarət olmalıdır',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (formData.new_password.match(/^[0-9]+$/)) {
            setError({
                new_password:
                    'Parol tamamilə rəqəmlərdən ibarətdir. Ən azı 1 hərf daxil edin',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (formData.new_password == formData.old_password) {
            setError({
                new_password: 'Yeni parol köhnə parol ile eyni ola bilməz',
            });
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
        }, 'İstifadəçinin parolu yeniləndi')(request);
    };

    return (
        <>
            <form className={`${styles.complete_form} form w-50`}>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="old_password">
                        Köhnə parol
                    </label>
                    <input
                        type="password"
                        name="old_password"
                        onChange={handleChange}
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.old_password}
                    </div>
                </div>
                <div>
                    <label className="p-2 ps-0 pt-3" htmlFor="new_password">
                        Yeni parol
                    </label>
                    <input
                        type="password"
                        name="new_password"
                        onChange={handleChange}
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.new_password}
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="btn w-50 btn-primary my-4">
                        Parolu Yenilə
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserChangePasswordForm;
