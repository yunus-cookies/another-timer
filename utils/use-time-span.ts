import { useEffect, useState } from "react";

const MS_IN_A_SECOND = 1000;
const MS_IN_A_MINUTE = MS_IN_A_SECOND * 60;
const MS_IN_AN_HOUR = MS_IN_A_MINUTE * 60;
const MS_IN_A_DAY = MS_IN_AN_HOUR * 24;

export interface IUseTimeSpan {
  timestampMS: number;
}

export type ITime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimeSpan = {
  timeUnits: ITime;
  isLive: boolean;
};

const getTimeUnits = (timestampMS: number): ITime => {
  const diff = timestampMS - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(diff / MS_IN_A_DAY);
  const hours = Math.floor((diff - MS_IN_A_DAY * days) / MS_IN_AN_HOUR);
  const minutes = Math.floor(
    (diff - MS_IN_A_DAY * days - MS_IN_AN_HOUR * hours) / MS_IN_A_MINUTE
  );
  const seconds = Math.floor(
    (diff -
      MS_IN_A_DAY * days -
      MS_IN_AN_HOUR * hours -
      MS_IN_A_MINUTE * minutes) /
      MS_IN_A_SECOND
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const useTimeSpan = ({ timestampMS }: IUseTimeSpan): TimeSpan => {
  const [_units, _setUnits] = useState(getTimeUnits(timestampMS));
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      _setUnits(getTimeUnits(timestampMS));
      if (Date.now() > timestampMS) {
        setIsLive(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timestampMS]);

  return { timeUnits: _units, isLive };
};

export default useTimeSpan;
