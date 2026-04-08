'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ReportCard from './components/ReportCard';
import PreviewModal from './components/PreviewModal';
import type { ReportData } from './types';

export default function ResultsPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const handleData = (data: ReportData[]) => {
    setReports(data);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setReports([]);
  };

  const handlePrint = () => {
    setPreviewing(false);
    // Give the modal time to unmount before triggering print
    setTimeout(() => window.print(), 80);
  };

  return (
    <div className="results-page">
      <div className="no-print">
        <header className="results-header">
          <h1>GradeFlow Reports</h1>
          <p>Upload the Excel template to generate DepEd Junior High School Report Cards.</p>
        </header>

        <FileUpload
          onData={handleData}
          onError={handleError}
          setLoading={setLoading}
        />

        {loading && (
          <div className="status-message">
            <span className="spinner" /> Parsing Excel file…
          </div>
        )}

        {error && (
          <div className="error-banner" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {reports.length > 0 && (
          <div className="actions-bar">
            <span>{reports.length} student{reports.length !== 1 ? 's' : ''} loaded</span>
            <div className="actions-buttons">
              <button onClick={() => setPreviewing(true)} className="btn-preview">
                Preview
              </button>
              <button onClick={handlePrint} className="btn-print">
                Print / Download PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden report cards — rendered off-screen for print */}
      {reports.map((report) => (
        <ReportCard key={report.student.studentId} report={report} />
      ))}

      {/* Preview modal */}
      {previewing && reports.length > 0 && (
        <PreviewModal
          reports={reports}
          onClose={() => setPreviewing(false)}
          onPrint={handlePrint}
        />
      )}

      <style>{`
        .results-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          font-family: sans-serif;
        }
        .results-header {
          margin-bottom: 1.5rem;
        }
        .results-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
        }
        .results-header p {
          color: #555;
          margin-top: 0.25rem;
        }
        .status-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1a56db;
          margin: 1rem 0;
        }
        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid #1a56db;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .error-banner {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 1.5rem 0;
          padding: 0.75rem 1rem;
          background: #f0fdf4;
          border: 1px solid #86efac;
          border-radius: 0.5rem;
        }
        .actions-buttons {
          display: flex;
          gap: 0.6rem;
        }
        .btn-preview {
          background: #0f172a;
          color: white;
          border: none;
          padding: 0.6rem 1.4rem;
          border-radius: 0.4rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-preview:hover { background: #1e293b; }
        .btn-print {
          background: #16a34a;
          color: white;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 0.4rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-print:hover { background: #15803d; }
        @media print {
          .no-print { display: none !important; }
          .results-page { max-width: none; padding: 0; margin: 0; }
        }
      `}</style>
    </div>
  );
}

