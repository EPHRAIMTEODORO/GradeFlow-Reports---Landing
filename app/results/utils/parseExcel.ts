import * as XLSX from 'xlsx';
import type { ParsedExcelData, Student, Grade, Value, Attendance, Meta, ValidationError } from '../types';

// ─── Required sheets ──────────────────────────────────────────────────────────
const REQUIRED_SHEETS = ['Students', 'Grades', 'Values', 'Attendance', 'Meta'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sheetToJson<T>(workbook: XLSX.WorkBook, sheetName: string): T[] {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json<T>(sheet, { defval: null });
}

function safeNum(val: unknown): number | null {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}

function safeStr(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateWorkbook(workbook: XLSX.WorkBook): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const sheet of REQUIRED_SHEETS) {
    if (!workbook.SheetNames.includes(sheet)) {
      errors.push({ sheet, message: `Sheet "${sheet}" is missing from the workbook.` });
    }
  }

  if (errors.length > 0) return errors;

  // Validate Students columns
  const students = sheetToJson<Record<string, unknown>>(workbook, 'Students');
  if (students.length === 0) {
    errors.push({ sheet: 'Students', message: 'The Students sheet has no data rows.' });
  } else {
    const required = ['StudentId', 'Name', 'Sex', 'Age', 'Grade', 'Section'];
    const keys = Object.keys(students[0]);
    for (const col of required) {
      if (!keys.includes(col)) {
        errors.push({ sheet: 'Students', message: `Missing column: "${col}"` });
      }
    }
  }

  return errors;
}

// ─── Main parser ──────────────────────────────────────────────────────────────

export function parseExcel(buffer: ArrayBuffer): { data: ParsedExcelData | null; errors: ValidationError[] } {
  const workbook = XLSX.read(buffer, { type: 'array' });

  const errors = validateWorkbook(workbook);
  if (errors.length > 0) return { data: null, errors };

  // Students
  const rawStudents = sheetToJson<Record<string, unknown>>(workbook, 'Students');
  const students: Student[] = rawStudents.map((row) => ({
    studentId: safeStr(row['StudentId']),
    name: safeStr(row['Name']),
    sex: safeStr(row['Sex']),
    age: safeStr(row['Age']),
    grade: safeStr(row['Grade']),
    section: safeStr(row['Section']),
  }));

  // Grades
  const rawGrades = sheetToJson<Record<string, unknown>>(workbook, 'Grades');
  const grades: Grade[] = rawGrades.map((row) => ({
    studentId: safeStr(row['StudentId']),
    subject: safeStr(row['Subject']),
    q1: safeNum(row['Q1']),
    q2: safeNum(row['Q2']),
    q3: safeNum(row['Q3']),
    q4: safeNum(row['Q4']),
  }));

  // Values
  const rawValues = sheetToJson<Record<string, unknown>>(workbook, 'Values');
  const values: Value[] = rawValues.map((row) => ({
    studentId: safeStr(row['StudentId']),
    coreValue: safeStr(row['CoreValue']),
    behaviorCode: safeStr(row['BehaviorCode']),
    q1: safeStr(row['Q1']),
    q2: safeStr(row['Q2']),
    q3: safeStr(row['Q3']),
    q4: safeStr(row['Q4']),
  }));

  // Attendance
  const rawAttendance = sheetToJson<Record<string, unknown>>(workbook, 'Attendance');
  const attendance: Attendance[] = rawAttendance.map((row) => ({
    studentId: safeStr(row['StudentId']),
    month: safeStr(row['Month']),
    schoolDays: safeNum(row['SchoolDays']) ?? 0,
    present: safeNum(row['Present']) ?? 0,
    absent: safeNum(row['Absent']) ?? 0,
  }));

  // Meta
  const rawMeta = sheetToJson<Record<string, unknown>>(workbook, 'Meta');
  const meta: Meta = {};
  for (const row of rawMeta) {
    const key = safeStr(row['Key']);
    const value = safeStr(row['Value']);
    if (key) meta[key] = value;
  }

  return {
    data: { students, grades, values, attendance, meta },
    errors: [],
  };
}
