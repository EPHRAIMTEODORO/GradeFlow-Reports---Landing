'use client';

import { useEffect, useRef } from 'react';
import ReportCard from './ReportCard';
import type { ReportData } from '../types';

interface Props {
  reports: ReportData[];
  onClose: () => void;
  onPrint: () => void;
}

export default function PreviewModal({ reports, onClose, onPrint }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Report card preview"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* ── Toolbar ── */}
      <div className="preview-toolbar">
        <div className="preview-toolbar-left">
          <span className="preview-title">
            Preview — {reports.length} report card{reports.length !== 1 ? 's' : ''}
          </span>
          <span className="preview-hint">Scroll to review all pages before printing</span>
        </div>
        <div className="preview-toolbar-right">
          <button onClick={onPrint} className="btn-print-modal">
            Print / Download PDF
          </button>
          <button onClick={onClose} className="btn-close-modal" aria-label="Close preview">
            Close
          </button>
        </div>
      </div>

      {/* ── Scaled report cards ── */}
      <div className="preview-scroll">
        {reports.map((report) => (
          <div key={report.student.studentId} className="preview-card-wrapper">
            <div className="preview-student-label">
              {report.student.name} — Grade {report.student.grade}, {report.student.section}
            </div>
            <div className="preview-scale-container">
              <div className="preview-scale-inner">
                <ReportCard report={report} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .preview-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.85);
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(4px);
        }

        /* ── Toolbar ── */
        .preview-toolbar {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          background: #0f172a;
          border-bottom: 1px solid #1e3a5f;
        }
        .preview-toolbar-left {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .preview-title {
          font-family: sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .preview-hint {
          font-family: sans-serif;
          font-size: 0.72rem;
          color: #64748b;
        }
        .preview-toolbar-right {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }
        .btn-print-modal {
          background: #16a34a;
          color: white;
          border: none;
          padding: 0.55rem 1.25rem;
          border-radius: 0.4rem;
          font-family: sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-print-modal:hover { background: #15803d; }
        .btn-close-modal {
          background: transparent;
          color: #94a3b8;
          border: 1px solid #334155;
          padding: 0.5rem 1rem;
          border-radius: 0.4rem;
          font-family: sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .btn-close-modal:hover { color: #e2e8f0; border-color: #64748b; }

        /* ── Scrollable area ── */
        .preview-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          align-items: center;
        }

        /* ── Card wrapper ── */
        .preview-card-wrapper {
          width: 100%;
          max-width: 1100px;
        }
        .preview-student-label {
          font-family: sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }

        /* ── Scale container ──
           The report card is designed at ~1400px wide.
           We scale it down to fit within the preview area.
        */
        .preview-scale-container {
          width: 100%;
          overflow: hidden;
          background: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .preview-scale-inner {
          transform-origin: top left;
          /* JS sets the scale via inline style */
        }

        @media print {
          .preview-overlay { display: none !important; }
        }
      `}</style>

      {/* Inline script to apply dynamic scale based on container width */}
      <ScaleController />
    </div>
  );
}

// Applies CSS transform scale to all .preview-scale-inner elements
// so the 1400px-wide report card fits the visible container.
function ScaleController() {
  useEffect(() => {
    function applyScale() {
      const DESIGN_WIDTH = 1400;
      document.querySelectorAll<HTMLElement>('.preview-scale-inner').forEach((inner) => {
        const container = inner.closest<HTMLElement>('.preview-scale-container');
        if (!container) return;
        const availableWidth = container.clientWidth;
        const scale = Math.min(1, availableWidth / DESIGN_WIDTH);
        inner.style.transform = `scale(${scale})`;
        inner.style.width = `${DESIGN_WIDTH}px`;
        // Adjust the outer container height to match scaled content
        const naturalHeight = inner.scrollHeight;
        container.style.height = `${naturalHeight * scale}px`;
      });
    }

    applyScale();
    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
  }, []);

  return null;
}
