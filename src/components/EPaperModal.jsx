import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, Calendar, Lock, CheckCircle2 } from 'lucide-react';
import { CURRENT_DATE } from '../data/newsData';
import { downloadDigitalEditionPDF } from '../utils/downloadPdf';

export const EPaperModal = ({ onClose, isLoggedIn, onOpenLogin }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const totalPages = 16;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const success = downloadDigitalEditionPDF(currentPage);
      setDownloading(false);
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    }, 400);
  };

  // If user is not logged in / subscribed, show locked subscriber modal
  if (!isLoggedIn) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '540px', padding: '36px 30px', textAlign: 'center', borderRadius: '12px' }}
        >
          <div style={{ background: '#fef2f2', border: '1px solid rgba(220,38,38,0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Lock size={30} color="#dc2626" />
          </div>

          <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            SUBSCRIBER EXCLUSIVE 💎
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif-title, Georgia, serif)', fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
            Digital Edition Access Restricted
          </h2>

          <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, marginBottom: '24px' }}>
            The Daily Brief Digital Replica Edition and downloadable PDF broadsheets are reserved strictly for active subscribers and logged-in members.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                onClose();
                if (onOpenLogin) onOpenLogin();
              }}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 800,
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
            >
              <Lock size={16} />
              <span>Log In to Unlock Digital Edition & PDF 💎</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                fontWeight: 600,
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px', height: '90vh', display: 'flex', flexDirection: 'column', padding: 0 }}
      >
        {/* e-Paper Toolbar */}
        <div style={{ background: '#111', color: '#fff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-serif-title)', fontWeight: 800, fontSize: '18px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              THE DAILY BRIEF e-Paper <span style={{ fontSize: '12px' }}>💎</span>
            </span>
            <span style={{ fontSize: '13px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} />
              {CURRENT_DATE}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Page Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#222', padding: '4px 10px', borderRadius: '4px', fontSize: '13px' }}>
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <ChevronLeft size={16} color={currentPage === 1 ? '#555' : '#fff'} />
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                <ChevronRight size={16} color={currentPage === totalPages ? '#555' : '#fff'} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button onClick={() => setZoom(Math.max(70, zoom - 15))}><ZoomOut size={18} color="#fff" /></button>
              <span style={{ fontSize: '12px', minWidth: '40px', textAlign: 'center' }}>{zoom}%</span>
              <button onClick={() => setZoom(Math.min(150, zoom + 15))}><ZoomIn size={18} color="#fff" /></button>
            </div>

            {/* PDF Download Button */}
            <button 
              onClick={handleDownload} 
              disabled={downloading}
              style={{ 
                background: downloadSuccess ? '#059669' : '#047857', 
                color: '#fff', 
                border: 'none',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '12px',
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                cursor: downloading ? 'wait' : 'pointer' 
              }} 
              title="Download Edition PDF"
            >
              {downloadSuccess ? <CheckCircle2 size={15} /> : <Download size={15} />}
              <span>{downloading ? 'Preparing PDF...' : downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>

            <button onClick={onClose} style={{ color: '#fff', marginLeft: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Newspaper Page Replica View */}
        <div style={{ flex: 1, overflow: 'auto', background: '#444', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '30px' }}>
          <div 
            style={{ 
              width: `${(800 * zoom) / 100}px`, 
              minHeight: '1100px', 
              background: '#fff', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              padding: '40px',
              fontFamily: 'var(--font-headline)',
              transition: 'width 0.2s ease-out'
            }}
          >
            {/* BroadSheet Header Replica */}
            <div style={{ textAlign: 'center', borderBottom: '3px double #111', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#555' }}>
                <span>NEW DELHI EDITION</span>
                <span>{CURRENT_DATE}</span>
                <span>VOL. CXLVII NO. 184</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '46px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#111' }}>
                THE DAILY BRIEF
              </h1>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', letterSpacing: '1px', marginTop: '4px' }}>
                SUBSCRIBER EXCLUSIVE DIGITAL REPLICA
              </div>
            </div>

            {/* Front Page Columns Simulation */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '10px' }}>
                  Brij Bhushan Sharan Singh, aide Vinod Tomar acquitted in women wrestlers case
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
                  A Delhi court on Monday acquitted former Wrestling Federation of India president Brij Bhushan Sharan Singh in the high-profile case...
                </p>
                <div style={{ marginTop: '20px', background: '#eee', height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '14px', gap: '12px', borderRadius: '4px' }}>
                  <span>[ Front Page Digital Replica Edition - Page {currentPage} ]</span>
                  <button 
                    onClick={handleDownload}
                    style={{
                      background: '#059669',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={15} />
                    <span>Download Full Edition PDF</span>
                  </button>
                </div>
              </div>
              <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                <h3 style={{ fontSize: '18px', color: '#900000', fontWeight: 800, marginBottom: '8px' }}>
                  SC Urgently Hears July 20 Violence Plea
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5 }}>
                  The apex court agreed to hear petitions regarding event organizer accountability...
                </p>
                <hr style={{ margin: '16px 0', borderColor: '#eee' }} />
                <h3 style={{ fontSize: '18px', color: '#900000', fontWeight: 800, marginBottom: '8px' }}>
                  Kerala Rains LIVE: Death Toll at 15
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5 }}>
                  Red alert issued across 4 northern districts as heavy downpours trigger landslides...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
