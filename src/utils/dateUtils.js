export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  // 0 is Sunday, 1 is Monday
  let day = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0 and Sunday is 6
  return day === 0 ? 6 : day - 1;
}

export function generateCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);
  const grid = [];

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    grid.push({
      day: prevMonthDays - i,
      month: month - 1 < 0 ? 11 : month - 1,
      year: month - 1 < 0 ? year - 1 : year,
      isCurrentMonth: false
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    });
  }

  // Next month padding to fill a 6-row grid (42 days)
  const remainingDays = 42 - grid.length;
  for (let i = 1; i <= remainingDays; i++) {
    grid.push({
      day: i,
      month: month + 1 > 11 ? 0 : month + 1,
      year: month + 1 > 11 ? year + 1 : year,
      isCurrentMonth: false
    });
  }

  return grid;
}

export function isSameDate(date1, date2) {
  if (!date1 || !date2) return false;
  return (
    date1.day === date2.day &&
    date1.month === date2.month &&
    date1.year === date2.year
  );
}

export function isDateBefore(date1, date2) {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1.year, date1.month, date1.day);
  const d2 = new Date(date2.year, date2.month, date2.day);
  return d1 < d2;
}

export function isDateInRange(target, start, end) {
  if (!start || !end || !target) return false;

  const tDate = new Date(target.year, target.month, target.day);
  const sDate = new Date(start.year, start.month, start.day);
  const eDate = new Date(end.year, end.month, end.day);

  return (
    tDate > Math.min(sDate, eDate) &&
    tDate < Math.max(sDate, eDate)
  );
}
