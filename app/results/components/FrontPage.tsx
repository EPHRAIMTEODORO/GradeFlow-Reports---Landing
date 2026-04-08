import type { ReportData } from '../types';
import AttendanceTable from './AttendanceTable';
import styles from '../styles/reportCard.module.css';

interface Props {
  report: ReportData;
}

export default function FrontPage({ report }: Props) {
  const { student, attendance, meta } = report;

  const schoolYear = meta['SchoolYear'] ?? '____–____';
  const schoolName = meta['SchoolName'] ?? 'SCHOOL NAME';
  const schoolId = meta['SchoolId'] ?? '___________';
  const district = meta['District'] ?? '___________';
  const division = meta['Division'] ?? '___________';
  const region = meta['Region'] ?? '___________';
  const adviser = meta['Adviser'] ?? '___________________________';
  const principal = meta['Principal'] ?? '___________________________';

  return (
    <div className={styles.page}>
      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <AttendanceTable attendance={attendance} />

        <div className={styles.parentSignSection}>
          <p className={styles.sectionTitle}>PARENT'S / GUARDIAN'S SIGNATURE</p>
          <table className={styles.sigTable}>
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Signature over Printed Name</th>
                <th>Relationship</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {['1st', '2nd', '3rd', '4th'].map((q) => (
                <tr key={q}>
                  <td className={styles.center}>{q}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        {/* DepEd Header */}
        <div className={styles.reportHeader}>
          <div className={styles.headerLogos}>
            <div className={styles.logoPlaceholder}>DepEd</div>
            <div className={styles.headerText}>
              <p className={styles.republic}>Republic of the Philippines</p>
              <p className={styles.deped}>Department of Education</p>
              <p className={styles.region}>{region}</p>
            </div>
            <div className={styles.logoPlaceholder}>Logo</div>
          </div>

          <div className={styles.reportTitle}>
            <p className={styles.titleMain}>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</p>
            <p className={styles.titleSub}>For Junior High School</p>
            <p className={styles.titleSy}>S.Y. {schoolYear}</p>
          </div>
        </div>

        {/* School Info */}
        <div className={styles.schoolInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name of School:</span>
            <span className={styles.infoValue}>{schoolName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>School ID:</span>
            <span className={styles.infoValue}>{schoolId}</span>
            <span className={styles.infoLabel}>District:</span>
            <span className={styles.infoValue}>{district}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Division:</span>
            <span className={styles.infoValue}>{division}</span>
          </div>
        </div>

        {/* Student Info */}
        <div className={styles.studentInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Name of Learner:</span>
            <span className={`${styles.infoValue} ${styles.bold}`}>{student.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Learner Reference No. (LRN):</span>
            <span className={styles.infoValue}>{student.studentId}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Grade Level:</span>
            <span className={styles.infoValue}>{student.grade}</span>
            <span className={styles.infoLabel}>Section:</span>
            <span className={styles.infoValue}>{student.section}</span>
            <span className={styles.infoLabel}>Sex:</span>
            <span className={styles.infoValue}>{student.sex}</span>
            <span className={styles.infoLabel}>Age:</span>
            <span className={styles.infoValue}>{student.age}</span>
          </div>
        </div>

        {/* Message */}
        <div className={styles.messagebox}>
          <p>
            Dear Parent / Guardian, this Report Card shows the academic performance
            and behavior of your child / ward for School Year {schoolYear}.
            Please review this with your child and sign on the appropriate column.
            For concerns, please contact the Class Adviser.
          </p>
        </div>

        {/* Signatories */}
        <div className={styles.signatories}>
          <div className={styles.signatory}>
            <div className={styles.signLine}>{adviser}</div>
            <p>Class Adviser</p>
          </div>
          <div className={styles.signatory}>
            <div className={styles.signLine}>{principal}</div>
            <p>School Principal</p>
          </div>
        </div>

        {/* Certificate of Transfer */}
        <div className={styles.transferSection}>
          <p className={styles.sectionTitle}>CERTIFICATE OF TRANSFER</p>
          <p className={styles.transferBody}>
            This is to certify that the learner named above has been duly enrolled in
            __________________________________ for Grade _____ Section __________ S.Y. __________.
          </p>
          <div className={styles.signatories} style={{ marginTop: '0.5rem' }}>
            <div className={styles.signatory}>
              <div className={styles.signLine}>&nbsp;</div>
              <p>Principal / School Head</p>
            </div>
          </div>
        </div>

        {/* Cancellation */}
        <div className={styles.cancellationSection}>
          <p className={styles.sectionTitle}>CANCELLATION OF REGISTRATION</p>
          <p className={styles.transferBody}>
            The registration of the above-named learner is hereby cancelled effective _______________ on the ground of __________________________________.
          </p>
        </div>
      </div>
    </div>
  );
}
