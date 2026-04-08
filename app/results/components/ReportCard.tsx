import type { ReportData } from '../types';
import FrontPage from './FrontPage';
import BackPage from './BackPage';
import styles from '../styles/reportCard.module.css';

interface Props {
  report: ReportData;
}

export default function ReportCard({ report }: Props) {
  return (
    <div className={styles.reportCard}>
      <FrontPage report={report} />
      <BackPage report={report} />
    </div>
  );
}
