import { Check, Copy, Download, Scissors, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BRAND_TAGLINE, EVOLUTION_STAGES, getEntityById } from '../../data';
import { QUIZ_QUESTIONS } from '../../data/toursAndQuiz';
import { soundEngine } from '../../lib/soundEngine';
import { useAuthStore } from '../../state/authStore';
import { useStudyStore } from '../../state/studyStore';
import { Button } from './Button';

/**
 * Act 4: Exit & Shareable Ticket Stub PNG Generator
 * Renders a high-DPI (2x retina) Bauhaus souvenir admission stub onto an HTML5 Canvas
 * with perforated tear geometry, crimson ADMITTED stamp, Golden Ammonite collector seal,
 * eras explored, specimens bookmarked, and one-click PNG download.
 */
export function ShareableTicketStub() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    pass,
    isTicketTorn,
    tearTicket,
    hasGoldenAmmoniteSticker,
    issuePass
  } = useAuthStore();
  const { visitedStages, bookmarkedIds, quizBestScore } = useStudyStore();
  const [copied, setCopied] = useState(false);

  const holderName = pass?.visitorName || 'Archival Explorer';
  const holderRole = pass?.visitorRole || 'Student Researcher';
  const serialCode = pass?.ticketCode || 'DT-4600-4600MA';
  const issuedDate =
    pass?.issuedAt ||
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 960;
    const h = 420;
    canvas.width = w;
    canvas.height = h;

    // 1. Background Studio Matte Frame
    ctx.fillStyle = '#0E0E0E';
    ctx.fillRect(0, 0, w, h);

    // Subtle architectural grid lines in background
    ctx.strokeStyle = 'rgba(242, 237, 228, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const ticketX = 36;
    const ticketY = 36;
    const mainWidth = 650;
    const stubWidth = 218;
    const ticketH = 348;

    // 2. Hard Offset Shadow behind Main Ticket
    ctx.fillStyle = '#FFD400';
    ctx.fillRect(ticketX + 10, ticketY + 10, mainWidth, ticketH);

    // 3. Main Ticket Paper Body
    ctx.fillStyle = '#F2EDE4';
    ctx.fillRect(ticketX, ticketY, mainWidth, ticketH);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0E0E0E';
    ctx.strokeRect(ticketX, ticketY, mainWidth, ticketH);

    // Top Black Header Band on Main Ticket
    ctx.fillStyle = '#0E0E0E';
    ctx.fillRect(ticketX, ticketY, mainWidth, 58);

    ctx.fillStyle = '#FFD400';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.fillText('MUSEO // MUSEUM OF DEEP TIME', ticketX + 24, ticketY + 36);

    ctx.fillStyle = '#F2EDE4';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(serialCode, ticketX + mainWidth - 150, ticketY + 35);

    // Official Tagline Strip
    ctx.fillStyle = '#E8E1D5';
    ctx.fillRect(ticketX + 3, ticketY + 58, mainWidth - 6, 32);
    ctx.fillStyle = '#0E0E0E';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(BRAND_TAGLINE, ticketX + 24, ticketY + 79);

    // Visitor Holder & Role
    ctx.fillStyle = '#4A4742';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('VISITOR / FELLOW', ticketX + 24, ticketY + 122);
    ctx.fillText('CURATORIAL TRACK', ticketX + 330, ticketY + 122);

    ctx.fillStyle = '#0E0E0E';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillText(holderName.slice(0, 22), ticketX + 24, ticketY + 152);

    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.fillText(holderRole, ticketX + 330, ticketY + 150);

    // Divider Line
    ctx.strokeStyle = '#0E0E0E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ticketX + 24, ticketY + 172);
    ctx.lineTo(ticketX + mainWidth - 24, ticketY + 172);
    ctx.stroke();

    // 5 Era Checkboxes / Stratigraphic Progress
    ctx.fillStyle = '#4A4742';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(
      `STRATIGRAPHIC ERAS EXPLORED (${visitedStages.length}/${EVOLUTION_STAGES.length})`,
      ticketX + 24,
      ticketY + 198
    );

    EVOLUTION_STAGES.forEach((st, idx) => {
      const boxX = ticketX + 24 + idx * 120;
      const boxY = ticketY + 210;
      const visited = visitedStages.includes(st.id);

      ctx.fillStyle = visited ? '#0E0E0E' : '#E8E1D5';
      ctx.fillRect(boxX, boxY, 110, 34);
      ctx.strokeStyle = '#0E0E0E';
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, 110, 34);

      ctx.fillStyle = visited ? '#FFD400' : '#4A4742';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(`${st.index} ${st.name.split('–')[0]}`, boxX + 8, boxY + 21);
    });

    // Bookmarked Specimens & Quiz Telemetry
    const topSpecimens = bookmarkedIds
      .slice(0, 3)
      .map((id) => getEntityById(id)?.accessionNumber || id)
      .join(' · ');

    ctx.fillStyle = '#4A4742';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('ARCHIVAL SPECIMENS LOGGED', ticketX + 24, ticketY + 276);
    ctx.fillStyle = '#0E0E0E';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(
      `${bookmarkedIds.length}/20 Collected (${topSpecimens || 'None yet'})`,
      ticketX + 24,
      ticketY + 298
    );

    ctx.fillStyle = '#4A4742';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('MASTERY QUIZ', ticketX + 24, ticketY + 324);
    ctx.fillStyle = '#0E0E0E';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(
      quizBestScore !== null
        ? `${quizBestScore}/${QUIZ_QUESTIONS.length} Verified`
        : 'Not Attempted Yet',
      ticketX + 135,
      ticketY + 324
    );

    // 4. Crimson Rotated "ADMITTED // 4.6 GA" Rubber Stamp
    ctx.save();
    ctx.translate(ticketX + 515, ticketY + 285);
    ctx.rotate(-0.18);
    ctx.strokeStyle = '#D9381E';
    ctx.lineWidth = 4;
    ctx.strokeRect(-92, -32, 184, 64);
    ctx.strokeStyle = '#D9381E';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-86, -26, 172, 52);
    ctx.fillStyle = '#D9381E';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ADMITTED // 4.6 GA', 0, -3);
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`STAMPED · ${issuedDate.toUpperCase()}`, 0, 16);
    ctx.restore();

    // 5. Golden Ammonite Collector Sticker (if 5-click Robot Easter Egg unlocked)
    if (hasGoldenAmmoniteSticker) {
      ctx.save();
      ctx.translate(ticketX + 575, ticketY + 135);
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD400';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#0E0E0E';
      ctx.stroke();

      // Spiral Ammonite Motif
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 4.5; a += 0.2) {
        const r = a * 1.65;
        const sx = Math.cos(a) * r;
        const sy = Math.sin(a) * r;
        if (a === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = '#0E0E0E';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.fillStyle = '#0E0E0E';
      ctx.font = 'bold 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GOLDEN AMMONITE', 0, 28);
      ctx.restore();
    }

    // 6. Perforated Right-Hand Ticket Stub (shifts & tilts if torn!)
    ctx.save();
    const stubOriginX = ticketX + mainWidth + (isTicketTorn ? 18 : 0);
    const stubOriginY = ticketY + (isTicketTorn ? 8 : 0);
    ctx.translate(stubOriginX, stubOriginY);
    if (isTicketTorn) {
      ctx.rotate(0.055);
    }

    ctx.fillStyle = '#FFD400';
    ctx.fillRect(0, 0, stubWidth, ticketH);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0E0E0E';
    ctx.strokeRect(0, 0, stubWidth, ticketH);

    // Perforation notches along left edge of stub
    ctx.fillStyle = '#0E0E0E';
    for (let py = 14; py < ticketH - 10; py += 20) {
      ctx.beginPath();
      ctx.arc(0, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#0E0E0E';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(isTicketTorn ? 'DETACHED STUB' : 'PERFORATED STUB', 22, 38);

    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText('4,600 Ma → 0 Ma', 22, 72);

    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`CODE: ${serialCode}`, 22, 106);
    ctx.fillText(`DATE: ${issuedDate}`, 22, 126);
    ctx.fillText(`ERAS: ${visitedStages.length} / 5`, 22, 146);

    // Procedural Barcode Bars on Stub
    for (let bx = 22; bx < stubWidth - 22; bx += 6) {
      const barW = (bx * 7) % 5 === 0 ? 4 : 2;
      ctx.fillRect(bx, 185, barW, 115);
    }

    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('MUSEO ARCHIVE PASS', 22, 322);
    ctx.restore();
  }, [
    holderName,
    holderRole,
    serialCode,
    issuedDate,
    visitedStages,
    bookmarkedIds,
    quizBestScore,
    isTicketTorn,
    hasGoldenAmmoniteSticker
  ]);

  const handleDownloadPng = () => {
    soundEngine.playStamp();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `MUSEO-Ticket-${serialCode}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopySummary = () => {
    soundEngine.playClick();
    const summary = `MUSEO — Museum of Deep Time Pass (${serialCode}) | Holder: ${holderName} (${holderRole}) | Eras Explored: ${visitedStages.length}/5 | Specimens Logged: ${bookmarkedIds.length}/20 | ${BRAND_TAGLINE}`;
    navigator.clipboard?.writeText(summary).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleTearStub = () => {
    if (!pass) {
      issuePass('Archival Explorer', 'Student Researcher');
    }
    soundEngine.playPaperTear();
    tearTicket();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono-tabular font-bold text-[#4A4742]">
            ACT 4 · PERSONAL SOUVENIR ADMISSION STUB
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Shareable Deep Time Ticket Stub (PNG)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isTicketTorn && (
            <Button
              variant="secondary"
              size="sm"
              data-cursor-label="TEAR"
              onClick={handleTearStub}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Tear Perforated Stub</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopySummary}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied' : 'Copy Visit Summary'}</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            data-cursor-label="STAMP"
            onClick={handleDownloadPng}
          >
            <Download className="w-4 h-4" />
            <span>Download Ticket PNG</span>
          </Button>
        </div>
      </div>

      {/* Live Rendered High-DPI Canvas Preview */}
      <div className="w-full overflow-x-auto border-[3px] border-[#0E0E0E] shadow-[6px_6px_0px_#0E0E0E] bg-[#0E0E0E] p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-w-[960px] mx-auto block"
          aria-label="Personalized MUSEO Deep Time Ticket Stub Preview"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#4A4742]">
        <span>
          Status: {isTicketTorn ? 'Stub Detached ✓' : 'Perforated Stub Intact'} ·{' '}
          {hasGoldenAmmoniteSticker
            ? '★ Golden Ammonite Easter Egg Seal Unlocked!'
            : 'Tip: Click the 3D Robot Docent 5 times at the Ticket Desk to unlock a secret seal.'}
        </span>
        <span className="inline-flex items-center gap-1 font-bold text-[#0E0E0E]">
          <Sparkles className="w-3.5 h-3.5" />
          960×420 Archival PNG
        </span>
      </div>
    </div>
  );
}
