import React from 'react';
import styles from '@/app/styles/Table.module.scss';

interface TableProps {
    className?: string;
    isFull?: boolean;
    name: string;
    userName?: string;
    color?: string;
    deg?: number;
    date?: string;
    changeName: (e: any) => void;
}

const CircleTable1 = (props: TableProps) => {
    return (
        <div className="d-flex flex-column">
            <div className={`w-100 ${styles.chairs}`}>
                <div className={`${styles.chair}`}></div>
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
                    style={{ transform: `rotate(-${props?.deg}deg)` }}
                    onChange={(e: any) => props.changeName(e)}
                />
                {/* <span style={{ color: "yellow", paddingTop: "3px" }}>
          {props?.date}
        </span>
        <span>{props?.userName}</span> */}
            </div>
            <div className={`w-100 ${styles.chairs}`}>
                <div className={`${styles.chair + ' ' + styles.down}`}></div>
            </div>
        </div>
    );
};

export default CircleTable1;
