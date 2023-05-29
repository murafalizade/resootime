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
                images?.map((image: any) => {
                    if (image.id == 1) {
                        setSelectedImage(image?.image);
                    setSelectedImageIndex(image.id);
                    }
                });
            }
        }
    }, [images]);

    const handleSelectedImageChange = (newIdx: number) => {
        {
            images?.map((image: any) => {
                if (images && images.length > 0) {
                    if (image.id == newIdx) {
                        setSelectedImage(image?.image);
                        setSelectedImageIndex(image.id);
                    }
                }
            });
        }
    };

    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex + 1;
            handleSelectedImageChange(newIdx);
        }
    };
    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = images.length - 1;
            }
            handleSelectedImageChange(newIdx);
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
                        images.map((image: any) => (
                            <div
                                onClick={() =>
                                    handleSelectedImageChange(image.id)
                                }
                                style={{
                                    backgroundImage: `url(${
                                        baseUrl + image?.image
                                    })`,
                                }}
                                key={image.id}
                                className={`${styles.carousel__image} ${
                                    selectedImageIndex === image.id &&
                                    styles.carousel__image_selected
                                }`}
                                ref={(el) =>
                                    (carouselItemsRef.current[image.id] = el)
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
