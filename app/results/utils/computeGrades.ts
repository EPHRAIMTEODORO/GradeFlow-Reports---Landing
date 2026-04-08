import type { Grade, ComputedGrade, ParsedExcelData, ReportData } from '../types';

// ─── Per-subject computation ──────────────────────────────────────────────────

function computeFinalGrade(grade: Grade): number | null {
  const quarters = [grade.q1, grade.q2, grade.q3, grade.q4].filter(
    (q): q is number => q !== null
  );
  if (quarters.length === 0) return null;
  const sum = quarters.reduce((acc, q) => acc + q, 0);
  return Math.round(sum / quarters.length);
}

function getRemarks(finalGrade: number | null): 'Passed' | 'Failed' | '—' {
  if (finalGrade === null) return '—';
  return finalGrade >= 75 ? 'Passed' : 'Failed';
}

// ─── General average ──────────────────────────────────────────────────────────

function computeGeneralAverage(computedGrades: ComputedGrade[]): number | null {
  const finals = computedGrades
    .map((g) => g.finalGrade)
    .filter((f): f is number => f !== null);
  if (finals.length === 0) return null;
  const avg = finals.reduce((a, b) => a + b, 0) / finals.length;
  return Math.round(avg);
}

// ─── Build per-student report data ───────────────────────────────────────────

export function buildReports(parsed: ParsedExcelData): ReportData[] {
  return parsed.students.map((student) => {
    const studentGrades = parsed.grades.filter(
      (g) => g.studentId === student.studentId
    );
    const computedGrades: ComputedGrade[] = studentGrades.map((g) => {
      const finalGrade = computeFinalGrade(g);
      return {
        ...g,
        finalGrade,
        remarks: getRemarks(finalGrade),
      };
    });

    const generalAverage = computeGeneralAverage(computedGrades);

    return {
      student,
      grades: computedGrades,
      generalAverage,
      overallRemarks: getRemarks(generalAverage),
      values: parsed.values.filter((v) => v.studentId === student.studentId),
      attendance: parsed.attendance.filter(
        (a) => a.studentId === student.studentId
      ),
      meta: parsed.meta,
    };
  });
}
