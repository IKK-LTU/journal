import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, Sprout, RotateCcw, Flame, Sparkles, GitBranch, Divide, TrendingDown, MessageCircle, Scale } from 'lucide-react';
import { ROUTES } from '@/router/routes';
import {
  Root, BgSvg, Wrap,
  Nav, NavInner, NavBrand, NavLink,
  PageMain, Hero, HeroHeadline, HeroSub, HeroActions,
  CardsPreview, EntryCard, EntryTag, EntrySituation, EntryChips, Chip, EntryFooter,
  Theories, TheoriesGrid, TheoryCard, TheoryIconWrap, TheoryContent, TheoryHeadline, TheoryBody,
  HowItWorks, HowIntro, HowFlow, HowStep, HowStepNum, HowStepTitle, HowStepBody,
  HowBottom, HowRecord, HowRecordLabel, HowRecordSituation, HowRecordReframe, HowRecordScore, HowNext, HowNextLine, HowNextBody,
  Insight,
  SectionHead,
  Distortions, DistortionsGrid, DistortionBlock, DistortionsNote,
  Modes, ModesGrid, ModeLabel, ModeBody, ModeTime,
  Trust, TrustGrid, TrustItem, TrustIconWrap, TrustTitle, TrustBody,
  CtaBlock, CtaLine, CtaBtn,
  Footer, FooterInner, FooterBrand, FooterQuiet,
} from './welcome.styles';

const Welcome = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate(ROUTES.LOGIN.path);

  return (
    <Root>

      <BgSvg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M -8 10 C 18 22, 62 16, 54 38 C 46 58, 10 54, 28 72 C 46 89, 80 84, 65 108"
          stroke="currentColor" strokeWidth="1" fill="none"
          opacity={0.14} vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 108 6 C 80 18, 36 10, 50 34 C 62 54, 92 50, 74 70 C 56 88, 20 84, 38 108"
          stroke="currentColor" strokeWidth="1" fill="none"
          opacity={0.09} vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 44 -6 C 70 14, 84 36, 60 54 C 36 72, 16 68, 38 88 C 56 104, 82 96, 68 118"
          stroke="currentColor" strokeWidth="1" fill="none"
          opacity={0.06} vectorEffect="non-scaling-stroke"
        />
      </BgSvg>

      <Nav aria-label="Site navigation">
        <NavInner>
          <NavBrand>Joyful Thoughts</NavBrand>
          <NavLink onClick={goToLogin}>Start journaling</NavLink>
        </NavInner>
      </Nav>

      <PageMain>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero>
          <Wrap>
            <HeroHeadline>
              The thought that's been on your mind — it's worth a second look.
            </HeroHeadline>
            <HeroSub>
              A journal for two kinds of moments: when something's weighing on you,
              and when something's worth remembering.
            </HeroSub>

            <HeroActions>
              <CtaBtn onClick={goToLogin}>Start journaling</CtaBtn>
            </HeroActions>

            <CardsPreview>
              <EntryCard>
                <EntryTag variant="difficult">Difficult moment</EntryTag>
                <EntrySituation>
                  "I presented my work and no one reacted. The whole meeting felt
                  off — I must have said something wrong."
                </EntrySituation>
                <EntryChips>
                  <Chip variant="emotion">Anxiety · 78</Chip>
                  <Chip variant="distortion">Mind reading</Chip>
                </EntryChips>
                <EntryFooter>Step 4 of 7 — What pattern is at play?</EntryFooter>
              </EntryCard>

              <EntryCard>
                <EntryTag variant="good">Good moment</EntryTag>
                <EntrySituation>
                  "My sister called just to check in. We talked for an hour
                  without realising it."
                </EntrySituation>
                <EntryChips>
                  <Chip variant="emotion">Warmth · 84</Chip>
                </EntryChips>
                <EntryFooter>It reminded me I'm not navigating this alone.</EntryFooter>
              </EntryCard>
            </CardsPreview>
          </Wrap>
        </Hero>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <HowItWorks>
          <Wrap>
            <SectionHead>How it works</SectionHead>
            <HowIntro>
              Without a journal, the same thought loops for days — same trigger,
              same spiral, nothing new learned. With one entry, the work is done once.
              The next time that moment comes up, the reframe is already there.
            </HowIntro>
            <HowFlow>
              <HowStep>
                <HowStepNum>01</HowStepNum>
                <HowStepTitle>Something weighs on you</HowStepTitle>
                <HowStepBody>A comment lands wrong. A worry starts looping. A moment that didn't go the way you hoped.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>02</HowStepNum>
                <HowStepTitle>You write it down</HowStepTitle>
                <HowStepBody>Describe the situation. Name the emotion and rate it. Three sentences is enough to start.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>03</HowStepNum>
                <HowStepTitle>Name the pattern</HowStepTitle>
                <HowStepBody>The journal surfaces the distortion at play — mind reading, catastrophizing, all-or-nothing thinking.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>04</HowStepNum>
                <HowStepTitle>Write the balanced thought</HowStepTitle>
                <HowStepBody>Not forced positivity. Just what's more accurate than what the spiral told you.</HowStepBody>
              </HowStep>
            </HowFlow>

            <HowBottom>
              <HowRecord>
                <HowRecordLabel>Thought record · Jul 14</HowRecordLabel>
                <HowRecordSituation>
                  "I presented my work and no one reacted. The whole meeting felt
                  off — I must have said something wrong."
                </HowRecordSituation>
                <HowRecordReframe>
                  The quiet in that room is just how that team listens.
                  I covered the material. Silence isn't the same as disapproval.
                </HowRecordReframe>
                <EntryChips>
                  <Chip variant="distortion">Mind reading</Chip>
                  <HowRecordScore>Anxiety 78 → 41</HowRecordScore>
                </EntryChips>
              </HowRecord>

              <HowNext>
                <HowNextLine>Same trigger, three weeks later.</HowNextLine>
                <HowNextBody>
                  You open the card. The reframe is right there — you did the hard
                  work once, when you were calm enough to think clearly. This time
                  you just read it. The spiral doesn't get started.
                </HowNextBody>
              </HowNext>
            </HowBottom>
          </Wrap>
        </HowItWorks>

        {/* ── Why it works — 4 archetype theory cards ──────────────────────── */}
        <Theories>
          <Wrap>
            <SectionHead>Why it works for different kinds of minds</SectionHead>
            <TheoriesGrid>

              <TheoryCard>
                <TheoryIconWrap>
                  <RotateCcw size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Your thoughts aren't facts. They're habits.</TheoryHeadline>
                  <TheoryBody>
                    That conversation from Tuesday keeps coming back. You've run through
                    what you said, what they said, what you should have said. The loop
                    isn't giving you new information — it's just running. Writing it down
                    once, naming the thought precisely, is often enough to interrupt it.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <Flame size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>You don't feel better by trying harder to feel better.</TheoryHeadline>
                  <TheoryBody>
                    You've told yourself to stop worrying, calm down, move on. It hasn't
                    worked — and the fact that it hasn't worked makes it worse. Emotions
                    follow thoughts, not willpower. Catch the thought underneath, name the
                    pattern, and the feeling often softens on its own.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <Sparkles size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Good things happen every day. Most don't stick.</TheoryHeadline>
                  <TheoryBody>
                    Ask yourself what went well last Tuesday. You'll struggle — not because
                    nothing happened, but because your brain didn't keep it. Pain archives
                    itself automatically. Joy evaporates. Capturing a good moment in words
                    before it fades is an act against a system wired to notice what went wrong.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <GitBranch size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>The thoughts you practise become the thoughts you have.</TheoryHeadline>
                  <TheoryBody>
                    You've understood what needs to change. You can articulate it. The gap
                    isn't insight — it's repetition. The same thought pathway used repeatedly
                    becomes easier to activate. Writing a reframe, even once, makes the
                    alternative incrementally more available the next time your mind goes looking.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

            </TheoriesGrid>
          </Wrap>
        </Theories>

        {/* ── Insight ──────────────────────────────────────────────────────── */}
        <Insight>
          <Wrap>
            <p>
              Most people only open a mental health app when something is already
              wrong. Over time, the app becomes associated with difficulty — and you
              stop returning. The tool that was supposed to help quietly disappears
              from the routine it was meant to build.
            </p>
            <p>
              When you also capture the good moments, a different picture starts to
              form. Not just the hard days, but the full shape of your weeks. That
              perspective — seeing the pattern clearly — is itself a significant part
              of what CBT is trying to do.
            </p>
          </Wrap>
        </Insight>

        {/* ── Cognitive distortions ─────────────────────────────────────────── */}
        <Distortions>
          <Wrap>
            <SectionHead>Patterns your brain runs on autopilot</SectionHead>
            <DistortionsGrid>
              <DistortionBlock>
                <Divide size={16} strokeWidth={1.5} />
                <h3>All-or-nothing thinking</h3>
                <p>If it wasn't perfect, it was a failure.</p>
              </DistortionBlock>
              <DistortionBlock>
                <TrendingDown size={16} strokeWidth={1.5} />
                <h3>Catastrophizing</h3>
                <p>The worst possible outcome feels like the most likely one right now.</p>
              </DistortionBlock>
              <DistortionBlock>
                <MessageCircle size={16} strokeWidth={1.5} />
                <h3>Mind reading</h3>
                <p>You're already certain you know what they were thinking.</p>
              </DistortionBlock>
              <DistortionBlock>
                <Scale size={16} strokeWidth={1.5} />
                <h3>Should statements</h3>
                <p>There's a rigid rule for how things must go — and you rarely meet it.</p>
              </DistortionBlock>
            </DistortionsGrid>
            <DistortionsNote>
              These are four of the ten cognitive distortions that CBT identifies —
              shortcuts the mind takes that feel like facts. Naming the pattern is most
              of the work. Once you can see it, it loosens.
            </DistortionsNote>
          </Wrap>
        </Distortions>

        {/* ── Two modes ────────────────────────────────────────────────────── */}
        <Modes>
          <Wrap>
            <SectionHead>Two ways to use it</SectionHead>
            <ModesGrid>
              <div>
                <ModeLabel>When something's weighing on you</ModeLabel>
                <ModeBody>
                  Seven guided steps — name the situation, rate the emotion, spot
                  the distortion, challenge it, reframe it. See the intensity change
                  when you reach the end.
                </ModeBody>
                <ModeTime>~5 minutes</ModeTime>
              </div>
              <div>
                <ModeLabel>When something went right</ModeLabel>
                <ModeBody>
                  Three fields: what happened, what you felt, why it mattered. Enough
                  structure to make it real — small enough to actually do it in the moment.
                </ModeBody>
                <ModeTime>~60 seconds</ModeTime>
              </div>
            </ModesGrid>
          </Wrap>
        </Modes>

        {/* ── Trust signals ─────────────────────────────────────────────────── */}
        <Trust>
          <Wrap>
            <SectionHead>Grounded in practice</SectionHead>
            <TrustGrid>
              <TrustItem>
                <TrustIconWrap>
                  <BookOpen size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>Built on CBT</TrustTitle>
                <TrustBody>
                  Cognitive Behavioural Therapy has 50+ years of clinical research.
                  This app applies its core techniques — no new theory, no shortcuts.
                </TrustBody>
              </TrustItem>

              <TrustItem>
                <TrustIconWrap>
                  <Lock size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>Stays on your device</TrustTitle>
                <TrustBody>
                  Your entries are stored only in your browser. Nothing is sent to
                  any server, ever.
                </TrustBody>
              </TrustItem>

              <TrustItem>
                <TrustIconWrap>
                  <Sprout size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>No pressure, no schedule</TrustTitle>
                <TrustBody>
                  Use it when something comes up — a hard moment or a good one.
                  No streaks, no daily commitment required.
                </TrustBody>
              </TrustItem>
            </TrustGrid>
          </Wrap>
        </Trust>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <CtaBlock>
          <Wrap>
            <CtaLine>Thought records. Good moments. One place.</CtaLine>
            <CtaBtn onClick={goToLogin}>Start journaling</CtaBtn>
          </Wrap>
        </CtaBlock>

      </PageMain>

      <Footer>
        <FooterInner>
          <FooterBrand>Joyful Thoughts</FooterBrand>
          <FooterQuiet>A CBT thought journal</FooterQuiet>
        </FooterInner>
      </Footer>

    </Root>
  );
};

export default Welcome;
