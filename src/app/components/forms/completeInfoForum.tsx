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
import SelectOptions from '@/app/components/forms/selectOptions';
import MultiSelectOptions from '@/app/components/forms/multiSelectOptions';

const CompleteInfoForum = ({ res, isUpdate }: any) => {
    const [error, setError] = React.useState<any>(null);
    const [selectedImages, setSelectedImages] = React.useState<any>(
        res?.images?.map((item: any) => `${BASE_URL}${item.image}`),
    );
    const [isFirstPage, setIsFirstPage] = React.useState<boolean>(true);
    const [isSecondPage, setIsSecondPage] = React.useState<boolean>(false);
    const [isThirdPage, setIsThirdPage] = React.useState<boolean>(false);
    const [numberOfPhoneInputs, setNumberOfPhoneInputs] =
        React.useState<number>(1);
    const [guestCount, setGuestCount] = React.useState<number>(1);
    const [minAge, setMinAge] = React.useState<number>(0);

    const typeOptions = [
        { value: '1', label: 'Ailəvi' },
        { value: '2', label: 'Restoran ' },
        { value: '3', label: 'Coffee ' },
        { value: '4', label: 'Cafe ' },
        { value: '5', label: 'Pub ' },
        { value: '6', label: 'Bar ' },
        { value: '7', label: 'Lounge ' },
    ];
    const cityOptions = [
        { value: '1', label: 'Bakı' },
        { value: '2', label: 'Sumqayıt ' },
    ];
    const cuisineOptions = [
        { value: '1', label: 'Azərbaycan' },
        { value: '2', label: 'Türk' },
        { value: '3', label: 'Amerikan' },
        { value: '4', label: 'Çin' },
        { value: '5', label: 'Gürcü' },
        { value: '6', label: 'Rus' },
        { value: '7', label: 'Ərəb' },
        { value: '8', label: 'Hindistan' },
        { value: '9', label: 'Yapon' },
        { value: '10', label: 'Asiya' },
        { value: '11', label: 'İtalyan' },
        { value: '12', label: 'Koreya' },
    ];
    const paymentOptions = [
        { value: '1', label: 'Nağd' },
        { value: '2', label: 'Kart ' },
    ];
    const parkingOptions = [
        { value: '1', label: 'Şəxsi' },
        { value: '2', label: 'İctimai ' },
    ];
    const tagOptions = [
        { value: '1', label: 'Mənzərəli' },
        { value: '2', label: 'Qəlyan' },
        { value: '3', label: 'Əyləncə' },
        { value: '4', label: 'Romantik' },
        { value: '5', label: 'Kabinet' },
        { value: '6', label: 'Heyvana İcazə Verilən' },
        { value: '7', label: 'Açıq Hava' },
        { value: '8', label: 'Uşaq Zonası' },
        { value: '9', label: 'Bufet' },
        { value: '10', label: 'Stolüstü Oyun' },
        { value: '11', label: 'Karaoke' },
        { value: '12', label: 'Rahat Məkan' },
        { value: '13', label: 'Qəhvə' },
        { value: '14', label: 'Canlı Musiqi' },
        { value: '15', label: 'Namaz Otağı' },
    ];

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
        websiteLink: res?.websiteLink,
        fbLink: res?.fbLink,
        instaLink: res?.instaLink,
        type: res?.type,
        cuisine: res?.cuisine,
        payment: res?.payment,
        parking: res?.parking,
        tags: res?.tags,
        city: res?.city
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
        console.log(formData);
        e.preventDefault();
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
            websiteLink: formData.websiteLink,
            city: formData.city,
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

    // switch the page one to page two
    const handleNextPage = (e: React.FormEvent<HTMLButtonElement>) => {
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
        // if (!formData.city) {
        //     setError({ city: 'Restoranın yerləşdiyi şəhər boş ola bilməz' });
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     return;
        // }
        if (selectedImages.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({ profileImage: 'Restoranın şəkli boş ola bilməz' });
            return;
        }
        setIsFirstPage(false),
        setIsSecondPage(true);
    }

    // switch the page two to page third
    const handleNextPage2 = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onlineReservHours.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError({
                onlineReservHours:
                    'Restoranın online rezerv saatı boş ola bilməz',
            });
            return;
        }

        setIsSecondPage(false);
        setIsThirdPage(true);
    }


    return (
        <div
            className={`d-flex justify-content-center flex-column align-items-center px-3 px-md-0`}>
            <h5 className={`text-center ${styles.form_heading}`}>
                {isUpdate
                    ? 'Tənzimləmələr:'
                    : 'Biznes məlumatlarını tamamlayın:'}
            </h5>
            {isFirstPage && (
                <form className={`${styles.complete_form} form`}>
                    <div className="w-444">
                        <label className="pt-0">
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
                    </div>

                    <div className="w-444">
                        <label className="">
                            Restoranın əlaqə nömrəsi
                            <span className={`${styles.asterisk}`}>*</span>
                        </label>
                        {Array(numberOfPhoneInputs)
                            .fill('')
                            .map((index: number) => (
                                <div
                                    className={`position-relative pt-2`}
                                    key={index}>
                                    <span
                                        className={`position-absolute ${styles.flag}`}>
                                        <Image
                                            src={'/images/flag-azerbaijan.png'}
                                            alt={res.name}
                                            width={18.4}
                                            height={18.4}
                                            quality={100}
                                            className={`me-1`}
                                        />
                                        +994
                                    </span>
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Əlaqə nömrəsi"
                                        className={`form-control ${styles.phone_input}`}
                                    />
                                </div>
                            ))}
                        <div className="d-flex justify-content-between">
                            <div className="invalid-feedback d-block">
                                {error?.phone}
                            </div>
                            <div
                                onClick={() => {
                                    setNumberOfPhoneInputs(
                                        numberOfPhoneInputs + 1,
                                    );
                                }}
                                className={`text-nowrap pt-1 ${styles.add_btn}`}>
                                + Əlavə et
                            </div>
                        </div>
                    </div>

                    <div className="w-444">
                        <label className="">
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
                    </div>

                    <div className="w-444 d-flex">
                        <div>
                            <label className="">
                                Restoranın yerləşdiyi şəhər
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={cityOptions}
                                name="city"
                                onChange={handleChange}
                                placeholder={formData.city ?? 'Şəhəri seçin'}
                            />
                        </div>
                        <div className="invalid-feedback d-block">
                            {error?.city}
                        </div>
                    </div>

                    <div className="w-444">
                        <label className="">
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
                    </div>

                    <div className="w-444">
                        <label className="">
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
                    </div>

                    <div className="w-444">
                        <label className=" d-block">
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
                            className={`btn text-nowrap btn-outline-primary form-control d-flex align-items-center justify-content-center mt-2 ${styles.profile_img_btn}`}>
                            Şəkili dəyişin{' '}
                        </label>
                        <div className="invalid-feedback d-block">
                            {error?.profileImage}
                        </div>
                    </div>

                    <div className="w-444">
                        <label className=" d-block">
                            Qalereya
                            <span className={`${styles.asterisk}`}>*</span>
                        </label>
                        <label
                            htmlFor="multipy_image"
                            className={`form-control d-flex align-items-center justify-content-center p-0 ${styles.multiple_img_container}`}></label>
                        <div className="d-flex mt-4 overflow-auto">
                            {selectedImages?.map(
                                (image: any, index: number) => {
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
                                },
                            )}
                        </div>
                    </div>

                    <div className="w-444">
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
                                onClick={handleNextPage}
                                className={`btn btn-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                                Növbəti
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {isSecondPage && (
                <form className={`${styles.complete_form} form`}>
                    <div className="d-flex justify-content-between w-444">
                        <div>
                            <label className="pt-0">
                                Restoran tipi
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={typeOptions}
                                placeholder={'Seçin'}
                            />
                        </div>
                        <div>
                            <label className="pt-0">
                                Mətbəx
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={cuisineOptions}
                                placeholder={'Seçin'}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-444">
                        <div>
                            <label className="">
                                Ödəniş variantları
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={paymentOptions}
                                placeholder={'Seçin'}
                            />
                        </div>
                        <div>
                            <label className="">
                                Parkinq
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={parkingOptions}
                                placeholder={'Seçin'}
                            />
                        </div>
                    </div>

                    <div className="w-444">
                        <label className=" d-block">
                            Bir masada əyləşə biləcək maksimum qonaq sayı
                            <span className={`${styles.asterisk}`}>*</span>
                        </label>
                        <div className={`d-flex ${styles.increaser}`}>
                            <div
                                onClick={() => {
                                    guestCount > 1 &&
                                        setGuestCount(guestCount - 1);
                                }}
                                className={`${styles.decrease_btn}`}>
                                -
                            </div>
                            <span>{guestCount}</span>
                            <div
                                onClick={() => {
                                    setGuestCount(guestCount + 1);
                                }}
                                className={`${styles.increase_btn}`}>
                                +
                            </div>
                        </div>
                    </div>

                    <div className="w-444">
                        <label className=" d-block">
                            İş saatları
                            <span className={`${styles.asterisk}`}>*</span>
                        </label>
                        <WorkDaySelector working_hours={res.working_hours} />
                        <div className="invalid-feedback d-block">
                            {error?.workTime}
                        </div>
                    </div>

                    <div className="w-444">
                        <label className=" d-block">
                            Onlayn rezervasiya etmək mümkün olan saat aralığı
                            <span className={`${styles.asterisk}`}>*</span>
                        </label>
                        <OnlineDaySelector
                            data={res.online_reserv_hours}
                            disabled={!formData.allowed}
                        />
                        <div className="invalid-feedback d-block">
                            {error?.onlineReservationTime}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 w-444">
                        <button
                            onClick={() => {
                                setIsFirstPage(true), setIsSecondPage(false);
                            }}
                            className={`btn btn-outline-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Geri
                        </button>
                        <button
                            onClick={handleNextPage2}
                            className={`btn btn-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Növbəti
                        </button>
                    </div>
                </form>
            )}
            {isThirdPage && (
                <form className={`${styles.complete_form} form`}>
                    <div className="d-flex justify-content-between w-444">
                        <div>
                            <label className="pt-0">
                                Restoran xüsusiyyətləri
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <SelectOptions
                                options={tagOptions}
                                placeholder={'Seçin'}
                            />
                        </div>
                        <div>
                            <label className="pt-0">
                                Ortalama qiymət aralığı
                                <span className={`${styles.asterisk}`}>*</span>
                            </label>
                            <input
                                type="text"
                                name="price"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Min"
                                className={`form-control ${styles.little_input_size}`}
                            />
                            <input
                                type="text"
                                name="price"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Max"
                                className={`form-control ${styles.little_input_size}`}
                            />
                        </div>
                    </div>
                    <div className="w-444">
                        <label className=" d-block">Minimum yaş həddi</label>
                        <div className={`d-flex ${styles.increaser}`}>
                            <div
                                onClick={() => {
                                    minAge > 0 && setMinAge(minAge - 1);
                                }}
                                className={`btn btn-primary ${styles.decrease_btn}`}>
                                -
                            </div>
                            <span>{minAge}+</span>
                            <div
                                onClick={() => {
                                    setMinAge(minAge + 1);
                                }}
                                className={`btn btn-primary ${styles.increase_btn}`}>
                                +
                            </div>
                        </div>
                    </div>
                    <div className="w-444">
                        <label className="">Restoranın vebsayt linki</label>
                        <input
                            type="text"
                            name="websiteLink"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Restoranın vebsayt linki"
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-between w-444">
                        <div>
                            <label className="">İnstagram linki</label>
                            <input
                                type="text"
                                name="instagramLink"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="İnstagram linkini daxil edin"
                                className={`form-control ${styles.little_input_size}`}
                            />
                        </div>
                        <div>
                            <label className="">Facebook linki</label>
                            <input
                                type="text"
                                name="facebookLink"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Facebook linkini daxil edin"
                                className={`form-control ${styles.little_input_size}`}
                            />
                        </div>
                    </div>
                    <div className="w-444">
                        <label className="">Qeydlər</label>
                        <textarea
                            value={formData.description}
                            onChange={handleChange}
                            name="notes"
                            rows={4}
                            placeholder="Siqaret çəkmək qadağandır. | Siqaret çəkmək qadağandır. | Siqaret çəkmək..."
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2 w-444">
                        <button
                            onClick={() => {
                                setIsSecondPage(true), setIsThirdPage(false);
                            }}
                            className={`btn btn-outline-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            Geri
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`btn btn-primary d-flex align-items-center justify-content-center ${styles.next_button}`}>
                            {isUpdate ? 'Yadda Saxla' : 'Tamamla'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CompleteInfoForum;
