import React, { useEffect, useState } from 'react';
import galleryStyles from '@/app/styles/Gallery.module.scss';
import navStyles from '@/app/styles/Navbar.module.scss';
import Image from 'next/dist/client/image';
import { IoClose } from 'react-icons/io5';
import ImageCarousel, {
    ImageType,
} from '@/app/components/reservation/imageCarousel';
import baseUrl from '@/app/constants/baseUrl';

const GalleryModal = ({ setIsGalleryOpen, images }: any) => {
    const [galleryImages, setGalleryImages] = useState<ImageType[]>();

    useEffect(() => {
        setGalleryImages(images);
    }, [images]);
    return (
        <div className={`${galleryStyles.gallery_background}`}>
            <div className={`${galleryStyles.gallery_modal}`}>
                <div className="container-fluid border-bottom">
                    <div className="navbar">
                        <div>
                            <a
                                href="/"
                                className={`navbar-brand ${navStyles.brand_name}`}>
                                <Image
                                    src={'/images/logo.png'}
                                    alt="logo"
                                    width={164} 
                                    height={34}
                                    className="img-fluid logo icon nav-img"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main-container flex-column">
                    <div className="row justify-content-center">
                        <div className="col-10 col-xl-12 d-flex align-items-end justify-content-end">
                            <button
                                className={`${galleryStyles.close_button}`}
                                onClick={() => {
                                    setIsGalleryOpen(false);
                                }}>
                                Bağla
                                <IoClose size={'1rem'} color="#000" />
                            </button>
                        </div>
                    </div>
                    <div
                        className={`row justify-content-center ${galleryStyles.gallery_carousel}`}>
                        <div className="col-10 col-xl-12">
                            <ImageCarousel images={galleryImages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
