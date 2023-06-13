import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styles from '@/app/styles/Home.module.scss';

interface CarouselProps {
    children: React.ReactNode;
    title: string;
}

const Carousel = ({ children, title }: CarouselProps) => {
    const [showBackButton, setShowBackButton] = useState(false);

    const carouselRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 859,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2.5,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const next = () => {
        if (carouselRef.current) {
            (carouselRef.current as any).slickNext();
        }
    };

    const previous = () => {
        if (carouselRef.current) {
            (carouselRef.current as any).slickPrev();
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className={styles.filters}>{title}</h3>
            </div>
            <div className="position-relative">
                {showBackButton && (
                    <button
                        onClick={() => previous()}
                        className={`btn mx-2 btn-outline-secondary btn-sm position-absolute d-none d-sm-block ${styles.back_arrow} ${styles.arrow_button}`}>
                        <MdArrowBackIosNew />
                    </button>
                )}
                <Slider ref={carouselRef} {...settings}>
                    {children}
                </Slider>
                <button
                    onClick={() => {
                        next(), setShowBackButton(true);
                    }}
                    className={`btn mx-2 btn-outline-secondary btn-sm position-absolute d-none d-sm-block ${styles.forward_arrow} ${styles.arrow_button}`}>
                    <MdArrowForwardIos />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
