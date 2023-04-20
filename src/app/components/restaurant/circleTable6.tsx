import React from "react";
import styles from "@/app/styles/Table.module.scss";

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

const CircleTable6 = (props: TableProps) => {
    return (
      <div className="d-flex flex-column">
        <div style={{width:'165px'}} className={`${styles.chairs}`}>
          <div className={`${styles.chair}`}></div>
        </div>
        <div className="d-flex align-items-center">
        <div  style={{height:'120px',width:'16%'}} className={`${styles.chairs} flex-column`}>
            <div style={{transform:'rotate(300deg)'}} className={`${styles.chair}`}></div>
            <div style={{transform:'rotate(240deg)'}} className={`${styles.chair}`}></div>
          </div>
          <div
            style={{
              borderRightColor: props?.isFull
                ? "#383e4a"
                : props?.isFull === undefined
                ? "#383e4a"
                : props.color,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
            className={styles.table}
          >
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
          <div style={{height:'120px',width:'55px'}} className={`${styles.chairs} flex-column`}>
            <div style={{transform:'rotate(60deg)'}} className={`${styles.chair} `}></div>
            <div style={{transform:'rotate(120deg)'}} className={`${styles.chair}`}></div>
          </div>
        </div>
        <div style={{width:'165px'}} className={`${styles.chairs}`}>
          <div className={`${styles.chair + " " + styles.down}`}></div>
        </div>
      </div>
    );
};

export default CircleTable6;
