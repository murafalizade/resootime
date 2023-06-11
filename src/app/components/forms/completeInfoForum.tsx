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
import Link from 'next/link';

const CompleteInfoForum = ({ res, isUpdate }: any) => {
    const [error, setError] = React.useState<any>(null);
    const [selectedImages, setSelectedImages] = React.useState<any>(
        res?.images?.map((item: any) => `${BASE_URL}${item.image}`),
    );
    const [isFirstPage, setIsFirstPage] = React.useState<boolean>(true);
    const [isSecondPage, setIsSecondPage] = React.useState<boolean>(false);
    const [isThirdPage, setIsThirdPage] = React.useState<boolean>(false);
    const [guestCount, setGuestCount] = React.useState<number>(1);

    // get token from cookie
    const [token, setToken] = React.useState<any>(null);

    useEffect(() => {
        const token = Cookie.get('token');
        setToken(token);
    }, []);

    const workTime = useSelector(selectWorkDays);
    const onlineReservHours = useSelector(selectReservationDay);
    // console.log(res)

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
        <div
            className={`d-flex justify-content-center flex-column align-items-center`}>
            <h5 className={`text-center m-4 ${styles.form_heading}`}>
                {isUpdate ? 'Tənzimləmələr' : 'Biznes məlumatlarını tamamlayın'}
            </h5>
            {isFirstPage && (
                <form className={`${styles.complete_form} form`}>
                    <label className="p-2 ps-0 pt-3">
                        Restoranın adı
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Restoranın adını daxil edin"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.name}
                    </div>

                    <label className="p-2 ps-0 pt-3">
                        Restoranın əlaqə nömrəsi
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Əlaqə nömrəsi"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.phone}
                    </div>

                    <label className="p-2 ps-0 pt-3">
                        Restoranın təsviri
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                        rows={4}
                        placeholder="Restoranı təsvir edin..."
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.description}
                    </div>

                    <label className="p-2 ps-0 pt-3">
                        Restoranın yerləşdiyi şəhər
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <select className={`form-select`}>
                        <option value="0">Şəhəri seçin</option>
                        <option value="1">Bakı</option>
                        <option value="2">Sumqayıt</option>
                    </select>

                    <label className="p-2 ps-0 pt-3">
                        Restoranın ünvanı
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        name="address"
                        placeholder="15 Tarlan Aliyar St, Baku 1005"
                        className="form-control"
                    />
                    <div className="invalid-feedback d-block">
                        {error?.address}
                    </div>

                    <label className="p-2 ps-0 pt-3">
                        Restoranın “Google Xəritə”dəki ünvanının linki
                        <span className={`${styles.asterisk}`}>*</span>
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

                    <label className="p-2 ps-0 pt-3 d-block">
                        Profil şəkili
                        <span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <div
                        className={`d-flex align-items-center justify-content-center ${styles.profile_img_container}`}>
                        {' '}
                        <label
                            htmlFor="single_file"
                            className={`btn text-nowrap btn-primary form-control d-flex align-items-center justify-content-center ${styles.profile_img_btn}`}>
                            Şəkil əlavə edin{' '}
                        </label>
                    </div>
                    <input
                        onChange={handleFileUpload}
                        hidden
                        type="file"
                        id="single_file"
                    />
                    <label
                        htmlFor="single_file"
                        className={`btn text-nowrap btn-outline-primary form-control d-flex align-items-center justify-content-center mt-3 ${styles.profile_img_btn}`}>
                        Şəkili dəyişin{' '}
                    </label>
                    <div className="invalid-feedback d-block">
                        {error?.profileImage}
                    </div>

                    <label className="p-2 ps-0 pt-3 d-block">
                        Qalereya<span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <label
                        htmlFor="multipy_image"
                        className={`form-control d-flex align-items-center justify-content-center ${styles.multiple_img_container}`}></label>
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
                    <div className="d-flex justify-content-end">
                        <button
                            onClick={() => {
                                setIsFirstPage(false), setIsSecondPage(true);
                            }}
                            className={`btn btn-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Növbəti
                        </button>
                    </div>
                </form>
            )}
            {isSecondPage && (
                <form className={`${styles.complete_form} form`}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <label className="p-2 ps-0 pt-3">
                                Restoran tipi
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <select className={`form-select`}>
                                <option value="0">Seçin</option>
                                <option value="1">Ailəvi</option>
                                <option value="2">Restoran</option>
                                <option value="3">Coffee Shop</option>
                                <option value="4">Cafe</option>
                                <option value="5">Pub</option>
                                <option value="6">Bar</option>
                                <option value="7">Lounge</option>
                            </select>
                        </div>
                        <div>
                            <label className="p-2 ps-0 pt-3">
                                Mətbəx
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <select className={`form-select`}>
                                <option value="0">Seçin</option>
                                <option value="1">Azərbaycan</option>
                                <option value="2">Türk</option>
                                <option value="3">Amerikan</option>
                                <option value="4">Çin</option>
                                <option value="5">Gürcü</option>
                                <option value="6">Rus</option>
                                <option value="7">Ərəb</option>
                                <option value="8">Hindistan</option>
                                <option value="9">Yapon</option>
                                <option value="10">Asiya</option>
                                <option value="11">İtalyan</option>
                                <option value="12">Koreya</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <label className="p-2 ps-0 pt-3">
                                Ödəniş variantları
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <select className={`form-select`}>
                                <option value="0">Seçin</option>
                                <option value="1">Nağd</option>
                                <option value="2">Kart</option>
                            </select>
                        </div>
                        <div>
                            <label className="p-2 ps-0 pt-3">
                                Parkinq
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <select className={`form-select`}>
                                <option value="0">Seçin</option>
                                <option value="1">Şəxsi</option>
                                <option value="2">İctimai</option>
                            </select>
                        </div>
                    </div>

                    <label className="p-2 ps-0 pt-3 d-block">
                        Bir masada əyləşə biləcək maksimum qonaq sayı<span className={`${styles.asterisk}`}>*</span>
                    </label>
                    <div className={`d-flex ${styles.increaser}`}>
                        <div
                        onClick={()=>{guestCount>1 && setGuestCount(guestCount-1)}}
                            className={`btn btn-primary ${styles.decrease_btn}`}>
                            -
                        </div>
                        <span>{guestCount}</span>
                        <div
                         onClick={()=>{setGuestCount(guestCount+1)}}
                            className={`btn btn-primary ${styles.increase_btn}`}>
                            +
                        </div>
                    </div>

                    <label className="p-2 ps-0 pt-3 d-block">İş saatları<span className={`${styles.asterisk}`}>*</span></label>
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
                    {/* <div>
                        <button
                            onClick={handleSubmit}
                            className="btn w-50 btn-primary my-4">
                            {isUpdate ? 'Yadda Saxla' : 'Tamamla'}
                        </button>
                    </div> */}
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            onClick={() => {
                                setIsFirstPage(true), setIsSecondPage(false);
                            }}
                            className={`btn btn-outline-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Geri
                        </button>
                        <button
                            onClick={() => {
                                setIsSecondPage(false), setIsThirdPage(true);
                            }}
                            className={`btn btn-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Növbəti
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CompleteInfoForum;
