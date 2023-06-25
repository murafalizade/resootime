import styles from '@/app/styles/DateFinder.module.scss';
import { GiReceiveMoney, GiMeal } from 'react-icons/gi';
import { FaRegMoneyBillAlt, FaChild } from 'react-icons/fa';
import { IoMdCard } from 'react-icons/io';
import { LuParkingCircle } from 'react-icons/lu';

const AdditionalInfo = ({
    cuisine,
    parking,
    payment,
    maximumPrice,
    minimumPrice,
    serviceCharge,
    minimumAge,
}: any) => {
    return (
        <div className={`${styles.additional_info}`}>
            <h4
                className={`mb-3 d-md-block d-none fw-600 ${styles.add_info_title}`}>
                Əlavə Məlumatlar
            </h4>
            <div>
                <div className="row justify-content-between me-2 py-2">
                    <div className="col-6 d-flex align-items-center">
                        <GiMeal className={`me-2 ${styles.details_icon}`} />
                        <span className={`${styles.info_type}`}>Mətbəx</span>
                    </div>
                    <div className="col-6 d-flex justify-content-end ">
                        <span
                            className={`d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                            {cuisine?.map((item: any, index: any) => {
                                return index == cuisine.length - 1
                                    ? `${item?.name}`
                                    : `${item?.name} | `;
                            })}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-between me-2 py-2">
                    <div className="col-6 d-flex align-items-center">
                        <GiReceiveMoney
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>
                            Servis haqqı
                        </span>
                    </div>
                    <span
                        className={`col-6 d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                        {serviceCharge ?? 0}%
                    </span>
                </div>
                <hr />
                {minimumAge && (
                    <div className="row justify-content-between me-2 py-2">
                        <div className="col-6 d-flex align-items-center">
                            <FaChild
                                className={`me-2 ${styles.details_icon}`}
                            />
                            <span className={`${styles.info_type}`}>
                                Min. yaş həddi{' '}
                            </span>
                        </div>
                        <span
                            className={`col-6 d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                            {minimumAge}+
                        </span>
                    </div>
                )}
                {minimumAge && <hr />}
                {minimumPrice && (
                    <div className="row justify-content-between me-2 py-2">
                        <div className="col-6 d-flex align-items-center">
                            <FaRegMoneyBillAlt
                                className={`me-2 ${styles.details_icon}`}
                            />
                            <span className={`${styles.info_type}`}>
                                Ortalama qiymət
                            </span>
                        </div>
                        <span
                            className={`col-6 d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                            {minimumPrice ?? 0}-{maximumPrice ?? 0} azn
                        </span>
                    </div>
                )}

                {minimumPrice && maximumPrice && <hr />}
                <div className="row justify-content-between me-2 py-2">
                    <div className="col-6 d-flex align-items-center">
                        <IoMdCard className={`me-2 ${styles.details_icon}`} />
                        <span className={`${styles.info_type}`}>
                            Ödəniş variantları
                        </span>
                    </div>
                    <span
                        className={`col-6 d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                        {`${payment}`}
                    </span>
                </div>
                <hr />
                <div className="row justify-content-between me-2 py-2">
                    <div className="col-6 d-flex align-items-center">
                        <LuParkingCircle
                            className={`me-2 ${styles.details_icon}`}
                        />
                        <span className={`${styles.info_type}`}>Parketmə</span>
                    </div>
                    <span
                        className={`col-6 d-flex align-items-center fw-600 justify-content-end ${styles.info}`}>
                        {`${parking}`}
                    </span>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default AdditionalInfo;
