import RestaurantService from '@/app/api/services/restaurantService';
import BASE_URL from '@/app/constants/baseUrl';
import withErrorHandeler from '@/app/hof/withErrorHandler';
import Cookie from '@/app/utils/Cookie';
import styles from '@/app/styles/Form.module.scss';
import Image from 'next/image';
import React, { useEffect } from 'react';
import WorkDaySelector from './workDaySelector';
import { useSelector } from 'react-redux';
import { selectReservationDay, selectWorkDays } from '@/app/redux/commonSlice';
import OnlineDaySelector from './onlineDaySelector';

const CompleteInfoForum = ({ res, isUpdate }: any) => {
    const [error, setError] = React.useState<any>(null);
    const [selectedImages, setSelectedImages] = React.useState<any>(
        res?.images?.map((item: any) => `${BASE_URL}${item.image}`),
    );

    // get token from cookie
    const [token, setToken] = React.useState<any>(null);

    useEffect(() => {
        const token = Cookie.get('token');
        setToken(token);
    }, []);

    const workTime = useSelector(selectWorkDays);
    const onlineReservHours = useSelector(selectReservationDay);

    // create object state which will be used to store the form data
    const [formData, setFormData] = React.useState<any>({
        allowed: res?.is_allowed,
        gallery: [],
        address: res?.location,
        description: res?.description,
        googleMapLink: res?.googleMapLink,
        maxGuests: 0,
        name: res?.name,
        phone: res.phone,
        profileImage: '',
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

    // file upload handler and update formData
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            const newFormData = { ...formData };
            const src = URL.createObjectURL(files[0]);
            newFormData.profileImage = files[0];
            newFormData.gallery = [files[0], ...formData.gallery];
            setFormData(newFormData);
            setSelectedImages([src, ...selectedImages]);
        }
    };

    // galery file upload handler and update formData
    const handleGalleryFileUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { files } = e.target;
        if (files) {
            const newFormData = { ...formData };
            const srcs = Array.from(files).map((item) =>
                URL.createObjectURL(item),
            );
            newFormData.gallery = [newFormData.profileImage, ...files];
            setFormData(newFormData);
            setSelectedImages([selectedImages[0], ...srcs]);
        }
    };

    // handle the submit of the form
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formData.name) {
            setError({ name: 'Restoranın adı boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.phone) {
            setError({ phone: 'Restoranın telefon nömrəsi boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.description) {
            setError({ description: 'Restoranın təsviri boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.address) {
            setError({ address: 'Restoranın ünvanı boş ola bilməz' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!formData.googleMapLink) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({
                googleMapLink: 'Restoranın google map linki boş ola bilməz',
            });
            return;
        }
        if (selectedImages.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({ profileImage: 'Restoranın şəkli boş ola bilməz' });
            return;
        }
        if (workTime.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({ workTime: 'Restoranın iş saatı boş ola bilməz' });
            return;
        }
        if (onlineReservHours.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({
                onlineReservHours:
                    'Restoranın online rezerv saatı boş ola bilməz',
            });
            return;
        } else {
            setError({});
        }
        // formdata state converting request
        const request = {
            name: formData.name,
            phone: formData.phone,
            description: formData.description,
            is_allowed: formData.allowed,
            location: formData.address,
            googleMapLink: formData.googleMapLink,
            working_hours_data: workTime,
            online_reserv_hours_data: onlineReservHours,
        };

        withErrorHandeler(
            async (req: any) => {
                await RestaurantService.updateRestaurant(req, res.id, token);
                if (formData.gallery?.length > 0) {
                    await RestaurantService.deleteImage(res.id, token);
                    formData.gallery?.map(async (item: any) => {
                        await RestaurantService.addImage(
                            { image: item, restaurant: res.id },
                            res.id,
                            token,
                        );
                    });
                    if (!isUpdate) {
                        Cookie.delete('CompleteInfo');
                    }
                }
            },
            'Restoranın məlumatları yeniləndi',
            '/create-map',
        )(request);
    };

    return (
        <div className="d-flex justify-content-center flex-column align-items-center">
            <h5 className="text-center m-4">
                {isUpdate ? 'Tənzimləmələr' : 'Biznes məlumatlarını tamamlayın'}
            </h5>
            <form className={`${styles.complete_form} form`}>
                <label className="p-2 ps-0 pt-3">Restoranın adı</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Restoranın adı"
                    className="form-control"
                />
                <div className="invalid-feedback d-block">{error?.name}</div>

                <label className="p-2 ps-0 pt-3">
                    Restoranın əlaqə nömrəsi
                </label>
                <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="050 123 45 67"
                    className="form-control"
                />
                <div className="invalid-feedback d-block">{error?.phone}</div>

                <label className="p-2 ps-0 pt-3">Restoranın təsviri</label>
                <textarea
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    rows={4}
                    placeholder="Restoranın təsvir edin..."
                    className="form-control"
                />
                <div className="invalid-feedback d-block">
                    {error?.description}
                </div>

                <label className="p-2 ps-0 pt-3">Restoranın ünvanı </label>
                <input
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    placeholder="15 Tarlan Aliyar St, Baku 1005"
                    className="form-control"
                />
                <div className="invalid-feedback d-block">{error?.address}</div>

                <label className="p-2 ps-0 pt-3">
                    Restoranın “Google Xəritə”dəki ünvanının linki{' '}
                </label>
                <input
                    type="text"
                    value={formData.googleMapLink}
                    onChange={handleChange}
                    name="googleMapLink"
                    placeholder="https://maps.app.goo.gl/YdXkj5hEiBal3Ga"
                    className="form-control"
                />
                <div className="invalid-feedback d-block">
                    {error?.googleMapLink}
                </div>

                <label className="p-2 ps-0 pt-3 d-block">Profil şəkili </label>
                <label
                    htmlFor="single_file"
                    className="btn w-75 text-nowrap btn-primary form-control ">
                    Profil şəkili yükləyin{' '}
                </label>
                <input
                    onChange={handleFileUpload}
                    hidden
                    type="file"
                    id="single_file"
                />
                <div className="invalid-feedback d-block">
                    {error?.profileImage}
                </div>

                <label className="p-2 ps-0 pt-3 d-block">Qalereya</label>
                <label
                    htmlFor="multipy_image"
                    className="btn text-nowrap w-75 btn-primary form-control ">
                    Digər şəkilləri yükləyin{' '}
                </label>

                <div className="d-flex mt-4 overflow-auto">
                    {selectedImages?.map((image: any, index: number) => {
                        return (
                            <Image
                                src={image}
                                alt=""
                                key={index}
                                style={{
                                    aspectRatio: '1/1',
                                    objectFit: 'contain',
                                }}
                                width={80}
                                height={80}
                                className="img-fluid me-2"
                            />
                        );
                    })}
                </div>
                <input
                    onChange={handleGalleryFileUpload}
                    id="multipy_image"
                    type="file"
                    hidden
                    multiple
                    className="form-control"
                />

                <label className="p-2 ps-0 pt-3 d-block">İş vaxtı</label>
                <WorkDaySelector working_hours={res.working_hours} />
                <div className="invalid-feedback d-block">
                    {error?.workTime}
                </div>

                <label className="p-2 ps-0 pt-3 d-block">
                    Rezervasiya vaxtı
                </label>
                <OnlineDaySelector
                    data={res.online_reserv_hours}
                    disabled={!formData.allowed}
                />
                <div className="invalid-feedback d-block">
                    {error?.onlineReservationTime}
                </div>

                <label className="p-2 ps-0 pt-3">
                    Onlayn rezervasiya etmək mümkünlüyü{' '}
                    <input
                        checked={formData.allowed}
                        onChange={() =>
                            setFormData({
                                ...formData,
                                allowed: !formData.allowed,
                            })
                        }
                        type={'checkbox'}
                        name="allowed"
                        className="p-2 m-2"
                    />
                </label>
                <div className="invalid-feedback d-block">
                    {error?.onlineReservationTime}
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="btn w-50 btn-primary my-4">
                        {isUpdate ? 'Yadda Saxla' : 'Tamamla'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompleteInfoForum;
