import React, { useState, useEffect } from 'react';
import styles from './Notes.module.css';

export default function Notes({ monthKey }) {
  const [notes, setNotes] = useState('');

  // Load notes when the month changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(`calendar-notes-${monthKey}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [monthKey]);

  // Save notes locally whenever they change
  const handleNotesChange = (e) => {
    const newVal = e.target.value;
    setNotes(newVal);
    localStorage.setItem(`calendar-notes-${monthKey}`, newVal);
  };

  return (
    <div className={styles.notesContainer}>
      <h3 className={styles.notesTitle}>Notes</h3>
      <div className={styles.notesLinesWrapper}>
        <textarea
          className={styles.notesTextarea}
          value={notes}
          onChange={handleNotesChange}
          placeholder="Jot down some memos..."
          spellCheck={false}
        />
        {/* Background lines representing a physical note pad */}
        <div className={styles.linesBackground}></div>
      </div>
    </div>
  );
}
