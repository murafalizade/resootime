import React, { useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styles from '@/app/styles/Table.module.scss';
import { ITable } from '@/app/types/ITable';
import HugeTable from './hugeTable';
import MediumTable from './mediumTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    adddDeletedTables,
    changeTable,
    chooceTable,
    openModal,
    selectChoosenTable,
    selectDeletedTables,
} from '@/app/redux/commonSlice';
import Util from '@/app/utils/Util';
import { MdDeleteSweep } from 'react-icons/md';
import { GrRotateLeft } from 'react-icons/gr';
import CircleTable1 from './circleTable1';
import CircleTable2 from './circleTable2';
import CircleTable4 from './circleTable4';
import CircleTable6 from './circleTable6';
import SquareTable1 from './squareTable1';
import SquareTable2 from './squareTable2';
import SquareTable4 from './squareTable4';
import CircleTable8 from './circleTable8';
import SquareTable8 from './squareTable8';

interface TableProps {
    className?: string;
    onClick?: () => void;
    table: ITable;
    userName?: string;
    date?: string;
    isActive?: boolean;
    isEdit?: boolean;
}

const Table = (props: TableProps) => {
    const [color, setColor] = useState('#383e4a');
    const [deg, setDeg] = useState(props.table.rotate ?? 0);
    const deleteTable = useSelector(selectDeletedTables);
    const choosenTable = useSelector(selectChoosenTable);
    const dispatch = useDispatch();

    // Dragging table and removing it if it is dragged to the left side
    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        if (!props.isEdit) return;
        let posX: number = data.lastX;
        let posY: number = data.lastY;
        let newTable = { ...props.table };
        newTable.xcod = posX;
        newTable.ycod = posY;
        dispatch(changeTable(newTable));
    };

    // Checking if table is choosen or not and changing color
    useEffect(() => {
        if (choosenTable?.id === props.table?.id) {
            setColor('yellow');
        } else {
            setColor('#4BB543');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choosenTable]);

    // Choosing table on click and removing it if it is already choosen
    const chooseTable = () => {
        props.onClick && props.onClick();
        if (
            props.isEdit ||
            props.table.is_full ||
            props.table.is_full == undefined
        )
            return;
        if (choosenTable?.name === props.table.name) {
            dispatch(chooceTable(null));
            return;
        }
        dispatch(chooceTable(props.table));
    };

    // Update table name
    const updateName = (e: any) => {
        let newTable = { ...props.table };
        newTable.name = e.target.value;
        dispatch(changeTable(newTable));
    };

    // Rotate table 45deg on click
    const rotateTable = () => {
        let newTable = { ...props.table };
        newTable.rotate = deg + 45;
        setDeg(deg + 45);
        dispatch(changeTable(newTable));
    };

    // Delete table if it is choosen and delete button is clicked
    const onDeleteTable = async () => {
        dispatch(adddDeletedTables(props.table));
    };

    return (
        <Draggable
            defaultClassName={styles.ctable}
            defaultPosition={{
                x: props.isEdit ? props.table.xcod : props.table.xcod - 10,
                y: props.isEdit
                    ? props.table.ycod
                    : props.table.ycod + 530 / props.table.size!,
            }}
            disabled={!props.isEdit}
            onDrag={onDrag}>
            <div
                className={`${styles.ctable} ${
                    deleteTable.includes(props.table) ? 'd-none' : ''
                }`}
                style={{
                    scale: props.table?.size ? `${props.table?.size}` : '1',
                    transform: `rotate(${deg}deg)`,
                }}>
                <div className="d-flex justify-content-between">
                    {props?.isActive ? (
                        <>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={onDeleteTable}>
                                <MdDeleteSweep color="white" size={20} />
                            </div>
                            <div>
                                <GrRotateLeft
                                    onClick={rotateTable}
                                    color="white"
                                    size={20}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
                <div
                    style={{ transform: `rotate(${deg}deg)` }}
                    onClick={chooseTable}>
                    {props.table?.type === 'circle' ? (
                        props.table?.count === 1 ? (
                            <CircleTable1
                                color={color}
                                changeName={updateName}
                                deg={deg}
                                isEdit={props.isEdit}
                                isFull={props.table?.is_full}
                                userName={props?.userName ?? ''}
                                date={Util.formatDate(props?.date)}
                                name={props.table?.name}
                            />
                        ) : props.table?.count === 2 ? (
                            <CircleTable2
                                color={color}
                                changeName={updateName}
                                deg={deg}
                                isEdit={props.isEdit}
                                isFull={props.table?.is_full}
                                userName={props?.userName ?? ''}
                                date={Util.formatDate(props?.date)}
                                name={props.table?.name}
                            />
                        ) : props.table?.count === 4 ? (
                            <CircleTable4
                                color={color}
                                changeName={updateName}
                                deg={deg}
                                isEdit={props.isEdit}
                                isFull={props.table?.is_full}
                                userName={props?.userName ?? ''}
                                date={Util.formatDate(props?.date)}
                                name={props.table?.name}
                            />
                        ) : props.table?.count === 6 ? (
                            <CircleTable6
                                color={color}
                                changeName={updateName}
                                deg={deg}
                                isEdit={props.isEdit}
                                isFull={props.table?.is_full}
                                userName={props?.userName ?? ''}
                                date={Util.formatDate(props?.date)}
                                name={props.table?.name}
                            />
                        ) : (
                            <CircleTable8
                                color={color}
                                isEdit={props.isEdit}
                                changeName={updateName}
                                deg={deg}
                                isFull={props.table?.is_full}
                                userName={props?.userName ?? ''}
                                date={Util.formatDate(props?.date)}
                                name={props.table?.name}
                            />
                        )
                    ) : props.table?.count === 1 ? (
                        <SquareTable1
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    ) : props.table?.count === 2 ? (
                        <SquareTable2
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    ) : props.table?.count === 4 ? (
                        <SquareTable4
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    ) : props.table?.count === 6 ? (
                        <HugeTable
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    ) : props.table?.count === 8 ? (
                        <SquareTable8
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    ) : (
                        <MediumTable
                            color={color}
                            changeName={updateName}
                            deg={deg}
                            isEdit={props.isEdit}
                            isFull={props.table?.is_full}
                            userName={props?.userName ?? ''}
                            date={Util.formatDate(props?.date)}
                            name={props.table?.name}
                        />
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default Table;
