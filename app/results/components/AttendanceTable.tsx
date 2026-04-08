import type { Attendance } from '../types';
import styles from '../styles/reportCard.module.css';

interface Props {
  attendance: Attendance[];
}

export default function AttendanceTable({ attendance }: Props) {
  const totalDays = attendance.reduce((s, a) => s + a.schoolDays, 0);
  const totalPresent = attendance.reduce((s, a) => s + a.present, 0);
  const totalAbsent = attendance.reduce((s, a) => s + a.absent, 0);

  return (
    <div className={styles.attendanceSection}>
      <h3 className={styles.sectionTitle}>ATTENDANCE</h3>
      <table className={styles.attendanceTable}>
        <thead>
          <tr>
            <th>Month</th>
            <th className={styles.center}>School Days</th>
            <th className={styles.center}>Days Present</th>
            <th className={styles.center}>Days Absent</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((a, i) => (
              <tr key={i}>
                <td>{a.month}</td>
                <td className={styles.center}>{a.schoolDays}</td>
                <td className={styles.center}>{a.present}</td>
                <td className={styles.center}>{a.absent}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.center} style={{ color: '#888', fontStyle: 'italic' }}>
                No attendance data
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className={styles.averageRow}>
            <td className={styles.bold}>TOTAL</td>
            <td className={`${styles.center} ${styles.bold}`}>{totalDays}</td>
            <td className={`${styles.center} ${styles.bold}`}>{totalPresent}</td>
            <td className={`${styles.center} ${styles.bold}`}>{totalAbsent}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
