import React from 'react';
import styles from '@/app/styles/Table.module.scss';
import { TableProps } from '@/app/types/TableProps';


const CircleTable4 = (props: TableProps) => {
    return (
        <div className="d-flex flex-column">
            <div className={`w-100 ${styles.chairs}`}>
                <div className={`${styles.chair}`}></div>
            </div>
            <div className="d-flex align-items-center">
                <div className={`${styles.chairs}`}>
                    <div
                        className={`${
                            styles.chair + ' ' + styles.lchair
                        }`}></div>
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
                        disabled={!props.isEdit}
                        value={props.name}
                        style={{ transform: `rotate(-${props?.deg}deg)` }}
                        onChange={(e: any) => props.changeName(e)}
                    />
                    {/* <span style={{ color: "yellow", paddingTop: "3px" }}>
          {props?.date}
        </span>
        <span>{props?.userName}</span> */}
                </div>
                <div className={`${styles.chairs}`}>
                    <div
                        className={`${
                            styles.chair + ' ' + styles.uchair
                        }`}></div>
                </div>
            </div>
            <div className={`w-100 ${styles.chairs}`}>
                <div className={`${styles.chair + ' ' + styles.down}`}></div>
            </div>
        </div>
    );
};

export default CircleTable4;
