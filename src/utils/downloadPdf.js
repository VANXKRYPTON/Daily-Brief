import { jsPDF } from 'jspdf';

/**
 * Generates and downloads a formatted PDF for The Daily Brief Digital Edition.
 * @param {number} pageNum Current page number selected in reader
 */
export function downloadDigitalEditionPDF(pageNum = 1) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Color Palette
    const colorPrimary = '#111827';
    const colorAccent = '#059669'; // Emerald
    const colorCrimson = '#dc2626';
    const colorMuted = '#4b5563';
    const colorBorder = '#cbd5e1';

    // 1. Top Sub-header Bar
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorMuted);
    doc.text('GLOBAL DIGITAL EDITION', margin, 15);
    doc.text('MONDAY, AUGUST 3, 2026', pageWidth / 2, 15, { align: 'center' });
    doc.text('VOL. XII NO. 214', pageWidth - margin, 15, { align: 'right' });

    // Top Rule Line
    doc.setDrawColor(colorPrimary);
    doc.setLineWidth(0.5);
    doc.line(margin, 18, pageWidth - margin, 18);

    // 2. Main Newspaper Masthead Title
    doc.setFont('times', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(colorPrimary);
    doc.text('THE DAILY BRIEF', pageWidth / 2, 32, { align: 'center' });

    // Tagline & Subscriber Badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorAccent);
    doc.text('SUBSCRIBER EXCLUSIVE REPLICA EDITION', pageWidth / 2, 37, { align: 'center' });

    // Double Rule Lines below Header
    doc.setLineWidth(0.8);
    doc.setDrawColor(colorPrimary);
    doc.line(margin, 41, pageWidth - margin, 41);
    doc.setLineWidth(0.2);
    doc.line(margin, 42.5, pageWidth - margin, 42.5);

    // 3. Layout Grid Setup (Column 1: Main Story 115mm, Column 2: Sidebar 60mm)
    const col1X = margin;
    const col1Width = 115;
    const col2X = margin + col1Width + 5;
    const col2Width = contentWidth - col1Width - 5;

    // Vertical Divider Line between columns
    doc.setDrawColor(colorBorder);
    doc.setLineWidth(0.3);
    doc.line(col2X - 2.5, 47, col2X - 2.5, pageHeight - 25);

    // --- LEFT COLUMN: MAIN LEAD ARTICLE ---
    let yPos = 50;

    // Category Tag
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colorAccent);
    doc.text(`FRONT PAGE FEATURE • PAGE ${pageNum}`, col1X, yPos);
    yPos += 6;

    // Lead Headline
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(colorPrimary);
    const headlineText = 'The Architecture of Tomorrow: Next-Gen Compute Models Shift Global Tech Power';
    const splitHeadline = doc.splitTextToSize(headlineText, col1Width);
    doc.text(splitHeadline, col1X, yPos);
    yPos += (splitHeadline.length * 7) + 2;

    // Byline
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(colorMuted);
    doc.text('By Dr. Aris Thorne • Senior Tech & Geopolitics Correspondent', col1X, yPos);
    yPos += 6;

    // Lead Paragraph
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor('#1f2937');
    const leadP1 = "Across cleanrooms in Silicon Saxony and Hsinchu, semiconductor physics is reaching its theoretical boundaries as 2nm nodes enter high-volume production. The race for AI compute dominance has shifted from raw floating-point operations to energy efficiency, high-bandwidth memory integration, and 3D chiplet stacking.";
    const splitP1 = doc.splitTextToSize(leadP1, col1Width);
    doc.text(splitP1, col1X, yPos);
    yPos += (splitP1.length * 5) + 6;

    // Simulated Image / Diagram Box
    doc.setFillColor('#f1f5f9');
    doc.setDrawColor(colorBorder);
    doc.rect(col1X, yPos, col1Width, 42, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colorMuted);
    doc.text(`[ BroadSheet High-Res Press Image — Page ${pageNum} ]`, col1X + (col1Width / 2), yPos + 18, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Wafer fabrication equipment testing extreme ultraviolet lithography at sub-2nm scale.', col1X + (col1Width / 2), yPos + 26, { align: 'center' });
    yPos += 48;

    // Paragraph 2
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const leadP2 = "State-backed sovereign wealth funds are committing over $120 billion to secure domestic supply chains. Meanwhile, photonics and optical interconnects are replacing traditional copper traces inside data center racks, promising 10x reductions in latency and power draw.";
    const splitP2 = doc.splitTextToSize(leadP2, col1Width);
    doc.text(splitP2, col1X, yPos);
    yPos += (splitP2.length * 4.8) + 6;

    // Secondary Lead in Col 1
    doc.setDrawColor(colorBorder);
    doc.line(col1X, yPos, col1X + col1Width, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colorCrimson);
    doc.text('LEGAL & GOVERNANCE', col1X, yPos);
    yPos += 5;

    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colorPrimary);
    const head2 = 'Brij Bhushan Sharan Singh Acquitted in High-Profile Wrestling Federation Case';
    const splitHead2 = doc.splitTextToSize(head2, col1Width);
    doc.text(splitHead2, col1X, yPos);
    yPos += (splitHead2.length * 5.5) + 3;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor('#334155');
    const p3 = "A Delhi court has acquitted former WFI chief Brij Bhushan Sharan Singh and co-accused Vinod Tomar, citing lack of corroborative evidence. The verdict marks a pivotal moment in the 18-month judicial proceedings...";
    const splitP3 = doc.splitTextToSize(p3, col1Width);
    doc.text(splitP3, col1X, yPos);


    // --- RIGHT COLUMN: SIDEBAR & ESSENTIAL BRIEFS ---
    let yPos2 = 50;

    // Section 1: Transcontinental Supergrids
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorAccent);
    doc.text('ENERGY & INFRASTRUCTURE', col2X, yPos2);
    yPos2 += 5;

    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(colorPrimary);
    const sideHead1 = 'Transcontinental Supergrids Linking Continents';
    const splitSide1 = doc.splitTextToSize(sideHead1, col2Width);
    doc.text(splitSide1, col2X, yPos2);
    yPos2 += (splitSide1.length * 5) + 2;

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor('#334155');
    const sideBody1 = 'High-voltage subsea DC cables linking North Africa to Southern Europe promise round-the-clock solar generation balancing European grid demand.';
    const splitSideBody1 = doc.splitTextToSize(sideBody1, col2Width);
    doc.text(splitSideBody1, col2X, yPos2);
    yPos2 += (splitSideBody1.length * 4.2) + 6;

    // Horizontal Rule
    doc.setDrawColor(colorBorder);
    doc.line(col2X, yPos2, col2X + col2Width, yPos2);
    yPos2 += 6;

    // Section 2: Autonomous Freight
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorAccent);
    doc.text('MARITIME & MOBILITY', col2X, yPos2);
    yPos2 += 5;

    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(colorPrimary);
    const sideHead2 = 'Autonomous Freight Ships Complete Maiden Transpacific Voyage';
    const splitSide2 = doc.splitTextToSize(sideHead2, col2Width);
    doc.text(splitSide2, col2X, yPos2);
    yPos2 += (splitSide2.length * 5) + 2;

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor('#334155');
    const sideBody2 = 'Electric cargo vessels guided by satellite telemetry have docked in Long Beach after 14 days unmanned at sea, setting zero-emission maritime milestones.';
    const splitSideBody2 = doc.splitTextToSize(sideBody2, col2Width);
    doc.text(splitSideBody2, col2X, yPos2);
    yPos2 += (splitSideBody2.length * 4.2) + 6;

    // Horizontal Rule
    doc.setDrawColor(colorBorder);
    doc.line(col2X, yPos2, col2X + col2Width, yPos2);
    yPos2 += 6;

    // Section 3: SC Hearing
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorCrimson);
    doc.text('SUPREME COURT BRIEF', col2X, yPos2);
    yPos2 += 5;

    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(colorPrimary);
    const sideHead3 = 'SC Urgently Hears July 20 Violence Plea';
    const splitSide3 = doc.splitTextToSize(sideHead3, col2Width);
    doc.text(splitSide3, col2X, yPos2);
    yPos2 += (splitSide3.length * 5) + 2;

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    const sideBody3 = 'Apex court agrees to establish national guidelines on event organizer accountability following safety breaches.';
    const splitSideBody3 = doc.splitTextToSize(sideBody3, col2Width);
    doc.text(splitSideBody3, col2X, yPos2);


    // --- FOOTER BAR ---
    doc.setDrawColor(colorPrimary);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colorMuted);
    doc.text(`THE DAILY BRIEF DIGITAL REPLICA • PAGE ${pageNum} OF 16`, margin, pageHeight - 10);
    doc.text('SUBSCRIBER EDITION — STRICTLY NOT FOR REDISTRIBUTION', pageWidth - margin, pageHeight - 10, { align: 'right' });

    // Save PDF
    doc.save(`Daily_Brief_Digital_Edition_Page_${pageNum}.pdf`);
    return true;
  } catch (err) {
    console.error('Error generating Digital Edition PDF:', err);
    alert('Failed to generate PDF download. Please try again.');
    return false;
  }
}
