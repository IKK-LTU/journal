import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/routes';
import {
  Root, BgSvg, Wrap,
  Nav, NavInner, NavBrand, NavLink,
  PageMain, Hero, HeroHeadline, HeroSub,
  CardsPreview, EntryCard, EntryTag, EntrySituation, EntryChips, Chip, EntryFooter,
  Insight,
  SectionHead,
  Distortions, DistortionsGrid, DistortionBlock, DistortionsNote,
  Modes, ModesGrid, ModeLabel, ModeBody, ModeTime,
  CtaBlock, CtaLine, CtaBtn,
  Footer, FooterInner, FooterBrand, FooterQuiet,
} from './welcome.styles';

const Welcome = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate(ROUTES.LOGIN.path);

  return (
    <Root>

      {/* Three organic curves that traverse the full page height */}
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

        <Hero>
          <Wrap>
            <HeroHeadline>
              The thought that's been on your mind — it's worth a second look.
            </HeroHeadline>
            <HeroSub>
              A journal for two kinds of moments: when something's weighing on you,
              and when something's worth remembering.
            </HeroSub>

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

        <Distortions>
          <Wrap>
            <SectionHead>Patterns your brain runs on autopilot</SectionHead>
            <DistortionsGrid>
              <DistortionBlock>
                <h3>All-or-nothing thinking</h3>
                <p>If it wasn't perfect, it was a failure.</p>
              </DistortionBlock>
              <DistortionBlock>
                <h3>Catastrophizing</h3>
                <p>The worst possible outcome feels like the most likely one right now.</p>
              </DistortionBlock>
              <DistortionBlock>
                <h3>Mind reading</h3>
                <p>You're already certain you know what they were thinking.</p>
              </DistortionBlock>
              <DistortionBlock>
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
