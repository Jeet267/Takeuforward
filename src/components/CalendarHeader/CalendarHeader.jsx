import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CalendarHeader.module.css';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

// Fallback images map to give a nice aesthetic per season/month
// In a real app we might have 12 unique images.
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1200", // Jan - Snowy Mountain
  "https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?auto=format&fit=crop&q=80&w=1200", // Feb - Pink/Aesthetic
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200", // Mar - Spring Flowers
  "https://images.unsplash.com/photo-1555448332-9092445e9854?auto=format&fit=crop&q=80&w=1200", // Apr - Soft Bloom
  "https://images.unsplash.com/photo-1476900543704-4312b78632f8?auto=format&fit=crop&q=80&w=1200", // May - Lush Green
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200", // Jun - Summer Beach
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200", // Jul - Summer Field
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", // Aug - Late Summer
  "https://images.unsplash.com/photo-1444464666168-4f51fae923e2?auto=format&fit=crop&q=80&w=1200", // Sep - Autumn Start
  "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=1200", // Oct - Autumn Leaves
  "https://images.unsplash.com/photo-1502484088998-f2b38f8f2b7f?auto=format&fit=crop&q=80&w=1200", // Nov - Moody Autumn
  "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1200"  // Dec - Winter Snow
];

export default function CalendarHeader({ year, month, onPrev, onNext }) {
  const currentImage = HERO_IMAGES[month];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.topBar}>
        <img src="/logo.png" alt="Company Logo" className={styles.logo} />
        <span className={styles.brandName}>TAKEUFORWARD</span>
      </div>
      
      {/* Visual Spiral Binding */}
      <div className={styles.spiralBinding}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.ring}></div>
        ))}
      </div>

      <div className={styles.heroWrapper}>
        <img src={currentImage} alt="Month Hero" className={styles.heroImage} />
        
        {/* Slanted blue overlay matching reference */}
        <div className={styles.brandOverlay}></div>
        
        <div className={styles.dateDisplay}>
          <span className={styles.year}>{year}</span>
          <span className={styles.month}>{MONTH_NAMES[month]}</span>
        </div>
      </div>

      <div className={styles.navigation}>
        <button onClick={onPrev} className={styles.navButton} aria-label="Previous Month">
          <ChevronLeft size={20} />
        </button>
        <button className={styles.todayButton} onClick={() => {
           const now = new Date();
           // Find a way to jump to today if needed, for now just static label
        }}>
           Jump to Selected
        </button>
        <button onClick={onNext} className={styles.navButton} aria-label="Next Month">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
