import React, { useRef } from 'react';
import styles from '@/app/styles/Menu.module.scss';
import Image from 'next/image';
import RestaurantService from '@/app/api/services/restaurantService';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

const Menu = ({ id, res }: { id: number; res: any }) => {
    const [menuItems, setMenuItems] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [active, setActive] = React.useState('');
    const [index, setIndex] = React.useState();
    const getMenuItem = async (id: any) => {
        const menu = await RestaurantService.getMenu(id);
        setMenuItems(menu);
    };
    const ref = useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        let lastIndex = menuItems.length;
        menuItems.map((menuItem: any, index: any) => {
            if (index < lastIndex && menuItem.products.length > 0) {
                setCategory(menuItem.category);
                setActive(menuItem.id);
                lastIndex = index;
            }
        });
    }, [menuItems]);

    React.useEffect(() => {
        getMenuItem(id);
    }, [id]);

    const handleClick = (id: any) => {
        setActive(id);
        //ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {menuItems.length > 0 && (
                <div className={`menu-container ${styles.menu_container}`}>
                    <h2
                        className={`text-center py-4 d-none d-md-block ${styles.menu_title}`}>
                        Menu
                    </h2>
                    <div className={`${styles.fixed_nav}`}>
                        <div className="ps-3 pe-4 d-flex d-md-none align-items-center justify-content-between">
                            <a
                                onClick={() => {
                                    history.back();
                                }}
                                className="text-dark ">
                                <IoIosArrowBack size={'2rem'} />
                            </a>
                            <h2
                                className={`text-center pt-4 pb-2 fs-3 ${styles.res_name}`}>
                                {res.name}
                            </h2>
                            <FiSearch size={'2rem'} />
                        </div>
                        <div className={`px-4 ${styles.menu_nav}`}>
                            <div className="d-flex align-items-center">
                                {menuItems.map((menuItem: any) => {
                                    return (
                                        menuItem.products.length > 0 && (
                                            <a
                                                href={`#${menuItem.id}`}
                                                onClick={() => {
                                                    setCategory(
                                                        menuItem.category,
                                                    );
                                                    handleClick(menuItem.id);
                                                }}
                                                className={`me-1 ${
                                                    active == menuItem.id &&
                                                    styles.active
                                                }`}
                                                key={menuItem.id}>
                                                {menuItem.category}
                                            </a>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={`p-4 ${styles.menu}`}>
                        <ul className="p-1">
                            {menuItems.map((item: any) => {
                                return (
                                    <>
                                        {item.products.map(
                                            (product: any, index: any) => {
                                                return (
                                                    <li
                                                        id={item.id}
                                                        className={` ${styles.menu_item} d-flex mb-2`}
                                                        key={product.id}>
                                                        <div
                                                            className={`col-8`}>
                                                            <h5
                                                                className={`fw-bold my-1 ${styles.item_name}`}>
                                                                {product.name}
                                                            </h5>
                                                            <p
                                                                className={`w-75 ${styles.description}`}>
                                                                {
                                                                    product.content
                                                                }
                                                            </p>
                                                            <p
                                                                className={`mt-2 ${styles.price}`}>
                                                                {`${product.price} Azn`}
                                                            </p>
                                                        </div>
                                                        <div className="col-4 d-flex align-items-center ps-0">
                                                            {product.image && (
                                                                <Image
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    src={
                                                                        product.image
                                                                    }
                                                                    width={160}
                                                                    height={85}
                                                                    quality={
                                                                        100
                                                                    }
                                                                    className={`${styles.menu_item_img}`}
                                                                />
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            },
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
