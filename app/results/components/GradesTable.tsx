import type { ComputedGrade } from '../types';
import styles from '../styles/reportCard.module.css';

interface Props {
  grades: ComputedGrade[];
  generalAverage: number | null;
  overallRemarks: string;
}

export default function GradesTable({ grades, generalAverage, overallRemarks }: Props) {
  return (
    <div className={styles.gradesSection}>
      <table className={styles.gradesTable}>
        <thead>
          <tr>
            <th className={styles.subjectCol}>Learning Area</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
            <th>Final Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, i) => (
            <tr key={i}>
              <td className={styles.subjectCol}>{g.subject}</td>
              <td className={styles.center}>{g.q1 ?? '—'}</td>
              <td className={styles.center}>{g.q2 ?? '—'}</td>
              <td className={styles.center}>{g.q3 ?? '—'}</td>
              <td className={styles.center}>{g.q4 ?? '—'}</td>
              <td className={`${styles.center} ${styles.bold}`}>{g.finalGrade ?? '—'}</td>
              <td className={`${styles.center} ${g.remarks === 'Failed' ? styles.failed : ''}`}>
                {g.remarks}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={styles.averageRow}>
            <td colSpan={5} className={styles.bold}>GENERAL AVERAGE</td>
            <td className={`${styles.center} ${styles.bold}`}>{generalAverage ?? '—'}</td>
            <td className={`${styles.center} ${styles.bold} ${overallRemarks === 'Failed' ? styles.failed : ''}`}>
              {overallRemarks}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className={styles.gradingScale}>
        <p className={styles.scaleTitle}>Grading Scale:</p>
        <table className={styles.scaleTable}>
          <thead>
            <tr>
              <th>DO 8, s. 2015</th>
              <th>Descriptor</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['90–100', 'Outstanding', 'Passed'],
              ['85–89', 'Very Satisfactory', 'Passed'],
              ['80–84', 'Satisfactory', 'Passed'],
              ['75–79', 'Fairly Satisfactory', 'Passed'],
              ['Below 75', 'Did Not Meet Expectations', 'Failed'],
            ].map(([range, desc, rem]) => (
              <tr key={range}>
                <td className={styles.center}>{range}</td>
                <td>{desc}</td>
                <td className={styles.center}>{rem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
