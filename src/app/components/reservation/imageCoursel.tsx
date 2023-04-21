import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";


type Props = {
    children: JSX.Element | JSX.Element[] | string[],
    getSlide?: any
}

const ImageCoursel = ({children}:Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <AiFillCaretRight size={'2rem'} color="black" />,
    // prevArrow: <AiFillCaretLeft color="black" />
  };
  return (
    <Slider {...settings}>
        {children}
    </Slider>
  )
};

export default ImageCoursel;