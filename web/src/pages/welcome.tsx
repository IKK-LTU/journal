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

      <Nav aria-label="Svetainės navigacija">
        <NavInner>
          <NavBrand>Joyful Thoughts</NavBrand>
          <NavLink onClick={goToLogin}>Pradėti rašyti</NavLink>
        </NavInner>
      </Nav>

      <PageMain>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero>
          <Wrap>
            <HeroHeadline>
              Mintis, kuri neduoda ramybės, verta antro žvilgsnio.
            </HeroHeadline>
            <HeroSub>
              Dienoraštis dviem akimirkoms: kai kažkas slegia ir kai kažką verta prisiminti.
            </HeroSub>

            <HeroActions>
              <CtaBtn onClick={goToLogin}>Pradėti rašyti</CtaBtn>
            </HeroActions>

            <CardsPreview>
              <EntryCard>
                <EntryTag variant="difficult">Sunki akimirka</EntryTag>
                <EntrySituation>
                  „Pristačiau savo darbą ir niekas nesureagavo. Visas susitikimas buvo keistas – turbūt pasakiau kažką ne taip.“
                </EntrySituation>
                <EntryChips>
                  <Chip variant="emotion">Nerimas · 7</Chip>
                  <Chip variant="distortion">Minčių skaitymas</Chip>
                </EntryChips>
                <EntryFooter>Žingsnis 4 iš 7 – kokie mąstymo spąstai čia veikia?</EntryFooter>
              </EntryCard>

              <EntryCard>
                <EntryTag variant="good">Gera akimirka</EntryTag>
                <EntrySituation>
                  „Sesuo paskambino tiesiog pasiteirauti, kaip laikausi. Net nepastebėjome, kaip prakalbėjome valandą.“
                </EntrySituation>
                <EntryChips>
                  <Chip variant="emotion">Šiluma · 8</Chip>
                </EntryChips>
                <EntryFooter>Priminė, kad turiu į ką atsiremti.</EntryFooter>
              </EntryCard>
            </CardsPreview>
          </Wrap>
        </Hero>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <HowItWorks>
          <Wrap>
            <SectionHead>Kaip tai veikia</SectionHead>
            <HowIntro>
              Be dienoraščio ta pati mintis sukasi dienų dienas – tas pats dirgiklis, ta pati spiralė, nieko naujo. Vienas įrašas – ir darbas padarytas. Kai ta akimirka pasikartos, naujas požiūris jau bus po ranka.
            </HowIntro>
            <HowFlow>
              <HowStep>
                <HowStepNum>01</HowStepNum>
                <HowStepTitle>Kažkas slegia</HowStepTitle>
                <HowStepBody>Kažkieno žodžiai užkliuvo. Nerimas ima suktis ratu. Akimirka nepavyko taip, kaip tikėjaisi.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>02</HowStepNum>
                <HowStepTitle>Užrašai</HowStepTitle>
                <HowStepBody>Aprašai situaciją. Įvardiji emociją ir jos stiprumą. Pradžiai užtenka trijų sakinių.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>03</HowStepNum>
                <HowStepTitle>Atpažįsti spąstus</HowStepTitle>
                <HowStepBody>Dienoraštis padeda pastebėti, koks iškraipymas veikia – minčių skaitymas, katastrofizavimas, „viskas arba nieko“ mąstymas.</HowStepBody>
              </HowStep>
              <HowStep>
                <HowStepNum>04</HowStepNum>
                <HowStepTitle>Užrašai subalansuotą mintį</HowStepTitle>
                <HowStepBody>Ne priverstinis pozityvumas. Tiesiog tai, kas tiksliau nei tai, ką kuždėjo spiralė.</HowStepBody>
              </HowStep>
            </HowFlow>

            <HowBottom>
              <HowRecord>
                <HowRecordLabel>Minčių įrašas · liepos 14 d.</HowRecordLabel>
                <HowRecordSituation>
                  „Pristačiau savo darbą ir niekas nesureagavo. Visas susitikimas buvo keistas – turbūt pasakiau kažką ne taip.“
                </HowRecordSituation>
                <HowRecordReframe>
                  Tyla tame kambaryje – tiesiog taip ta komanda klauso. Viską pristačiau. Tyla nėra nepritarimas.
                </HowRecordReframe>
                <EntryChips>
                  <Chip variant="distortion">Minčių skaitymas</Chip>
                  <HowRecordScore>Nerimas 8 → 4</HowRecordScore>
                </EntryChips>
              </HowRecord>

              <HowNext>
                <HowNextLine>Tas pats dirgiklis po trijų savaičių.</HowNextLine>
                <HowNextBody>
                  Atsidarai kortelę. Naujas požiūris jau čia – sunkų darbą atlikai vieną kartą, kai galėjai ramiai ir aiškiai mąstyti. Šįkart tik perskaitai. Spiralė net neprasideda.
                </HowNextBody>
              </HowNext>
            </HowBottom>
          </Wrap>
        </HowItWorks>

        {/* ── Why it works — 4 archetype theory cards ──────────────────────── */}
        <Theories>
          <Wrap>
            <SectionHead>Kodėl tai veikia skirtingiems žmonėms</SectionHead>
            <TheoriesGrid>

              <TheoryCard>
                <TheoryIconWrap>
                  <RotateCcw size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Tavo mintys – ne faktai. Tai įpročiai.</TheoryHeadline>
                  <TheoryBody>
                    Antradienio pokalbis vis grįžta. Vėl ir vėl perkratai, ką pasakei tu, ką jie, ką reikėjo pasakyti. Šis ratas neduoda nieko naujo – jis tiesiog sukasi. Dažnai užtenka vieną kartą užrašyti ir tiksliai įvardyti mintį, kad jį nutrauktum.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <Flame size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Geriau nepasijunti vien todėl, kad labai stengiesi.</TheoryHeadline>
                  <TheoryBody>
                    Sakei sau nebesijaudinti, nusiraminti, eiti toliau. Nepavyko – ir tai, kad nepavyko, tik pablogino. Emocijos seka paskui mintis, o ne valią. Pagauk po jomis slypinčią mintį, įvardyk spąstus – ir jausmas dažnai atlėgsta pats.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <Sparkles size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Gerų dalykų nutinka kasdien. Dauguma neišlieka.</TheoryHeadline>
                  <TheoryBody>
                    Paklausk savęs, kas gero nutiko praėjusį antradienį. Bus sunku prisiminti – ne todėl, kad nieko nebuvo, o todėl, kad smegenys to neišsaugojo. Skausmas įsirašo pats. Džiaugsmas išgaruoja. Užrašyti gerą akimirką, kol ji neišblėso, reiškia eiti prieš sistemą, sukurtą pastebėti, kas nepavyko.
                  </TheoryBody>
                </TheoryContent>
              </TheoryCard>

              <TheoryCard>
                <TheoryIconWrap>
                  <GitBranch size={22} strokeWidth={1.5} />
                </TheoryIconWrap>
                <TheoryContent>
                  <TheoryHeadline>Mintys, kurias treniruoji, tampa tavo mintimis.</TheoryHeadline>
                  <TheoryBody>
                    Supranti, ką reikia keisti. Gali tai įvardyti. Trūksta ne įžvalgos, o kartojimo. Dažnai naudojamas minties takas įsijungia vis lengviau. Net vieną kartą užrašytas naujas požiūris kitą kartą ateis į galvą šiek tiek lengviau.
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
              Dauguma žmonių psichikos sveikatos programėlę atsidaro tik tada, kai kažkas jau negerai. Ilgainiui ji ima asocijuotis su sunkumais – ir nustoji į ją grįžti. Įrankis, turėjęs padėti, tyliai dingsta iš rutinos, kurią turėjo sukurti.
            </p>
            <p>
              Kai užrašai ir geras akimirkas, ima ryškėti kitas vaizdas. Ne tik sunkios dienos, bet ir visa tavo savaičių visuma. Ši perspektyva – aiškiai matyti dėsningumus – pati savaime yra svarbi dalis to, ko siekia kognityvinė elgesio terapija (KET).
            </p>
          </Wrap>
        </Insight>

        {/* ── Cognitive distortions ─────────────────────────────────────────── */}
        <Distortions>
          <Wrap>
            <SectionHead>Spąstai, į kuriuos protas pakliūva automatiškai</SectionHead>
            <DistortionsGrid>
              <DistortionBlock>
                <Divide size={16} strokeWidth={1.5} />
                <h3>„Viskas arba nieko“</h3>
                <p>Jei ne tobulai – vadinasi, nesėkmė.</p>
              </DistortionBlock>
              <DistortionBlock>
                <TrendingDown size={16} strokeWidth={1.5} />
                <h3>Katastrofizavimas</h3>
                <p>Blogiausia baigtis dabar atrodo labiausiai tikėtina.</p>
              </DistortionBlock>
              <DistortionBlock>
                <MessageCircle size={16} strokeWidth={1.5} />
                <h3>Minčių skaitymas</h3>
                <p>Atrodo, kad tiksliai žinai, ką jie galvojo.</p>
              </DistortionBlock>
              <DistortionBlock>
                <Scale size={16} strokeWidth={1.5} />
                <h3>„Turiu“ ir „privalau“</h3>
                <p>Turi griežtą taisyklę, kaip viskas turi būti – ir retai ją atitinki.</p>
              </DistortionBlock>
            </DistortionsGrid>
            <DistortionsNote>
              Tai keturi iš dešimties kognityvinių iškraipymų, kuriuos išskiria KET, – proto trumpiniai, kurie atrodo kaip faktai. Įvardyti spąstus – didžioji darbo dalis. Kai juos pamatai, jie atsileidžia.
            </DistortionsNote>
          </Wrap>
        </Distortions>

        {/* ── Two modes ────────────────────────────────────────────────────── */}
        <Modes>
          <Wrap>
            <SectionHead>Du būdai naudotis</SectionHead>
            <ModesGrid>
              <div>
                <ModeLabel>Kai kažkas slegia</ModeLabel>
                <ModeBody>
                  Septyni žingsniai su gairėmis – įvardyk situaciją, įvertink emociją, pastebėk iškraipymą, suabejok juo ir pažvelk kitaip. Pabaigoje pamatysi, kaip pasikeitė stiprumas.
                </ModeBody>
                <ModeTime>~5 minutės</ModeTime>
              </div>
              <div>
                <ModeLabel>Kai kažkas pavyko</ModeLabel>
                <ModeBody>
                  Trys laukeliai: kas nutiko, ką jautei, kodėl tai svarbu. Pakankamai struktūros, kad būtų tikra, ir pakankamai mažai, kad spėtum tą pačią akimirką.
                </ModeBody>
                <ModeTime>~60 sekundžių</ModeTime>
              </div>
            </ModesGrid>
          </Wrap>
        </Modes>

        {/* ── Trust signals ─────────────────────────────────────────────────── */}
        <Trust>
          <Wrap>
            <SectionHead>Paremta praktika</SectionHead>
            <TrustGrid>
              <TrustItem>
                <TrustIconWrap>
                  <BookOpen size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>Paremta KET</TrustTitle>
                <TrustBody>
                  Kognityvinė elgesio terapija remiasi daugiau nei 50 metų klinikiniais tyrimais. Ši programėlė taiko pagrindinius jos metodus – jokių naujų teorijų, jokių trumpinių.
                </TrustBody>
              </TrustItem>

              <TrustItem>
                <TrustIconWrap>
                  <Lock size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>Privatu</TrustTitle>
                <TrustBody>
                  Tavo įrašai – tik tau. Jokių reklamų, o dienoraštis niekada neparduodamas ir niekam neperduodamas.
                </TrustBody>
              </TrustItem>

              <TrustItem>
                <TrustIconWrap>
                  <Sprout size={18} strokeWidth={1.5} />
                </TrustIconWrap>
                <TrustTitle>Jokio spaudimo</TrustTitle>
                <TrustBody>
                  Rašyk, kai kas nors nutinka – sunki ar gera akimirka. Rašyti kasdien nebūtina.
                </TrustBody>
              </TrustItem>
            </TrustGrid>
          </Wrap>
        </Trust>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <CtaBlock>
          <Wrap>
            <CtaLine>Minčių įrašai. Geros akimirkos. Vienoje vietoje.</CtaLine>
            <CtaBtn onClick={goToLogin}>Pradėti rašyti</CtaBtn>
          </Wrap>
        </CtaBlock>

      </PageMain>

      <Footer>
        <FooterInner>
          <FooterBrand>Joyful Thoughts</FooterBrand>
          <FooterQuiet>KET minčių dienoraštis</FooterQuiet>
        </FooterInner>
      </Footer>

    </Root>
  );
};

export default Welcome;
