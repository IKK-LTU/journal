import styled from '@emotion/styled';

// ─── Design tokens ────────────────────────────────────────────────────────────

const light = {
  bg:       '#F6F4F0',
  ink:      '#1D1C1A',
  accent:   '#5A7A5C',
  quiet:    '#8A8783',
  line:     '#DED9D2',
  card:     '#FFFFFF',
  accentBg: '#EBF1EB',
};

const dark = {
  bg:       '#131210',
  ink:      '#EAE7E2',
  accent:   '#6E9870',
  quiet:    '#7A7874',
  line:     '#2A2820',
  card:     '#1C1A17',
  accentBg: '#1C2A1C',
};

const fonts = {
  display: "'Iowan Old Style', 'Apple Garamond', Baskerville, Georgia, serif",
  body:    "'Geologica', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const bp = {
  mobile: '@media (max-width: 540px)',
  small:  '@media (max-width: 480px)',
  tiny:   '@media (max-width: 420px)',
};

// ─── Root — sets CSS custom properties, inherits to all children ──────────────

export const Root = styled.div`
  --c-bg:       ${light.bg};
  --c-ink:      ${light.ink};
  --c-accent:   ${light.accent};
  --c-quiet:    ${light.quiet};
  --c-line:     ${light.line};
  --c-card:     ${light.card};
  --c-accent-bg: ${light.accentBg};

  @media (prefers-color-scheme: dark) {
    --c-bg:       ${dark.bg};
    --c-ink:      ${dark.ink};
    --c-accent:   ${dark.accent};
    --c-quiet:    ${dark.quiet};
    --c-line:     ${dark.line};
    --c-card:     ${dark.card};
    --c-accent-bg: ${dark.accentBg};
  }

  position: relative;
  overflow: hidden;
  background: var(--c-bg);
  color: var(--c-ink);
  font-family: ${fonts.body};
  font-size: 17px;
  line-height: 1.65;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// ─── Background SVG ───────────────────────────────────────────────────────────

export const BgSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  color: var(--c-accent);
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

export const Wrap = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
`;

// ─── Nav ──────────────────────────────────────────────────────────────────────

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--c-line);
  padding: 20px 0;
  background: var(--c-bg);
`;

export const NavInner = styled(Wrap)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavBrand = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-ink);
`;

export const NavLink = styled.button`
  font-family: ${fonts.body};
  font-size: 14px;
  color: var(--c-accent);
  background: none;
  border: none;
  border-bottom: 1px solid currentColor;
  padding: 0 0 1px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.7; }

  &:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const PageMain = styled.main`
  position: relative;
`;

export const Hero = styled.section`
  padding: 80px 0 64px;
`;

export const HeroHeadline = styled.h1`
  font-family: ${fonts.display};
  font-size: clamp(30px, 5.5vw, 50px);
  font-weight: 400;
  line-height: 1.18;
  letter-spacing: -0.015em;
  text-wrap: balance;
  color: var(--c-ink);
  max-width: 580px;
  margin: 0 0 20px;
`;

export const HeroSub = styled.p`
  font-size: 18px;
  color: var(--c-quiet);
  max-width: 500px;
  line-height: 1.6;
  margin: 0 0 48px;
`;

// ─── Entry preview cards ──────────────────────────────────────────────────────

export const CardsPreview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  ${bp.mobile} { grid-template-columns: 1fr; }
`;

export const EntryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--c-card);
  border: 1px solid var(--c-line);
  border-radius: 4px;
`;

interface EntryTagProps {
  variant: 'difficult' | 'good';
}

export const EntryTag = styled.span<EntryTagProps>`
  display: inline-block;
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.4;
  padding: 3px 7px;
  border-radius: 2px;
  background: ${({ variant }) =>
    variant === 'difficult' ? 'var(--c-accent-bg)' : 'transparent'};
  color: ${({ variant }) =>
    variant === 'difficult' ? 'var(--c-accent)' : 'var(--c-quiet)'};
  border: ${({ variant }) =>
    variant === 'good' ? '1px solid var(--c-line)' : 'none'};
`;

export const EntrySituation = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: var(--c-ink);
  font-style: italic;
`;

export const EntryChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

interface ChipProps {
  variant?: 'emotion' | 'distortion';
}

export const Chip = styled.span<ChipProps>`
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  padding: 2px 7px;
  line-height: 1.6;
  border-radius: 2px;
  background: var(--c-bg);
  border: 1px solid var(--c-line);
  color: ${({ variant }) =>
    variant === 'distortion' ? 'var(--c-quiet)' : 'var(--c-ink)'};
`;

export const EntryFooter = styled.p`
  font-size: 12px;
  font-style: italic;
  line-height: 1.5;
  color: var(--c-quiet);
  border-top: 1px solid var(--c-line);
  padding-top: 10px;
  margin: 0;
`;

// ─── Hero actions ─────────────────────────────────────────────────────────────

export const HeroActions = styled.div`
  margin-bottom: 48px;
`;

// ─── Insight ──────────────────────────────────────────────────────────────────

export const Insight = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 72px 0;
  border-top: 1px solid var(--c-line);

  p {
    max-width: 58ch;
    font-size: 17px;
    line-height: 1.72;
    color: var(--c-ink);
    margin: 0;
  }
`;

// ─── Shared section heading ───────────────────────────────────────────────────

export const SectionHead = styled.h2`
  font-family: ${fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-quiet);
  margin: 0 0 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--c-line);
`;

// ─── Cognitive distortions ────────────────────────────────────────────────────

export const Distortions = styled.section`
  padding: 72px 0;
  border-top: 1px solid var(--c-line);
`;

export const DistortionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--c-line);
  border: 1px solid var(--c-line);
  margin-bottom: 20px;

  ${bp.small} { grid-template-columns: 1fr; }
`;

export const DistortionBlock = styled.div`
  background: var(--c-card);
  padding: 20px 22px;

  svg {
    color: var(--c-quiet);
    margin-bottom: 12px;
    display: block;
    opacity: 0.7;
  }

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--c-ink);
    margin: 0 0 5px;
    line-height: 1.3;
  }

  p {
    font-size: 13px;
    color: var(--c-quiet);
    line-height: 1.55;
    margin: 0;
  }
`;

export const DistortionsNote = styled.p`
  font-size: 14px;
  color: var(--c-quiet);
  max-width: 55ch;
  line-height: 1.65;
  margin: 0;
`;

// ─── Two modes ────────────────────────────────────────────────────────────────

export const Modes = styled.section`
  padding: 72px 0;
  border-top: 1px solid var(--c-line);
`;

export const ModesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  ${bp.small} {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const ModeLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--c-ink);
  margin: 0 0 10px;
  line-height: 1.3;
`;

export const ModeBody = styled.p`
  font-size: 15px;
  color: var(--c-quiet);
  line-height: 1.65;
  margin: 0;
`;

export const ModeTime = styled.p`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--c-accent);
  margin: 12px 0 0;
`;

// ─── CTA ──────────────────────────────────────────────────────────────────────

export const CtaBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 72px 0 96px;
  border-top: 1px solid var(--c-line);
`;

export const CtaLine = styled.p`
  font-family: ${fonts.display};
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 400;
  line-height: 1.3;
  color: var(--c-ink);
  text-wrap: balance;
  max-width: 480px;
  margin: 0;
`;

export const CtaBtn = styled.button`
  display: inline-block;
  align-self: flex-start;
  font-family: ${fonts.body};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #F5F2ED;
  background: var(--c-accent);
  border: none;
  border-radius: 4px;
  padding: 16px 36px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.85; }

  &:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 3px;
  }

  ${bp.tiny} {
    align-self: stretch;
    text-align: center;
  }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const Footer = styled.footer`
  position: relative;
  border-top: 1px solid var(--c-line);
  padding: 24px 0;
`;

export const FooterInner = styled(Wrap)`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const FooterBrand = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-ink);
`;

export const FooterQuiet = styled.span`
  font-size: 13px;
  color: var(--c-quiet);
`;

// ─── Theory cards ─────────────────────────────────────────────────────────────

export const Theories = styled.section`
  padding: 72px 0;
  border-top: 1px solid var(--c-line);
`;

export const TheoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  ${bp.mobile} { grid-template-columns: 1fr; gap: 32px; }
`;

export const TheoryCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
`;

export const TheoryIconWrap = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--c-accent-bg);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TheoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TheoryHeadline = styled.h3`
  font-family: ${fonts.display};
  font-size: 17px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--c-ink);
  margin: 0;
`;

export const TheoryBody = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: var(--c-quiet);
  margin: 0;
`;

// ─── How it works ─────────────────────────────────────────────────────────────

export const HowItWorks = styled.section`
  padding: 72px 0;
  border-top: 1px solid var(--c-line);
`;

export const HowIntro = styled.p`
  font-size: 16px;
  color: var(--c-quiet);
  max-width: 52ch;
  line-height: 1.7;
  margin: 0 0 40px;
`;

export const HowFlow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--c-line);
  border: 1px solid var(--c-line);
  margin-bottom: 32px;

  ${bp.small} { grid-template-columns: 1fr 1fr; }
`;

export const HowStep = styled.div`
  background: var(--c-card);
  padding: 22px 20px 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HowStepNum = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--c-accent);
`;

export const HowStepTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: var(--c-ink);
  margin: 0;
  line-height: 1.3;
`;

export const HowStepBody = styled.p`
  font-size: 13px;
  color: var(--c-quiet);
  line-height: 1.55;
  margin: 0;
`;

export const HowBottom = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 48px;
  align-items: start;
  padding-top: 32px;
  border-top: 1px solid var(--c-line);

  ${bp.mobile} {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const HowRecord = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--c-card);
  border: 1px solid var(--c-line);
  border-radius: 4px;
  width: 300px;

  ${bp.mobile} { width: auto; }
`;

export const HowRecordLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-quiet);
`;

export const HowRecordSituation = styled.p`
  font-size: 13px;
  font-style: italic;
  line-height: 1.55;
  color: var(--c-ink);
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--c-line);
`;

export const HowRecordReframe = styled.p`
  font-family: ${fonts.display};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--c-ink);
  margin: 0;
`;

export const HowRecordScore = styled.span`
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--c-accent);
`;

export const HowNext = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
`;

export const HowNextLine = styled.p`
  font-family: ${fonts.display};
  font-size: clamp(20px, 2.8vw, 28px);
  font-weight: 400;
  line-height: 1.25;
  color: var(--c-ink);
  max-width: 30ch;
  margin: 0;
`;

export const HowNextBody = styled.p`
  font-size: 15px;
  color: var(--c-quiet);
  line-height: 1.7;
  margin: 0;
  max-width: 42ch;
`;

// ─── Trust signals ────────────────────────────────────────────────────────────

export const Trust = styled.section`
  padding: 72px 0;
  border-top: 1px solid var(--c-line);
`;

export const TrustGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;

  ${bp.mobile} {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TrustIconWrap = styled.div`
  color: var(--c-accent);
  display: flex;
  align-items: center;
`;

export const TrustTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: var(--c-ink);
  margin: 0;
`;

export const TrustBody = styled.p`
  font-size: 14px;
  color: var(--c-quiet);
  line-height: 1.6;
  margin: 0;
  max-width: 28ch;

  ${bp.mobile} { max-width: none; }
`;
