import React from 'react';
import styles from '@/app/styles/Menu.module.scss';
import Image from 'next/image';

const ResMenu = () => {
    const handleMenuBtnClick = () => {};
    const menu = [
        {
            id: 1,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 2,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 3,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 4,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 5,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 6,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
        {
            id: 7,
            name: 'Kremli göbələk şorbası',
            description:
                '400 gr. göbələk suyu, göbələk, istiridyə göbələyi,şitake, arpa, kartof, soğan',
            price: 14,
            image: '/images/soup_img.png',
        },
    ];
    return (
        <div className={`p-4  ${styles.menu_container}`}>
            <h2 className={`text-center py-4 d-none d-md-block ${styles.menu_title}`}>Menu</h2>
            <div className={`${styles.menu_nav}`}>
                <div className="d-flex align-items-center justify-content-between">
                    <button onClick={handleMenuBtnClick}>Şorbalar</button>
                    <button onClick={handleMenuBtnClick}>Qəlyanaltılar</button>
                    <button onClick={handleMenuBtnClick}>Qarnirlər</button>
                    <button onClick={handleMenuBtnClick}>Kreplər</button>
                    <button onClick={handleMenuBtnClick}>Ana yeməklər</button>
                </div>
            </div>
            <div className={`${styles.menu}`}>
                <ul className="p-1">
                    {menu.map((menu_item: any) => {
                        return (
                            <li
                                className={`${styles.menu_item}`}
                                key={menu_item.id}>
                                <div
                                    className={`row pt-4 ps-0`}>
                                    <div className={`col-8`}>
                                        <h5 className={`fw-bold my-1 ${styles.item_name}`}>
                                            {menu_item.name}
                                        </h5>
                                        <p
                                            className={`w-75 ${styles.description}`}>
                                            {menu_item.description}
                                        </p>
                                        <p className={`mt-2 ${styles.price}`}>
                                            {`${menu_item.price} Azn`}
                                        </p>
                                    </div>
                                    <div className="col-4 d-flex align-items-center ps-0">
                                        <Image
                                            alt={menu_item.name}
                                            src={menu_item.image}
                                            width={160}
                                            height={85}
                                            quality={100}
                                            className={`object-cover ${styles.menu_item_img}`}
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ResMenu;
