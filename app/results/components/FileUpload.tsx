'use client';

import { useRef } from 'react';
import * as XLSX from 'xlsx';
import { parseExcel } from '../utils/parseExcel';
import { buildReports } from '../utils/computeGrades';
import type { ReportData } from '../types';

interface Props {
  onData: (reports: ReportData[]) => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function FileUpload({ onData, onError, setLoading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      onError('Please upload a valid Excel file (.xlsx or .xls).');
      return;
    }

    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const { data, errors } = parseExcel(buffer);

      if (errors.length > 0) {
        onError(errors.map((e) => `[${e.sheet}] ${e.message}`).join(' | '));
        return;
      }
      if (!data) {
        onError('Failed to parse the Excel file. Please check the template.');
        return;
      }

      const reports = buildReports(data);
      if (reports.length === 0) {
        onError('No students found in the Excel file.');
        return;
      }

      onData(reports);
    } catch (err) {
      onError('Unexpected error while reading the file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset so the same file can be re-uploaded
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="upload-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      aria-label="Upload Excel file"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <div className="upload-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <p className="upload-label">Drop your Excel file here, or <span className="upload-link">browse</span></p>
      <p className="upload-hint">Accepts .xlsx / .xls — must follow the GradeFlow template</p>

      <style>{`
        .upload-zone {
          border: 2px dashed #93c5fd;
          border-radius: 0.75rem;
          background: #eff6ff;
          padding: 2.5rem;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .upload-zone:hover, .upload-zone:focus {
          background: #dbeafe;
          border-color: #3b82f6;
          outline: none;
        }
        .upload-icon { color: #3b82f6; margin-bottom: 0.5rem; display: flex; justify-content: center; }
        .upload-label { font-size: 1rem; color: #1e3a5f; font-weight: 500; }
        .upload-link { color: #2563eb; text-decoration: underline; cursor: pointer; }
        .upload-hint { font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; }
      `}</style>
    </div>
  );
}
