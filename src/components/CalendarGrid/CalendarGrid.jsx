import React from 'react';
import styles from './CalendarGrid.module.css';
import { generateCalendarGrid, isSameDate, isDateInRange } from '../../utils/dateUtils';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Static holiday markers for creativity
const HOLIDAYS = {
  '0-1': "New Year's Day",
  '0-26': "Republic Day",
  '7-15': "Independence Day",
  '9-31': "Halloween",
  '11-25': "Christmas",
  '1-14': "Valentine's Day"
};

export default function CalendarGrid({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDateSelect,
  onDateHover
}) {
  const grid = generateCalendarGrid(year, month);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.daysHeader}>
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={day} className={`${styles.dayName} ${index >= 5 ? styles.weekendName : ''}`}>
            {day}
          </div>
        ))}
      </div>
      
      <div className={styles.daysGrid} onMouseLeave={() => onDateHover(null)}>
        {grid.map((dateObj, index) => {
          const isStart = isSameDate(dateObj, startDate);
          const isEnd = isSameDate(dateObj, endDate);
          const inRange = isDateInRange(
            dateObj,
            startDate,
            endDate || hoverDate
          );
          
          let cellStateClass = '';
          if (isStart) cellStateClass = styles.selectedStart;
          else if (isEnd) cellStateClass = styles.selectedEnd;
          else if (inRange) cellStateClass = styles.inRange;
          
          const isRangeStart = isStart && (endDate || hoverDate);
          const isRangeEnd = isEnd && startDate;

          const isHoliday = HOLIDAYS[`${dateObj.month}-${dateObj.day}`];

          return (
            <div
              key={`${dateObj.month}-${dateObj.day}-${index}`}
              className={styles.cellWrapper}
            >
              {inRange && <div className={styles.rangeBg} />}
              {isRangeStart && <div className={styles.rangeStartBg} />}
              {isRangeEnd && <div className={styles.rangeEndBg} />}
              
              <button
                className={`
                  ${styles.dateCell}
                  ${!dateObj.isCurrentMonth ? styles.offsetMonth : ''}
                  ${cellStateClass}
                `}
                onClick={() => onDateSelect(dateObj)}
                onMouseEnter={() => onDateHover(dateObj)}
                disabled={!dateObj.isCurrentMonth}
                title={isHoliday ? isHoliday : ''}
              >
                {dateObj.day}
                {/* Visual marker for cool holidays */}
                {isHoliday && dateObj.isCurrentMonth && (
                  <span className={styles.holidayDot}></span>
                )}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Legend for holidays */}
      <div className={styles.legend}>
        <span className={styles.legendDot}></span>
        <span className={styles.legendText}>Public Holiday</span>
      </div>
    </div>
  );
}
