import React from 'react';
import styles from '@/app/styles/Menu.module.scss';
import Image from 'next/image';
import RestaurantService from '@/app/api/services/restaurantService';

const Menu = ({ id }: { id: number }) => {
    const [menuItems, setMenuItems] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [active, setActive] = React.useState('');
    const getMenuItem = async (id: any) => {
        const menu = await RestaurantService.getMenu(id);
        setMenuItems(menu);
    };

    React.useEffect(() => {
        let lastIndex = menuItems.length;
        menuItems.map((menuItem: any, index: any) => {
            if (index < lastIndex && menuItem.products.length > 0) {
                setCategory(menuItem.category);
                setActive(menuItem.id);
                lastIndex = index
            }
        });
    }, [menuItems]);

    React.useEffect(() => {
        getMenuItem(id);
    }, [id]);

    const handleClick = (id: any) => {
        setActive(id);
    };

    return (
        <>
            {menuItems.length > 0 && (
                <div className={`p-4 ${styles.menu_container}`}>
                    <h2
                        className={`text-center py-4 d-none d-md-block ${styles.menu_title}`}>
                        Menu
                    </h2>
                    <div className={`${styles.menu_nav}`}>
                        <div className="d-flex align-items-center">
                            {menuItems.map((menuItem: any) => {
                                return (
                                    menuItem.products.length > 0 && (
                                        <button
                                            onClick={() => {
                                                setCategory(menuItem.category);
                                                handleClick(menuItem.id);
                                            }}
                                            className={`me-1 ${
                                                active == menuItem.id &&
                                                styles.active
                                            }`}
                                            key={menuItem.id}>
                                            {menuItem.category}
                                        </button>
                                    )
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${styles.menu}`}>
                        <ul className="p-1">
                            {menuItems.map((item: any) => {
                                return (
                                    item.category == category && (
                                        <>
                                            {item.products.map(
                                                (product: any) => {
                                                    return (
                                                        <li
                                                            className={` ${styles.menu_item}`}
                                                            key={product.id}>
                                                            <div
                                                                className={`row pt-3 ps-0`}>
                                                                <div
                                                                    className={`col-8`}>
                                                                    <h5
                                                                        className={`fw-bold my-1 ${styles.item_name}`}>
                                                                        {
                                                                            product.name
                                                                        }
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
                                                                    <Image
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        src={
                                                                            product.image
                                                                        }
                                                                        width={
                                                                            160
                                                                        }
                                                                        height={
                                                                            85
                                                                        }
                                                                        quality={
                                                                            100
                                                                        }
                                                                        className={`${styles.menu_item_img}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                },
                                            )}
                                        </>
                                    )
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
