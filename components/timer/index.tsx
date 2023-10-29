import React from "react";
import styles from "./Timer.module.css";

interface TimeProps {
  id: number;
  time: string;
  text: string;
}

interface TimerProps {
  countdown: TimeProps[];
}

const Timer = ({ countdown }: TimerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {countdown.map((element, index) => (
          <>
            <div key={element.id} className={styles.layout}>
              <div className={styles.time}>{element.time}</div>
              <div className={styles.text}>{element.text}</div>
            </div>
            {index < countdown.length - 1 && (
              <div className={styles.squareWrapper}>
                <div className={styles.square} />
                <div className={styles.square} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Timer;
