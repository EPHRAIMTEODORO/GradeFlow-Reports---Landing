import type { Value } from '../types';
import styles from '../styles/reportCard.module.css';

interface Props {
  values: Value[];
}

// Group behavior rows under each core value
interface CoreValueGroup {
  coreValue: string;
  behaviors: Value[];
}

function groupByCoreValue(values: Value[]): CoreValueGroup[] {
  const map = new Map<string, Value[]>();
  for (const v of values) {
    const existing = map.get(v.coreValue) ?? [];
    existing.push(v);
    map.set(v.coreValue, existing);
  }
  return Array.from(map.entries()).map(([coreValue, behaviors]) => ({
    coreValue,
    behaviors,
  }));
}

export default function ValuesTable({ values }: Props) {
  const groups = groupByCoreValue(values);

  return (
    <div className={styles.valuesSection}>
      <h3 className={styles.sectionTitle}>OBSERVED VALUES</h3>
      <table className={styles.valuesTable}>
        <thead>
          <tr>
            <th colSpan={2} className={styles.valuesCoreHeader}>Core Values / Behavior Statements</th>
            <th className={styles.center}>Q1</th>
            <th className={styles.center}>Q2</th>
            <th className={styles.center}>Q3</th>
            <th className={styles.center}>Q4</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) =>
            group.behaviors.map((b, idx) => (
              <tr key={`${group.coreValue}-${idx}`}>
                {idx === 0 && (
                  <td rowSpan={group.behaviors.length} className={styles.coreValueCell}>
                    {group.coreValue}
                  </td>
                )}
                <td className={styles.behaviorCell}>{b.behaviorCode}</td>
                <td className={styles.center}>{b.q1 || '—'}</td>
                <td className={styles.center}>{b.q2 || '—'}</td>
                <td className={styles.center}>{b.q3 || '—'}</td>
                <td className={styles.center}>{b.q4 || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.valuesLegend}>
        <p><strong>Rating Legend:</strong></p>
        <p>AO – Always Observed &nbsp;|&nbsp; SO – Sometimes Observed &nbsp;|&nbsp; RO – Rarely Observed &nbsp;|&nbsp; NO – Not Observed</p>
      </div>
    </div>
  );
}
