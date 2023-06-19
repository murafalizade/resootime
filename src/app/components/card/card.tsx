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
                <a href={`/r/${cardInfo.slug}`}>
                    <Image
                        src={
                            cardInfo.images[0]?.image || '/images/rest_imag.png'
                        }
                        className={`card-img-top ${styles.card_img}`}
                        alt={cardInfo.name}
                        width={186}
                        quality={100}
                        height={96}
                    />
                </a>
                <div className={`card-body px-0 ${styles.card_body}`}>
                    <span className={`${styles.res_type}`}>
                        {cardInfo.type[0].type}
                    </span>
                    <div className="d-flex align-items-center justify-content-between pt-1">
                        <a
                            href={`/r/${cardInfo.slug}`}
                            className="text-decoration-none text-dark link">
                            <h5 className="card-title">
                                {cardInfo.name.length > 12
                                    ? cardInfo.name.slice(0, 12) + '...'
                                    : cardInfo.name}
                            </h5>
                        </a>
                        <span className={`m-0 pt-0 ${styles.res_rate}`}>
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
                    <div className={`d-flex ${styles.rest_tags}`}>
                        {cardInfo?.tag?.map(
                            (tag: any, index: any) =>
                                index < 2 && (
                                    <div
                                        key={tag.id}
                                        className={`${styles.res_tag}`}>
                                        {tag.name}
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
