import React from 'react';
import styles from '@/app/styles/Table.module.scss';
import { TableProps } from '@/app/types/TableProps';

const MediumTable = (props: TableProps) => {
    return (
        <>
            <div style={{ width: '180px' }} className={styles.chairs}>
                <div className={styles.chair}></div>
                <div className={styles.chair}></div>
            </div>
            <div
                style={{
                    borderRightColor: props?.isFull
                        ? '#383e4a'
                        : props?.isFull === undefined
                        ? '#383e4a'
                        : props.color,
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
            <div style={{ width: '180px' }} className={styles.chairs}>
                <div className={`${styles.chair} ${styles.down}`}></div>
                <div className={`${styles.chair} ${styles.down}`}></div>
            </div>
        </>
    );
};

export default MediumTable;
