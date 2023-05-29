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

    // useEffect(() => {
    //     setGalleryImages(
            // images?.map((image: any) => (
            //     <Image
            //         key={image.id}
            //         src={
            //             baseUrl + image?.image
            //         }
            //         alt={'Restoran Image'}
            //         width={386}
            //         height={300}
            //         className="w-100 object-fill"
            //     />
            // ))
    //     );
    // }, []);

    useEffect(() => {
        setGalleryImages(
            images
        );
    }, [images]);
    return (
        <div className={`${galleryStyles.gallery_background}`}>
            <div className={`${galleryStyles.gallery_modal}`}>
                <div className="navbar p-4">
                    <div>
                        <a
                            href="/"
                            className={`navbar-brand ${navStyles.brand_name}`}>
                            <Image
                                src={'/images/logo.png'}
                                alt="logo"
                                width={45}
                                height={45}
                                className="img-fluid mx-3 logo icon nav-img"
                            />
                            ResooTime
                        </a>
                    </div>
                </div>
                <div className="container fluid">
                    <div className="d-flex align-items-center justify-content-end">
                        <button
                            className={`${galleryStyles.close_button}`}
                            onClick={() => {
                                setIsGalleryOpen(false);
                            }}>
                            Bağla
                            <IoClose size={'1rem'} color="#000" />
                        </button>
                    </div>
                    <div className={`${galleryStyles.gallary_carousel}`}>
                        <ImageCarousel images={galleryImages} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
