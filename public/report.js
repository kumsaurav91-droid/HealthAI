/**
 * Dedicated PDF Generation Module for HealthAI Report
 * Utilizes jsPDF to create a structured health report PDF
 * with diagnostic scores, summary, and disclaimers.
 */

async function downloadReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // 1. DATA COLLECTION
    const mhText = document.getElementById('mh-label')?.innerText || "0%";
    const phText = document.getElementById('ph-label')?.innerText || "0%";
    const status = document.getElementById('status-text')?.innerText || "Clear";
    const date = new Date().toLocaleString();
    const mhScore = parseInt(mhText) || 0;
    const phScore = parseInt(phText) || 0;

    // 2. THEME COLORS
    const bgDark = [10, 10, 12];     // #0A0A0C
    const cardDark = [26, 26, 30];   // #1A1A1E
    const primaryBlue = [59, 130, 246]; 
    const textSlate = [148, 163, 184];

    // 3. PAGE BACKGROUND
    doc.setFillColor(...bgDark);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFillColor(...primaryBlue);
    doc.rect(0, 0, 210, 4, 'F');

    // 4. HEADER & LOGO
    const imgUrl = 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png';
    try {
        doc.addImage(imgUrl, 'PNG', 20, 15, 12, 12);
    } catch(e) {}
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("HEALTHAI", 36, 25);

    // 5. DIAGNOSTIC SECTION
    doc.setFillColor(...cardDark);
    doc.roundedRect(15, 45, 180, 65, 5, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("DIAGNOSTIC SCORES", 25, 60);
    
    // Dynamic Bar Color Logic
    const getBarColor = (s) => (s >= 70 ? [239, 68, 68] : (s >= 35 ? [249, 115, 22] : [34, 197, 94]));

    // Mental Bar
    doc.setFontSize(10);
    doc.setTextColor(...textSlate);
    doc.text(`Mental Stress: ${mhText}`, 25, 75);
    doc.setFillColor(51, 65, 85); 
    doc.roundedRect(25, 78, 160, 2, 1, 1, 'F');
    doc.setFillColor(...getBarColor(mhScore));
    doc.roundedRect(25, 78, (mhScore / 100) * 160, 2, 1, 1, 'F');

    // Physical Bar
    doc.text(`Physical Risk: ${phText}`, 25, 95);
    doc.setFillColor(51, 65, 85);
    doc.roundedRect(25, 98, 160, 2, 1, 1, 'F');
    doc.setFillColor(...getBarColor(phScore));
    doc.roundedRect(25, 98, (phScore / 100) * 160, 2, 1, 1, 'F');

    // 6. REPORT SUMMARY WITH BORDER
    doc.setDrawColor(51, 65, 85);
    doc.setFillColor(...cardDark);
    doc.roundedRect(15, 115, 180, 60, 5, 5, 'FD'); 
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("REPORT SUMMARY", 25, 130);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textSlate);
    doc.text(`• AI-NLP Analysis indicates a ${mhScore}% mental stress probability.`, 25, 142);
    doc.text(`• Clinical screening identifies a ${phScore}% physical risk factor.`, 25, 150);
    doc.text(`• Overall health classification: ${status.toUpperCase()}.`, 25, 158);
    doc.text("• Data processed via Gemini 2.5 Flash-Lite Research Node.", 25, 166);

    // 7. FOOTER SECTION
    // Border for the footer area
    doc.setDrawColor(31, 41, 55);
    doc.line(15, 260, 195, 260);

    // Notice text
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    const notice = "NOTICE: Research output aligned with UN SDG 3. This is not a clinical diagnosis. Please share with a healthcare professional.";
    doc.text(doc.splitTextToSize(notice, 140), 15, 270);

    // Formal Signature (Bottom Right)
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "italic");
    doc.text("Developed & Designed by", 150, 270);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SAURAV KUMAR", 150, 275);

    // Metadata
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(`ID: HAI-${Math.floor(Math.random() * 900000)} | ${date}`, 15, 285);

    // 8. SAVE
    doc.save(`HealthAI_Report.pdf`);
}