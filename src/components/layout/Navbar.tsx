import { Menu, Search, Ticket, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { soundEngine } from '../../lib/soundEngine';
import { useAuthStore } from '../../state/authStore';
import { Magnet } from '../reactbits';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

/**
 * Strictly adheres to the Top Bar Contract while integrating 21st.dev / Shotreel / Landing.love craft:
 * - Top spring-interpolated Scroll Progress Bar
 * - Shared `layoutId="navbar-active-indicator"` spring-gliding route pill
 * - Quick ⌘K Command Console trigger + Responsive mobile drawer
 */
export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const location = useLocation();
  const pass = useAuthStore((s) => s.pass);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  const navItems = [
    { label: 'Exhibition', path: '/' },
    { label: 'Earth Timeline', path: '/earth' },
    { label: 'Specimen Gallery', path: '/gallery' },
    { label: 'Admission Desk', path: '/login' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F2EDE4] border-b-[3px] border-[#0E0E0E] px-6 py-3.5 relative">
      {/* Top Scroll Progress Indicator Bar (landing.love / 21st.dev) */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#FFD400] z-50"
      />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          onClick={() => soundEngine.playClick()}
          className="text-2xl font-bold font-display tracking-tight text-[#0E0E0E] whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>MUSEO</span>
          <span className="hidden sm:inline-block text-[10px] font-mono-tabular font-bold bg-[#0E0E0E] text-[#FFD400] px-1.5 py-0.5 border border-[#0E0E0E]">
            4.6 GA
          </span>
        </Link>

        {/* Zone 2: 4 Concise Single-Line Navigation Links with Shared layoutId Spring Pill */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-semibold font-display text-[#0E0E0E]">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => soundEngine.playClick()}
                className="relative px-3.5 py-1.5 whitespace-nowrap shrink-0 transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#0E0E0E] border-2 border-[#0E0E0E] shadow-[3px_3px_0px_#FFD400] z-0"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive
                      ? 'text-[#FFD400] font-bold'
                      : 'text-[#0E0E0E]/80 hover:text-[#0E0E0E]'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Quick Jump ⌘K Trigger + Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onOpenCommandPalette();
              }}
              aria-label="Open Deep Time Command Console (Ctrl+K)"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-mono-tabular font-bold bg-[#E8E1D5] text-[#0E0E0E] border-2 border-[#0E0E0E] hover:bg-white cursor-pointer whitespace-nowrap"
              title="Quick Jump to Era, Extinction, or Specimen (⌘K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Quick Jump</span>
              <kbd className="px-1 py-0.2 bg-[#0E0E0E] text-[#FFD400] text-[10px]">⌘K</kbd>
            </button>
          )}

          <Magnet padding={28} magnetStrength={4}>
            <Link
              to={pass ? '/earth' : '/login'}
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-display bg-[#FFD400] text-[#0E0E0E] border-[2px] border-[#0E0E0E] shadow-[4px_4px_0px_#0E0E0E] brutal-press whitespace-nowrap shrink-0"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{pass ? `Pass: ${pass.visitorName}` : 'Claim Admission Pass'}</span>
            </Link>
          </Magnet>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen((v) => !v);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 bg-[#0E0E0E] text-[#FFD400] border-2 border-[#0E0E0E] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="md:hidden overflow-hidden border-t-2 border-[#0E0E0E] mt-3 pt-3 flex flex-col gap-2"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    soundEngine.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3.5 py-2.5 text-sm font-bold font-display border-2 border-[#0E0E0E] ${
                    isActive
                      ? 'bg-[#0E0E0E] text-[#FFD400]'
                      : 'bg-white text-[#0E0E0E]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
