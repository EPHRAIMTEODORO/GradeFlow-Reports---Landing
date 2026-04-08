// ─── Core domain types ────────────────────────────────────────────────────────

export interface Student {
  studentId: string;
  name: string;
  sex: string;
  age: number | string;
  grade: string | number;
  section: string;
}

export interface Grade {
  studentId: string;
  subject: string;
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
}

export interface Value {
  studentId: string;
  coreValue: string;
  behaviorCode: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

export interface Attendance {
  studentId: string;
  month: string;
  schoolDays: number;
  present: number;
  absent: number;
}

export interface Meta {
  [key: string]: string;
}

// ─── Computed grade row ────────────────────────────────────────────────────────

export interface ComputedGrade extends Grade {
  finalGrade: number | null;
  remarks: 'Passed' | 'Failed' | '—';
}

// ─── Full per-student report payload ─────────────────────────────────────────

export interface ReportData {
  student: Student;
  grades: ComputedGrade[];
  generalAverage: number | null;
  overallRemarks: 'Passed' | 'Failed' | '—';
  values: Value[];
  attendance: Attendance[];
  meta: Meta;
}

// ─── Raw parsed data before computation ──────────────────────────────────────

export interface ParsedExcelData {
  students: Student[];
  grades: Grade[];
  values: Value[];
  attendance: Attendance[];
  meta: Meta;
}

// ─── Validation error ─────────────────────────────────────────────────────────

export interface ValidationError {
  sheet: string;
  message: string;
}
