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

const SmallTable = (props: TableProps) => {
    return (
        <div style={{ display: 'flex' }}>
            <div
                className={styles.chairs}
                style={{ flexDirection: 'column', width: '20px' }}>
                <div className={`${styles.chair} ${styles.lchair}`}></div>
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
                />{' '}
                {/* <span style={{ color: "yellow", paddingTop: "3px", fontSize: "7px" }}>
          {props?.date}
        </span>
        <span style={{ fontSize: "7px" }}>{props?.userName}</span> */}
            </div>
            <div
                style={{ flexDirection: 'column', width: '20px' }}
                className={styles.chairs}>
                <div className={`${styles.chair} ${styles.uchair}`}></div>
            </div>
        </div>
    );
};

export default SmallTable;
