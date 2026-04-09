import React, { useState } from 'react';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import Notes from '../Notes/Notes';
import { isDateBefore } from '../../utils/dateUtils';
import styles from './WallCalendar.module.css';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic theme colors for each month to give an extra creative touch
const MONTH_THEMES = [
  '#0ea5e9', // Jan - Sky Blue
  '#ec4899', // Feb - Pink (Valentine)
  '#10b981', // Mar - Emerald Green
  '#f59e0b', // Apr - Amber
  '#8b5cf6', // May - Violet
  '#ef4444', // Jun - Red
  '#06b6d4', // Jul - Cyan
  '#3b82f6', // Aug - Blue
  '#d946ef', // Sep - Fuchsia
  '#f97316', // Oct - Orange (Autumn/Halloween)
  '#6366f1', // Nov - Indigo
  '#14b8a6', // Dec - Teal (Winter)
];


export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // State for date range selection
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Next/Prev direction for framing motion
  const [direction, setDirection] = useState(0);

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (dateObj) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateObj);
      setEndDate(null);
    } else {
      if (isDateBefore(dateObj, startDate)) {
        setEndDate(startDate);
        setStartDate(dateObj);
      } else {
        setEndDate(dateObj);
      }
    }
  };

  const handleDateHover = (dateObj) => {
    if (startDate && !endDate) {
      setHoverDate(dateObj);
    }
  };

  // The cool slide animation variants
  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 50 : -50,
      rotateY: dir > 0 ? -15 : 15 // tiny 3d flip effect
    }),
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -50 : 50,
      transition: { duration: 0.2 }
    })
  };

  return (
    // Applying dynamic CSS variables based on the month
    <div
      className={styles.calendarPaper}
      style={{
        '--dynamic-primary': MONTH_THEMES[month],
        '--primary-color': MONTH_THEMES[month]
      }}
    >
      <CalendarHeader
        year={year}
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <div className={styles.calendarBody}>
        <div className={styles.notesPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`notes-${year}-${month}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <Notes monthKey={`${year}-${month}`} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.gridPanel}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${year}-${month}`}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ perspective: 1000 }}
            >
              <CalendarGrid
                year={year}
                month={month}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                onDateSelect={handleDateSelect}
                onDateHover={handleDateHover}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
