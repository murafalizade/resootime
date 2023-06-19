import React from 'react';
import styles from '@/app/styles/Table.module.scss';
import { TableProps } from '@/app/types/TableProps';

const SquareTable1 = (props: TableProps) => {
    return (
        <>
            <div
                style={{
                    width: '75px',
                }}
                className={styles.chairs}>
                <div className={styles.chair}></div>
            </div>
            <div
                style={{
                    borderRightColor: props?.isFull
                        ? '#383e4a'
                        : props?.isFull === undefined
                        ? '#383e4a'
                        : props.color,
                    width: '75px',
                    height: '75px',
                }}
                className={styles.table}>
                <input
                    type="text"
                    className={styles.input}
                    value={props.name}
                    disabled={!props.isEdit}
                    style={{
                        transform: `rotate(-${props?.deg}deg)`,
                        userSelect: 'none',
                    }}
                    onChange={(e: any) => props.changeName(e)}
                />
                {/* <span style={{ color: "yellow", paddingTop: "3px" }}>
          {props?.date}
        </span>
        <span>{props?.userName}</span> */}
            </div>
        </>
    );
};

export default SquareTable1;
