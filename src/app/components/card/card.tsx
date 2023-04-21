import React from "react";
import Image from "next/dist/client/image";
import { IRestaurant } from "@/app/types/IRestaurant";
import StarsRating from "react-star-rate";
import styles from "@/app/styles/Home.module.scss";

interface ICardProps {
  cardInfo: IRestaurant;
}

const Card = ({ cardInfo }: ICardProps) => {
  return (
    <div className={`card ${styles.card}`}>
      <Image
        src={cardInfo.images[0]?.image || "/images/rest_imag.png"}
        className={`card-img-top ${styles.card_img}`}
        alt={cardInfo.name}
        width={200}
        quality={100}
        height={140}
      />
      <div className="card-body">
        <a
          href={`/restaurants/${cardInfo.id}`}
          className="text-decoration-none text-dark link"
        >
          <h5 className="card-title">{cardInfo.name}</h5>
        </a>

        <h6 className="card-subtitle mb-2">
          <div className="d-flex">
            <span className="d-flex align-items-center">
              <StarsRating
                count={1}
                style={{ style: { fontSize: "20px" } }}
                disabled
                value={1}
              />
              {cardInfo.rate ?? 0}
            </span>
            <p className="text-muted align-items-center d-flex mx-3 my-0 p-0">
              {cardInfo.location}
            </p>
          </div>
        </h6>
      </div>
    </div>
  );
};

export default Card;
