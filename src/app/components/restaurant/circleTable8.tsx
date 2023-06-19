import React from 'react';
import styles from '@/app/styles/Table.module.scss';
import { TableProps } from '@/app/types/TableProps';


const CircleTable8 = (props: TableProps) => {
    return (
        <div className="d-flex flex-column">
            <div
                style={{ width: '165px' }}
                className={`align-items-center ${styles.chairs}`}>
                <div
                    style={{ transform: 'rotate(315deg)' }}
                    className={`${styles.chair}`}></div>
                <div className={`${styles.chair}`}></div>
                <div
                    style={{ transform: 'rotate(45deg)' }}
                    className={`${styles.chair} `}></div>
            </div>
            <div className="d-flex align-items-center">
                <div
                    style={{ height: '120px', width: '16%' }}
                    className={`${styles.chairs} flex-column`}>
                    <div
                        style={{ transform: 'rotate(270deg)' }}
                        className={`${styles.chair}`}></div>
                </div>
                <div
                    style={{
                        borderRightColor: props?.isFull
                            ? '#383e4a'
                            : props?.isFull === undefined
                            ? '#383e4a'
                            : props.color,
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                    }}
                    className={styles.table}>
                    <input
                        type="text"
                        className={styles.input}
                        value={props.name}
                        disabled={!props.isEdit}
                        style={{ transform: `rotate(-${props?.deg}deg)` }}
                        onChange={(e: any) => props.changeName(e)}
                    />
                    {/* <span style={{ color: "yellow", paddingTop: "3px" }}>
              {props?.date}
            </span>
            <span>{props?.userName}</span> */}
                </div>
                <div
                    style={{ height: '120px', width: '55px' }}
                    className={`${styles.chairs} flex-column`}>
                    <div
                        style={{ transform: 'rotate(90deg)' }}
                        className={`${styles.chair}`}></div>
                </div>
            </div>
            <div className={`w-100 align-items-center  ${styles.chairs}`}>
                <div
                    style={{ transform: 'rotate(225deg)' }}
                    className={`${styles.chair}`}></div>
                <div className={`${styles.chair + ' ' + styles.down}`}></div>
                <div
                    style={{ transform: 'rotate(135deg)' }}
                    className={`${styles.chair} `}></div>
            </div>
        </div>
    );
};

export default CircleTable8;
