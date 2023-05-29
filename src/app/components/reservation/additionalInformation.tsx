import styles from '@/app/styles/DateFinder.module.scss';
import { GiReceiveMoney, GiMeal } from 'react-icons/gi';
import { FaRegMoneyBillAlt, FaChild } from 'react-icons/fa';
import { IoMdCard } from 'react-icons/io';
import { CiParking1 } from 'react-icons/ci';

const AdditionalInfo = ({
    cuisine,
    parking,
    payment,
    maximumPrice,
    minimumPrice,
    serviceCharge
}: any) => {
    return (
        <div className={`${styles.additional_info}`}>
            <h4 className={`mb-3 d-md-block d-none fw-600 ${styles.add_info_title}`}>
                Əlavə Məlumatlar
            </h4>
            <div>
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiMeal
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>Mətbəx</span>
                    </div>
                    {cuisine?.map((item: any, index: number) => {
                        return (
                            <span
                                className={`d-flex align-items-center fw-600 ${styles.info}`}
                                key={index}>
                                {item.name}
                            </span>
                        );
                    })}
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <GiReceiveMoney
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>
                            Servis haqqı
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center fw-600 ${styles.info}`}>
                        {serviceCharge}%
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <FaChild
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>
                            Min. yaş həddi{' '}
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center fw-600 ${styles.info}`}>
                        10+
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <FaRegMoneyBillAlt
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>
                            Ortalama qiymət
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center fw-600 ${styles.info}`}>
                        {minimumPrice ?? 0}-{maximumPrice ?? 0} azn
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <IoMdCard
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>
                            Ödəniş variantları
                        </span>
                    </div>
                    <span
                        className={`d-flex align-items-center fw-600 ${styles.info}`}>
                        {payment}
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between me-2 py-2">
                    <div className="d-flex align-items-center">
                        <CiParking1
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>Parketmə</span>
                    </div>
                    <span
                        className={`d-flex align-items-center fw-600 ${styles.info}`}>
                        {parking}
                    </span>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default AdditionalInfo;
