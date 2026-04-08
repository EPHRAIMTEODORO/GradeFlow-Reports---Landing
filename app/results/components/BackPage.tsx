import type { ReportData } from '../types';
import GradesTable from './GradesTable';
import ValuesTable from './ValuesTable';
import styles from '../styles/reportCard.module.css';

interface Props {
  report: ReportData;
}

export default function BackPage({ report }: Props) {
  const { grades, generalAverage, overallRemarks, values, student, meta } = report;

  const schoolYear = meta['SchoolYear'] ?? '____–____';

  return (
    <div className={`${styles.page} ${styles.pageBreakBefore}`}>
      {/* LEFT PANEL — Grades */}
      <div className={styles.leftPanel}>
        <div className={styles.backPageHeader}>
          <p className={styles.bold}>{student.name}</p>
          <p>Grade {student.grade} – {student.section} &nbsp;|&nbsp; S.Y. {schoolYear}</p>
        </div>
        <GradesTable
          grades={grades}
          generalAverage={generalAverage}
          overallRemarks={overallRemarks}
        />
      </div>

      {/* RIGHT PANEL — Values */}
      <div className={styles.rightPanel}>
        <ValuesTable values={values} />
      </div>
    </div>
  );
}
