import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/createMapTool.module.scss';
import Image from 'next/image';
import { ITable } from '@/app/types/ITable';
import Table from './table';
import { useSelector } from 'react-redux';
import {
    addTables,
    selectDeletedTables,
    selectTables,
    setTables,
} from '@/app/redux/commonSlice';
import { useDispatch } from 'react-redux';
import tableImages from '@/app/constants/tableImages';
import RestaurantService from '@/app/api/services/restaurantService';
import Util from '@/app/utils/Util';
import withErrorHandeler from '@/app/hof/withErrorHandler';

const CreateMapTool = ({ restId, wall }: any) => {
    const tables: ITable[] = useSelector(selectTables);
    const deletedTables = useSelector(selectDeletedTables);
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState<string>(wall || '');
    const [file, setFile] = useState<File>();
    const dispatch = useDispatch();
    const imageRef = React.useRef<HTMLImageElement>(null);
    const [size, setSize] = useState<number>(1);
    const [zoom, setZoom] = useState<number>(1);

    // deselect when clicked on empty area
    const checkDeselect = (e: any) => {
        setIsActive(false);
    };

    // Save tables to database
    const onSaveTable = async () => {
        await withErrorHandeler(async (args: any) => {
            tables
                .filter((table: ITable) => !deletedTables.includes(table))
                ?.forEach(async (table: ITable) => {
                    const request = {
                        id: table.id,
                        name: table.name,
                        type: table.type,
                        xcod: table.xcod.toFixed(0),
                        size: table.size,
                        rotate: table.rotate,
                        ycod: table.ycod.toFixed(0),
                        restaurant_id: restId,
                        count: table.count,
                    };
                    if (table.id && table.id < 0) {
                        await RestaurantService.createTable(request, restId);
                    } else {
                        await RestaurantService.updateTable(request, restId);
                    }
                });
            deletedTables.forEach(async (table: ITable) => {
                if (!table.id || table.id! > 0) {
                    await RestaurantService.deleteTable(restId, table.id!);
                }
            });
            var formData = new FormData();
            formData.append('wall', file!);
            if (file && !wall) {
                await RestaurantService.createMap(formData, restId);
            }
            if (file && wall) {
                await RestaurantService.updateMap(formData, restId);
            }
        }, 'Masalarınız uğurla yeniləndi!')([]);
    };

    // Drag and drop tables
    const dragChecking = (e: any, type: string, count: number) => {
        let posX: number = e.clientX;
        let posY: number = e.clientY;
        if (posX > 250 && image) {
            const generatedId = Util.idGenerator(tables);
            const table: ITable = {
                xcod: posX - 120 - 250,
                ycod: posY - 690 - 55,
                type,
                size,
                id: -generatedId,
                name: `T${generatedId}`,
                count,
            };
            dispatch(addTables(table));
        } else {
            alert('Divarı seçin');
        }
    };

    // Zoom in and zoom out
    const zoomIn = () => {
        if (zoom < 2.5) {
            setZoom(zoom + 0.1);
        } else {
            alert('Zoom limiti keçildi');
        }
    };

    const zoomOut = () => {
        if (zoom > 0.1) {
            setZoom(zoom - 0.1);
        } else {
            alert('Zoom limiti keçildi');
        }
    };

    return (
        <div className={styles.map_tool}>
            <div className='d-flex justify-content-center align-items-center p-3 d-md-none'>
                <p>
                    Bu səhifə 768px-dən kiçik olarsa, düzgün işləməyə bilər.
                    Lütfən 768px-dən böyük ekran seçin.
                </p>
            </div>
            <div className={styles.table_bar}>
                <h4>Masalar</h4>
                {/* Select option with font size */}
                <select
                    onChange={(e: any) => {
                        setSize(Number(e.target.value / 10));
                    }}
                    className="form-select"
                    aria-label="Default select example">
                    <option selected>Masa ölçüsünü seçin</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <option value={item} key={index}>
                                {item}x
                            </option>
                        );
                    })}
                </select>
                {/* Table images */}
                <div className="d-flex">
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[3]?.type,
                                    tableImages[3]?.count,
                                )
                            }
                            src={tableImages[3]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[4]?.type,
                                    tableImages[4]?.count,
                                )
                            }
                            src={tableImages[4]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[5]?.type,
                                    tableImages[5]?.count,
                                )
                            }
                            src={tableImages[5]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[6]?.type,
                                    tableImages[6]?.count,
                                )
                            }
                            src={tableImages[6]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[7]?.type,
                                    tableImages[7]?.count,
                                )
                            }
                            src={tableImages[7]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[8]?.type,
                                    tableImages[8]?.count,
                                )
                            }
                            src={tableImages[8]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[0]?.type,
                                    tableImages[0]?.count,
                                )
                            }
                            src={tableImages[0]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[1]?.type,
                                    tableImages[1]?.count,
                                )
                            }
                            src={tableImages[1]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                    <div className={`${styles.table_bar_item} w-75`}>
                        <Image
                            draggable={true}
                            onDragEnd={(e) =>
                                dragChecking(
                                    e,
                                    tableImages[2]?.type,
                                    tableImages[2]?.count,
                                )
                            }
                            src={tableImages[2]?.image}
                            className="position-relative"
                            alt="chair"
                            objectFit="contain"
                            fill
                        />
                    </div>
                </div>

                {/* <div className="d-flex">
          <div className={`${styles.table_bar_item} w-75`}>
            <Image
              draggable={true}
              onDragEnd={(e) =>
                dragChecking(e, tableImages[3]?.type, tableImages[3]?.count)
              }
              src={tableImages[3]?.image}
              className="position-relative"
              alt="chair"
              objectFit="contain"
              fill
            />
          </div>
          <div className={`${styles.table_bar_item} w-75`}>
            <Image
              draggable={true}
              onDragEnd={(e) =>
                dragChecking(e, tableImages[4]?.type, tableImages[4]?.count)
              }
              src={tableImages[4]?.image}
              className="position-relative"
              alt="chair"
              objectFit="contain"
              fill
            />
          </div> */}
                {/* </div> */}
            </div>

            <div className={styles.table_map}>
                <div className="bg-light d-flex p-2 justify-content-between">
                    <div className="d-flex">
                        <label className="btn btn-primary">
                            Divar yüklə
                            <input
                                hidden
                                type="file"
                                onChange={(e: any) => {
                                    const file = e.target.files[0];
                                    setFile(file);
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                        const image = new window.Image();
                                        image.src = e.target?.result as string;
                                        image.onload = function () {
                                            setImage(image.src);
                                        };
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </label>
                        <div>
                            <button
                                onClick={zoomOut}
                                className="btn btn-primary mx-3">
                                -
                            </button>
                            <button
                                onClick={zoomIn}
                                className="btn btn-primary mx-3">
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary mx-3"
                            onClick={onSaveTable}>
                            Yadda saxla
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        width: '950px',
                        height: '555px',
                        overflow: 'auto',
                    }}>
                    <div
                        style={{ scale: `${zoom}` }}
                        className="w-100 border-3 h-100 position-relative">
                        {image ? (
                            <Image
                                src={image}
                                ref={imageRef}
                                className={styles.image}
                                fill
                                objectFit="contain"
                                onClick={checkDeselect}
                                alt={'map'}
                            />
                        ) : null}
                        {tables?.length > 0 &&
                            tables?.map((table, index) => (
                                <Table
                                    onClick={() => {
                                        setIsActive(true);
                                    }}
                                    isActive={isActive}
                                    table={table}
                                    isEdit={true}
                                    key={index}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMapTool;
