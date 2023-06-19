import React from 'react';
import styles from '@/app/styles/Table.module.scss';
import { TableProps } from '@/app/types/TableProps';

const HugeTable = (props: TableProps) => {
    return (
        <div className="d-flex flex-column">
            <div className={styles.chairs} style={{ width: '195px' }}>
                <div className={`${styles.chair}`}></div>
                <div className={`${styles.chair}`}></div>
                <div className={`${styles.chair}`}></div>
            </div>
            <div
                style={{
                    borderRightColor: props?.isFull
                        ? '#383e4a'
                        : props?.isFull === undefined
                        ? '#383e4a'
                        : props.color,
                    width: '200px',
                    height: '75px',
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
            <div style={{ width: '195px' }} className={styles.chairs}>
                <div className={`${styles.chair} ${styles.down}`}></div>
                <div className={`${styles.chair} ${styles.down}`}></div>
                <div className={`${styles.chair} ${styles.down}`}></div>
            </div>
        </div>
    );
};

export default HugeTable;
