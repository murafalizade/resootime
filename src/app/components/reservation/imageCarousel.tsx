import React, { useEffect, useRef, useState } from 'react';
import styles from '@/app/styles/Gallery.module.scss';
import Image from 'next/dist/client/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import baseUrl from '@/app/constants/baseUrl';
export type ImageType = { id: number; url: string };

const ImageCarousel: React.FC<{ images?: ImageType[] }> = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<ImageType>();
    const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

    useEffect(() => {
        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                images.length,
            );

            {
                images?.map((image: any, index: any) => {
                    if (index == 0) {
                        setSelectedImage(image?.image);
                        setSelectedImageIndex(index);
                    }
                });
            }
        }
    }, [images]);
    const handleSelectedImageChange = (newIndex: number) => {
        {
            images?.map((image: any, index: any) => {
                if (images && images.length > 0) {
                    if (index == newIndex) {
                        setSelectedImage(image?.image);
                        setSelectedImageIndex(index);
                    }
                }
            });
        }
    };
    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIndex = selectedImageIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            handleSelectedImageChange(newIndex);
        }
    };
    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIndex = selectedImageIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            }
            handleSelectedImageChange(newIndex);
        }
    };

    return (
        <div className={`position-relative ${styles.carousel_container}`}>
            <div className="w-100 d-flex align-items-center justify-content-center">
                <div
                    className={`${styles.selected_image}`}
                    style={{
                        backgroundImage: `url(${baseUrl}${selectedImage})`,
                    }}></div>
            </div>
            <div className={`${styles.carousel}`}>
                <div className={`${styles.carousel__images}`}>
                    {images &&
                        images.map((image: any, index: any) => (
                            <div
                                onClick={() => handleSelectedImageChange(index)}
                                style={{
                                    backgroundImage: `url(${
                                        baseUrl + image?.image
                                    })`,
                                }}
                                key={index}
                                className={`${styles.carousel__image} ${
                                    selectedImageIndex === index &&
                                    styles.carousel__image_selected
                                }`}
                                ref={(el) =>
                                    (carouselItemsRef.current[index] = el)
                                }
                            />
                        ))}
                </div>
                <button
                    className={`${styles.carousel__button} ${styles.carousel__button_left}`}
                    onClick={handleLeftClick}>
                    <IoIosArrowBack size={'1.5rem'} />
                </button>
                <button
                    className={`${styles.carousel__button} ${styles.carousel__button_right}`}
                    onClick={handleRightClick}>
                    <IoIosArrowForward size={'1.5rem'} />
                </button>
            </div>
        </div>
    );
};

export default ImageCarousel;
