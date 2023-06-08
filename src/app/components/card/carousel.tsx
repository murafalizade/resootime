import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styles from '@/app/styles/Home.module.scss';

interface CarouselProps {
    children: React.ReactNode;
    title: string;
}

const Carousel = ({ children,title }: CarouselProps) => {

    const carouselRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const next = () => {
        if(carouselRef.current){
           (carouselRef.current as any).slickNext();
        }
    };

    const previous = () => {
        if(carouselRef.current){
            (carouselRef.current as any).slickPrev();
        }
    };


    return (
        <div >
            <div className="d-flex justify-content-between align-items-center">
                <h3 className={styles.filters}>{title}</h3>
                <div className='d-none d-md-block'>
                    <button onClick={()=>previous()} className="btn mx-2 btn-outline-secondary btn-sm">
                        <MdArrowBackIosNew />
                    </button>
                    <button  onClick={()=>next()} className="btn mx-2 btn-outline-secondary btn-sm">
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
            <Slider ref={carouselRef} {...settings}>{children}</Slider>
        </div>
    );
};

export default Carousel;
