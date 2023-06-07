import React from 'react';
import Image from 'next/dist/client/image';
import { IRestaurant } from '@/app/types/IRestaurant';
import StarsRating from 'react-star-rate';
import styles from '@/app/styles/Home.module.scss';

interface ICardProps {
    cardInfo: IRestaurant;
}

const Card = ({ cardInfo }: ICardProps) => {
    return (
        <div
            className={`d-flex align-items-center justify-content-center ${styles.card_container}`}>
            <div className={`card ${styles.card}`}>
                <a
                    href={`/restaurants/r/${cardInfo.name
                        .replace(' ', '-')
                        .replace('(', '')
                        .replace(')', '')
                        .toLocaleLowerCase()}`}>
                    <Image
                        // src={cardInfo.images[0]?.image || '/images/rest_imag.png'}
                        src={'/images/rest_imag.png'}
                        className={`card-img-top ${styles.card_img}`}
                        alt={cardInfo.name}
                        width={186}
                        quality={100}
                        height={96}
                    />
                </a>
                <div className={`card-body px-0 ${styles.card_body}`}>
                    <span className={`${styles.res_type}`}>Restoran</span>
                    <div className="d-flex justify-content-between">
                        <a
                            href={`/restaurants/r/${cardInfo.name
                                .replace(' ', '-')
                                .replace('(', '')
                                .replace(')', '')
                                .toLocaleLowerCase()}`}
                            className="text-decoration-none text-dark link">
                            <h5 className="card-title">ResooTime (Test)</h5>
                        </a>
                        <span className={`m-0  ${styles.res_rate}`}>
                            {`${cardInfo.rate ?? 0}.0`}
                        </span>
                    </div>
                    <h6 className="card-subtitle m-0">
                        <div className="d-flex">
                            <p className={`m-0 ${styles.res_location}`}>
                                {cardInfo.city || 'World'}
                            </p>
                        </div>
                    </h6>
                    <div className={`d-flex`}>
                        <div className={`${styles.res_tag}`}>Musiqili</div>
                        <div className={`${styles.res_tag}`}>Mənzrəli</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
