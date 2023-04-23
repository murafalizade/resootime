import React from 'react';
import styles from '@/app/styles/Table.module.scss';

interface TableProps {
    className?: string;
    isFull?: boolean;
    name: string;
    userName?: string;
    changeName: (e: any) => void;
    date?: string;
    deg?: number;
    color?: string;
}

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
                    style={{ transform: `rotate(-${props?.deg}deg)` }}
                    onChange={(e: any) => props.changeName(e)}
                />
                {/* <span style={{ color: "yellow", paddingTop: "3px" }}>
          {props?.date}
        </span>
        <span>{props?.userName}</span> */}
            </div>
            <div
                style={{
                    width: '75px',
                }}
                className={styles.chairs}>
                <div className={`${styles.chair} ${styles.down}`}></div>
            </div>
        </>
    );
};

export default SquareTable1;
