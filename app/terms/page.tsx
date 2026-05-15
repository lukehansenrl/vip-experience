import type { Metadata } from "next";

// Discord channel where members open support tickets for refunds, billing
// disputes, account issues, and general questions about the Terms.
const SUPPORT_URL =
  "https://discord.com/channels/1217265351658573895/1222927647126851604";

// Support email used in V4.2 for accessibility, privacy, copyright/DMCA,
// and arbitration opt-out notices.
const SUPPORT_EMAIL = "support@rocketleaguebootcamp.com";

export const metadata: Metadata = {
  title: "Terms of Service & Refund Policy | RL Clubhouse",
  description:
    "Rocket League Academy, Bootcamp, Clubhouse & VIP Pro by SpookyLuke: Terms of Service (V4.2 DRAFT). Operated by Game Launch, LLC.",
};

export default function TermsPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0b0e17" }}
    >
      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-6 text-center md:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Terms of Service &amp; Refund Policy
          </h1>
          <p className="mt-4 text-base text-white/65">
            Rocket League Academy, Bootcamp, Clubhouse &amp; VIP Pro by
            SpookyLuke (V4.2 DRAFT). Operated by Game Launch, LLC.
          </p>
          <p className="mt-2 text-sm text-white/45">
            Effective Date: 5/15/2026 · Last Updated: 5/14/2026
          </p>
        </div>
      </section>

      {/* TRADEMARK AND AFFILIATION NOTICE */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-white/60">
          <p>
            <strong className="text-white">
              Trademark and affiliation notice.
            </strong>{" "}
            Rocket League is a trademark of Psyonix LLC and/or Epic Games,
            Inc. Game Launch, LLC, RL ABCs, Rocket League Academy, Rocket
            League Bootcamp, Rocket League Clubhouse, VIP Pro, and
            SpookyLuke are independent services and are not affiliated
            with, endorsed by, sponsored by, or approved by Psyonix LLC,
            Epic Games, Inc., Rocket League, or their affiliates.
          </p>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Jump to
          </p>
          <ul className="mt-3 grid gap-1.5 text-sm md:grid-cols-2">
            {[
              ["1. Introduction and Acceptance", "intro"],
              ["2. Definitions", "definitions"],
              ["3. Services Description", "services"],
              ["4. VIP Pro Experience Terms", "vip-pro"],
              ["5. Eligibility Requirements", "eligibility"],
              ["6. Registration and Account", "registration"],
              ["7. Payment Terms", "payment"],
              ["8. Refund Policy", "refund-policy"],
              ["9. Session Scheduling, Attendance, and Forfeiture", "scheduling"],
              ["10. Coach Availability and Service Limitations", "coach-availability"],
              ["11. Code of Conduct", "conduct"],
              ["12. Intellectual Property", "ip"],
              ["13. Recordings, Testimonials, and Marketing Use", "recordings"],
              ["14. Privacy and Data Collection", "privacy"],
              ["15. Disclaimer of Warranties", "warranties"],
              ["16. Limitation of Liability", "liability"],
              ["17. Indemnification", "indemnification"],
              ["18. Dispute Resolution", "disputes"],
              ["19. Governing Law", "governing-law"],
              ["20. Modifications to Terms", "modifications"],
              ["21. Severability", "severability"],
              ["22. Entire Agreement", "entire-agreement"],
              ["23. Non-Waiver", "non-waiver"],
              ["24. Assignment", "assignment"],
              ["25. Notices", "notices"],
              ["26. Survival", "survival"],
              ["27. Accessibility", "accessibility"],
              ["28. Contact Information", "contact"],
              ["29. Legacy Membership Plans", "legacy"],
            ].map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-white/65 underline-offset-2 transition hover:text-[var(--accent)] hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          {/* 1 */}
          <H2 id="intro">1. Introduction and Acceptance</H2>
          <P>
            Welcome to Rocket League Academy, Bootcamp, Clubhouse &amp; VIP
            Pro by SpookyLuke (&quot;RL ABCs,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;). These Services are operated
            and legally provided by Game Launch, LLC. We provide structured
            coaching, community, educational resources, and related services
            designed to help players improve in Rocket League.
          </P>
          <P>
            By enrolling in, accessing, purchasing, or using any program,
            subscription, community, course, coaching service, digital
            resource, or other service offered by Game Launch, LLC under
            the RL ABCs brand (collectively, the &quot;Services&quot;), you
            agree to be bound by these Terms of Service (&quot;Terms&quot;).
            If you do not agree with any part of these Terms, you must not
            purchase, access, or use the Services.
          </P>
          <P>
            By accessing or using our Services, you represent that you are
            at least sixteen (16) years of age. If you are between sixteen
            (16) and eighteen (18) years old, you represent that you have
            obtained permission from your parent or legal guardian and that
            your parent or legal guardian has reviewed and agreed to these
            Terms on your behalf.
          </P>
          <P>
            VIP Pro is available only to individuals who are at least
            eighteen (18) years old, unless Game Launch, LLC expressly
            approves an exception in writing and receives any legally
            required parent or guardian consent.
          </P>

          {/* 2 */}
          <H2 id="definitions">2. Definitions</H2>
          <DefList
            items={[
              [
                "Academy / RLA",
                "Rocket League Academy, our free educational content, courses, training materials, and resources provided for personal, non-commercial use.",
              ],
              [
                "Bootcamp / RLB",
                "Rocket League Bootcamp, our paid coaching subscriptions and coaching programs.",
              ],
              [
                "Bootcamp Pro",
                "our membership-based service providing structured bi-weekly one-on-one coaching sessions with coach communication as described during enrollment and onboarding.",
              ],
              [
                "Bootcamp Unlimited",
                "our membership-based service providing one-on-one coaching sessions subject to coach availability, booking limits, and a mandatory cooldown period. The term “unlimited” does not mean unrestricted, back-to-back, simultaneous, or guaranteed daily coaching.",
              ],
              [
                "Bootcamp Off-Season",
                "our membership-based service providing one coaching session every four weeks with coach communication as described during enrollment and onboarding.",
              ],
              [
                "Clubhouse / RLC",
                "Rocket League Clubhouse, our paid community membership, including access to community spaces, events, group coaching opportunities, resources, and member-only programming.",
              ],
              [
                "VIP Pro Experience (also VIP Pro, VIP, or Program)",
                "the forty-five (45) day premium one-on-one coaching program offered by Game Launch, LLC, billed at $497.00 USD up front for the initial 45-day Program Term and $199.00 USD every thirty (30) days thereafter on a recurring basis until cancelled, unless the Member qualifies for and elects Alumni Tier pricing under Section 4.8.",
              ],
              [
                "Program Term",
                "the initial forty-five (45) day period beginning on the date of the Member's first VIP Pro payment.",
              ],
              [
                "Continued Membership",
                "VIP Pro membership beyond the Program Term, billed every thirty (30) days at the then-current or applicable grandfathered rate until cancelled by the Member or terminated under these Terms.",
              ],
              [
                "Alumni Tier",
                "the optional VIP Pro continuation tier described in Section 4.8.",
              ],
              [
                "Rank-Up Guarantee",
                "the conditional service-continuation remedy described in Section 4.4, available only when expressly offered and disclosed for the applicable VIP Pro purchase.",
              ],
              [
                "Chosen Competitive Playlist",
                "the competitive Rocket League playlist selected by the Member during VIP Pro onboarding for purposes of measuring Rank-Up Guarantee eligibility. Unless Game Launch, LLC approves otherwise in writing, the Chosen Competitive Playlist must be either Competitive 2v2 or Competitive 3v3.",
              ],
              [
                "Rank-Up",
                "an increase in the Member's matchmaking rating (“MMR”) in the Chosen Competitive Playlist of at least one hundred (100) MMR above the Starting MMR, or the Member's MMR crossing the threshold of the next official Rocket League rank tier above the Starting Rank, whichever occurs first.",
              ],
              [
                "Starting MMR",
                "the higher of: (a) the Member's MMR in the Chosen Competitive Playlist on the date of the Member's first VIP Pro payment; or (b) the Member's peak MMR in that playlist during the ninety (90) day period before the Member's first VIP Pro payment, as reflected by the Member's Tracker Profile or other evidence reasonably accepted by Game Launch, LLC. Game Launch, LLC may approve a different Starting MMR in writing when it determines that the standard calculation would produce an unfair or inaccurate baseline.",
              ],
              [
                "Starting Rank",
                "the Rocket League rank tier corresponding to the Starting MMR.",
              ],
              [
                "Guarantee Window",
                "the applicable time period for the Rank-Up Guarantee, if any, disclosed at checkout, on the sales page, in onboarding materials, or in the written enrollment disclosure for that Member's VIP Pro purchase. The Guarantee Window may vary by offer, promotion, enrollment date, or written arrangement. If no Guarantee Window is expressly disclosed for a VIP Pro purchase, the Rank-Up Guarantee does not apply unless Game Launch, LLC confirms it in writing.",
              ],
              [
                "Money-Back Window",
                "the thirty (30) day period beginning on the date of the VIP Pro payment for which a refund is requested.",
              ],
              [
                "Coaching Session",
                "a scheduled live one-on-one video, voice, or screen-share session between the Member and an assigned coach.",
              ],
              [
                "Accountability Check-In",
                "a scheduled accountability call or check-in delivered by Game Launch, LLC or its assigned coach, guide, or staff member.",
              ],
              [
                "Async Review",
                "asynchronous feedback delivered outside of a live Coaching Session, such as replay analysis, VOD review, clip review, written feedback, or recorded feedback.",
              ],
              [
                "Tracker Profile",
                "the Member's verified RL Tracker, rltracker.pro, or substantially equivalent Rocket League stats profile designated by Game Launch, LLC, submitted as a condition of Rank-Up Guarantee eligibility under Section 4.4.",
              ],
              [
                "Business Day",
                "Monday through Friday, excluding U.S. federal holidays, in the Central Time (CT) zone.",
              ],
              [
                "Coach Working Days",
                "the five coach workdays per week set by each coach. A coach's working days may include weekends. Coaches respond during their designated working days according to the communication expectations for the applicable Service.",
              ],
              [
                "Store Credit",
                "non-cash credit issued for use toward eligible Game Launch, LLC services and products. Store Credit is non-transferable, has no cash value, and expires twelve (12) months after issuance unless otherwise stated in writing.",
              ],
              [
                "Platforms",
                "third-party tools and services used to deliver, manage, process payment for, or support the Services, including Discord, Whop, Metafy, Calendly, payment processors, Rocket League, tracker platforms, replay platforms, and any other tools designated by Game Launch, LLC.",
              ],
              [
                "Content",
                "all materials, recordings, videos, documents, guides, training resources, coaching notes, Discord posts, website content, graphics, systems, methodologies, and other materials made available through the Services.",
              ],
              [
                "User Content",
                "any content, files, clips, replays, screenshots, messages, feedback, communications, or other materials submitted by a Member or user to Game Launch, LLC, its coaches, staff, communities, or Platforms.",
              ],
              [
                "Legacy Plans",
                "discontinued membership plans offered before April 15, 2025, including prior Pro, Pro+, and Off-Season plans.",
              ],
              [
                "Legacy Members",
                "members who purchased Legacy Plans before their discontinuation and maintained active, uninterrupted membership while those legacy arrangements remained available.",
              ],
              [
                "We, us, our",
                "Game Launch, LLC, operating as Rocket League Academy, Bootcamp, Clubhouse & VIP Pro by SpookyLuke, including its affiliates, owners, officers, contractors, employees, coaches, moderators, representatives, and agents.",
              ],
              [
                "You, your, Member, participant, student, user",
                "the individual who purchases, accesses, enrolls in, or uses any Service.",
              ],
            ]}
          />

          {/* 3 */}
          <H2 id="services">3. Services Description</H2>
          <P>
            We provide Rocket League education, coaching, community, and
            training services. Specific features, pricing, and availability
            may vary by product, enrollment channel, membership tier,
            promotion, or operational capacity.
          </P>
          <P>
            We may modify, suspend, or discontinue any non-core feature of
            the Services at any time. If we materially change a paid
            Service in a way that affects active Members, we will provide
            notice as described in Section 20.
          </P>

          <H3>3.1 Rocket League Clubhouse (RLC)</H3>
          <P>
            Rocket League Clubhouse is a membership-based community
            providing access to group coaching opportunities, events,
            resources, and player development spaces. Clubhouse Members may
            receive access to:
          </P>
          <UL>
            <li>Weekly or recurring tournaments, game nights, practice sessions, or events.</li>
            <li>Custom game modes and practice opportunities.</li>
            <li>Member-only Discord channels.</li>
            <li>Matchmaking and practice opportunities with similarly skilled peers.</li>
            <li>VOD review sessions and group coaching opportunities.</li>
            <li>A community of Rocket League players for ranked matchmaking and practice.</li>
          </UL>
          <P>
            Clubhouse may include a free trial, discounted period, or
            promotional period when offered through Metafy, Whop, or
            another approved checkout platform. If offered, checkout will
            disclose the trial length, renewal price, billing frequency,
            first charge date, and cancellation method before purchase.
            Unless you cancel before the trial or promotional period ends,
            the membership automatically converts to a paid recurring
            membership at the disclosed rate. By starting a free trial or
            promotional membership, you authorize the applicable recurring
            charge to begin at the end of the trial or promotional period
            unless you cancel in time. Where required by law, we will send
            a reminder notice before a trial, discounted period, or
            promotional period converts to paid or standard pricing.
          </P>
          <P>
            Clubhouse is a recurring membership that automatically renews
            until cancelled.
          </P>

          <H3>3.2 Rocket League Bootcamp Pro</H3>
          <P>
            Rocket League Bootcamp Pro is a membership-based coaching
            service providing structured bi-weekly one-on-one Coaching
            Sessions. Bootcamp Pro may include:
          </P>
          <UL>
            <li>One Coaching Session every two weeks.</li>
            <li>Coach communication according to the plan terms disclosed during enrollment or onboarding.</li>
            <li>Access to applicable training resources or member spaces.</li>
            <li>Session scheduling through the official booking system.</li>
            <li>Recurring membership billing until cancelled.</li>
          </UL>
          <P>
            Bootcamp Pro sessions expire according to the allocation and
            scheduling rules in Sections 7, 9, and 10, unless an extension
            is requested and approved in writing.
          </P>

          <H3>3.3 Rocket League Bootcamp Unlimited</H3>
          <P>
            Rocket League Bootcamp Unlimited is a membership-based coaching
            service providing one-on-one Coaching Sessions subject to
            reasonable use, coach availability, a mandatory cooldown
            period, and booking limits. Bootcamp Unlimited may include:
          </P>
          <UL>
            <li>Coaching Sessions subject to the cooldown and booking limitations described in Section 9.</li>
            <li>Coach communication according to the plan terms disclosed during enrollment or onboarding.</li>
            <li>Access to applicable training resources or member spaces.</li>
            <li>A maximum of two (2) active future Coaching Session bookings at any time, unless otherwise approved in writing.</li>
            <li>Recurring membership billing until cancelled.</li>
          </UL>
          <P>
            The term &quot;unlimited&quot; means that sessions are not
            defined by a fixed monthly allocation in the same way as capped
            plans. It does not mean unrestricted access, guaranteed daily
            sessions, simultaneous bookings, avoidance of the cooldown
            period, or guaranteed access at any specific date or time.
          </P>

          <H3>3.4 Rocket League Bootcamp Off-Season</H3>
          <P>
            Rocket League Bootcamp Off-Season is a membership-based service
            providing lighter coaching support during off-seasons or
            lower-intensity training periods. Bootcamp Off-Season may
            include:
          </P>
          <UL>
            <li>One Coaching Session every four weeks.</li>
            <li>Coach communication according to the plan terms disclosed during enrollment or onboarding.</li>
            <li>Access to applicable training resources or member spaces.</li>
            <li>Recurring membership billing until cancelled.</li>
          </UL>
          <P>
            Bootcamp Off-Season sessions must be scheduled within the
            applicable four-week allocation period unless an extension is
            requested and approved in writing.
          </P>

          <H3>3.5 VIP Pro Experience</H3>
          <P>
            The VIP Pro Experience is a premium one-on-one coaching program
            offered to Members of the Rocket League Clubhouse. Each VIP Pro
            Member is assigned a coach and receives, over the 45-day
            Program Term:
          </P>
          <UL>
            <li>(a) three (3) sixty-minute one-on-one Coaching Sessions;</li>
            <li>(b) three (3) thirty-minute personalized Async Reviews;</li>
            <li>(c) three (3) Accountability Check-Ins;</li>
            <li>(d) three (3) personalized 30-day training routines; and</li>
            <li>(e) continued Rocket League Clubhouse access for the duration of active VIP Pro membership, included at no additional charge.</li>
          </UL>
          <P>
            After the 45-day Program Term, VIP Pro membership continues on
            a Continued Membership basis at the service cadence described
            in Section 4.3 and the pricing described in Section 7.1 until
            cancelled by the Member or terminated under these Terms.
          </P>
          <P>
            If offered for the applicable VIP Pro purchase, the Rank-Up
            Guarantee is described in Section 4.4. The VIP Pro Money-Back
            Guarantee is described in Section 4.5.
          </P>

          <H3>3.6 Platform Integration</H3>
          <P>
            Our Services are delivered and managed through third-party
            Platforms. By using our Services, you agree to maintain any
            required accounts and follow the applicable terms, rules, and
            policies of those Platforms.
          </P>
          <P>
            <strong>Discord.</strong> Community access, role access,
            announcements, events, support tickets, and communications may
            be managed through Discord. You are responsible for maintaining
            access to your Discord account and complying with Discord&apos;s
            terms.
          </P>
          <P>
            <strong>Metafy.</strong> Some payments, coaching roles,
            scheduling workflows, and account features may be managed
            through Metafy. You agree to follow Metafy&apos;s terms, payment
            policies, and account requirements where applicable.
          </P>
          <P>
            <strong>Whop.</strong> Some payments, subscription access, role
            access, onboarding steps, and account features may be managed
            through Whop. You agree to follow Whop&apos;s terms, payment
            policies, and account requirements where applicable.
          </P>
          <P>
            <strong>Calendly or other scheduling tools.</strong> Coaching
            Session scheduling, rescheduling, and cancellation may be
            managed through Calendly or another scheduling tool designated
            by Game Launch, LLC. You agree to use the official booking
            links and follow the scheduling rules in Section 9.
          </P>
          <P>
            <strong>Rocket League and tracker platforms.</strong> Coaching,
            rank verification, replay review, and guarantee eligibility may
            depend on Rocket League, tracker platforms, replay platforms,
            or other third-party tools. We do not control those platforms
            and are not responsible for their downtime, data changes, or
            policy changes.
          </P>

          <H3>3.7 Educational Resources (Academy)</H3>
          <P>
            We provide free educational content for personal, non-commercial
            use. Academy resources may include:
          </P>
          <UL>
            <li>Training packs and custom drill sequences.</li>
            <li>Video tutorials for different skill levels.</li>
            <li>Written guides and strategy documentation.</li>
            <li>Replay analysis examples.</li>
            <li>Rank-specific improvement roadmaps.</li>
          </UL>
          <P>
            Academy content may be modified, suspended, removed, or
            discontinued at any time without notice.
          </P>

          {/* 4 */}
          <H2 id="vip-pro">4. VIP Pro Experience Terms</H2>
          <P>
            This Section 4 applies specifically to the VIP Pro Experience.
            If this Section 4 conflicts with another section of these
            Terms, this Section 4 controls solely with respect to VIP Pro.
          </P>

          <H3>4.1 Program Overview</H3>
          <P>
            VIP Pro is a one-on-one coaching program with an initial 45-day
            Program Term. After the Program Term, VIP Pro continues on a
            Continued Membership basis until the Member cancels or the
            membership is otherwise terminated under these Terms.
          </P>
          <P>
            The Program is delivered through Rocket League Clubhouse
            infrastructure, Discord, Whop, Metafy, Calendly, tracker
            platforms, replay platforms, and any other Platforms designated
            by Game Launch, LLC.
          </P>
          <P>
            VIP Pro is a coaching and education service. It is not a rank
            boosting service, account sharing service, professional gaming
            representation service, or guarantee of a specific gameplay
            outcome except to the limited extent expressly stated in the
            Rank-Up Guarantee in Section 4.4.
          </P>

          <H3>4.2 Eligibility</H3>
          <P>VIP Pro is open to applicants who:</P>
          <UL>
            <li>(a) are at least eighteen (18) years of age, unless Game Launch, LLC approves an exception in writing and receives any legally required parent or guardian consent;</li>
            <li>(b) have a valid Rocket League account in good standing;</li>
            <li>(c) hold an active Rocket League Clubhouse subscription or accept Clubhouse access bundled with VIP Pro at no additional charge during active VIP Pro membership;</li>
            <li>(d) reside in a jurisdiction in which Game Launch, LLC offers VIP Pro;</li>
            <li>(e) complete any required application, interview, or onboarding call; and</li>
            <li>(f) satisfy any technical, conduct, payment, or account requirements communicated during enrollment or onboarding.</li>
          </UL>
          <P>
            Game Launch, LLC may approve, decline, waitlist, or remove any
            applicant or Member at its sole discretion, subject to
            applicable law.
          </P>

          <H3>4.3 Program Structure</H3>
          <P>
            During the initial 45-day Program Term, each VIP Pro Member is
            entitled to:
          </P>
          <UL>
            <li>(a) three (3) Coaching Sessions;</li>
            <li>(b) three (3) Async Reviews;</li>
            <li>(c) three (3) Accountability Check-Ins; and</li>
            <li>(d) three (3) personalized 30-day training routines.</li>
          </UL>
          <P>
            These deliverables are generally distributed over the 45-day
            Program Term, but exact timing may vary based on coach
            availability, scheduling, Member responsiveness, and
            operational needs.
          </P>
          <P>
            After the Program Term, Continued Membership Members are
            entitled to one (1) Coaching Session, one (1) Async Review, and
            one (1) Accountability Check-In per 30-day billing cycle,
            unless the Member is in the Extended Coaching Period under
            Section 4.4, elects Alumni Tier pricing under Section 4.8, or
            receives a different written arrangement from Game Launch, LLC.
          </P>
          <P>
            Scheduling, rescheduling, late cancellation, no-show, and
            session forfeiture rules are governed by Section 9.
          </P>

          <H3>4.4 Rank-Up Guarantee</H3>
          <P>
            Subject to all conditions in this Section 4.4, if a Rank-Up
            Guarantee is expressly offered for a Member&apos;s VIP Pro
            purchase and the Member does not achieve a Rank-Up within the
            applicable Guarantee Window, Game Launch, LLC will continue to
            provide one (1) Coaching Session and one (1) Accountability
            Check-In per 30-day period at no additional VIP Pro charge
            until the Member achieves a Rank-Up, for up to twelve (12)
            additional months following the close of the Guarantee Window
            (the &quot;Extended Coaching Period&quot;). If Extended
            Coaching applies, paid VIP Pro recurring billing will be paused
            beginning with the first billing cycle after the Guarantee
            Window closes. During the Extended Coaching Period, the Member
            receives only the Extended Coaching deliverables stated in this
            Section unless Game Launch, LLC states otherwise in writing.
            Async Reviews, Alumni Tier eligibility, paid VIP Pro benefits,
            and additional deliverables are not included during the
            Extended Coaching Period unless Game Launch, LLC states
            otherwise in writing. Clubhouse access during the Extended
            Coaching Period continues only if Game Launch, LLC states that
            it is included or if the Member maintains a separate active
            Clubhouse membership.
          </P>
          <P>
            The Extended Coaching Period expires automatically upon the
            earliest of:
          </P>
          <UL>
            <li>(a) the Member achieving a Rank-Up;</li>
            <li>(b) expiration of the twelve (12) month Extended Coaching Period;</li>
            <li>(c) forfeiture under this Section 4.4;</li>
            <li>(d) termination for a Code of Conduct violation or other material breach; or</li>
            <li>(e) the Member&apos;s written request to end the Extended Coaching Period.</li>
          </UL>
          <P>
            <strong>Eligibility by rank.</strong> The Rank-Up Guarantee
            applies only to Members whose Starting Rank is Champion 3 or
            below. Members with a Starting Rank of Grand Champion 1 or
            above may join VIP Pro, but the Rank-Up Guarantee does not
            apply to them.
          </P>
          <P>
            <strong>Tracker Profile submission.</strong> As a condition of
            Rank-Up Guarantee eligibility, the Member must submit their
            Tracker Profile to Game Launch, LLC within seven (7) days of
            their first VIP Pro payment. Failure to submit the Tracker
            Profile within that window forfeits Rank-Up Guarantee
            eligibility, even if the Member otherwise satisfies the
            participation requirements below.
          </P>
          <P>
            <strong>Chosen Competitive Playlist.</strong> The Rank-Up
            Guarantee applies only to the Member&apos;s Chosen Competitive
            Playlist. Progress in other playlists, alternate accounts,
            casual modes, private matches, tournament matches, or
            unofficial modes does not count unless Game Launch, LLC
            approves otherwise in writing.
          </P>
          <P>
            <strong>Compliance Requirements during the Guarantee Window.</strong>{" "}
            To remain eligible for the Rank-Up Guarantee, the Member must
            complete the Program requirements communicated for that VIP
            Pro purchase, including any required participation, attendance,
            training, proof, gameplay, scheduling, onboarding, account,
            tracker, conduct, or good-faith effort requirements communicated
            at checkout, on the sales page, during onboarding, in the
            Discord server, through support, or in written Program
            materials.
          </P>
          <P>
            Game Launch, LLC may determine whether a Member has completed
            the applicable Program requirements based on coach records,
            support records, attendance records, tracker data, platform
            records, Member submissions, and other reasonably available
            evidence.
          </P>
          <P>
            <strong>Compliance Requirements during the Extended Coaching Period.</strong>{" "}
            A Member receiving Extended Coaching under this Section 4.4
            must continue to attend each scheduled Coaching Session and
            each scheduled Accountability Check-In. Failure to attend two
            (2) consecutive scheduled sessions or check-ins, or three (3)
            cumulative scheduled sessions or check-ins during the Extended
            Coaching Period, automatically terminates the Rank-Up Guarantee
            and the Extended Coaching Period.
          </P>
          <P>
            <strong>Integrity requirements.</strong> The Rank-Up Guarantee
            does not apply, and Game Launch, LLC may revoke it without
            refund, if Game Launch, LLC determines in its sole reasonable
            judgment, based on the Tracker Profile and other available
            evidence, that the Member:
          </P>
          <UL>
            <li>(a) used smurf, boosting, shared, purchased, borrowed, or alternate accounts to manipulate MMR or eligibility;</li>
            <li>(b) intentionally lost matches, threw matches, abandoned matches, or otherwise artificially depressed their Starting MMR or rank;</li>
            <li>(c) used third-party software, automation, cheats, exploits, or unauthorized tools to manipulate match outcomes, rank, MMR, matchmaking, or tracker data;</li>
            <li>(d) submitted falsified, edited, incomplete, misleading, or unverifiable screenshots, replays, tracker data, match history, or other evidence;</li>
            <li>(e) changed accounts or playlists without written approval;</li>
            <li>(f) violated the Code of Conduct in Section 11; or</li>
            <li>(g) otherwise acted in bad faith with respect to the Program or the Rank-Up Guarantee.</li>
          </UL>
          <P>
            <strong>Determination.</strong> Game Launch, LLC makes the
            final determination on Rank-Up Guarantee eligibility,
            Compliance Requirements, integrity findings, Starting MMR,
            Starting Rank, Rank-Up achievement, and Extended Coaching
            Period status based on Tracker Profile data, platform-verified
            records, Member submissions, coach records, and other
            reasonably available evidence.
          </P>
          <P>
            <strong>Exclusive remedy.</strong> The Rank-Up Guarantee is a
            service-continuation remedy only. It does not entitle the
            Member to a cash refund, damages, replacement services beyond
            those stated in this Section 4.4, or any remedy other than
            Extended Coaching under the conditions described above.
          </P>

          <H3>4.5 VIP Pro Money-Back Guarantee</H3>
          <P>
            A VIP Pro Member may request a full refund of the most recent
            VIP Pro payment within thirty (30) days of that payment,
            subject to the conditions in this Section 4.5.
          </P>
          <P>
            The Money-Back Guarantee applies to the initial $497.00 Program
            Term payment and to each subsequent $199.00 Continued
            Membership payment, provided the refund request is submitted
            within the applicable Money-Back Window and all conditions
            below are satisfied.
          </P>
          <P>
            <strong>Engagement Requirement.</strong> To qualify for a
            refund under this Section 4.5, the Member must have attended at
            least one (1) Coaching Session or one (1) Accountability
            Check-In during the 30-day period associated with the payment
            being refunded. A Member who does not engage with the Program
            at all during that period is not eligible for a refund under
            this Section 4.5.
          </P>
          <P>
            The Engagement Requirement will be deemed satisfied if the
            Member made a good-faith attempt to schedule a Coaching Session
            or Accountability Check-In during the Money-Back Window and
            Game Launch, LLC or its assigned coach failed to provide
            reasonable availability before the window expired. If the first
            reasonably available Coaching Session or Accountability
            Check-In offered by Game Launch, LLC is more than fourteen (14)
            days after payment, the Money-Back Window will be extended
            until seven (7) days after that first available session or
            check-in.
          </P>
          <P>
            <strong>No results showing required.</strong> A Member does not
            need to prove lack of rank improvement or poor coaching results
            to request a refund under this Section 4.5. The Engagement
            Requirement, timing requirement, and other conditions in these
            Terms still apply.
          </P>
          <P>
            <strong>Refund process.</strong> Refund requests must be
            submitted in writing through the support ticket system or other
            official support channel designated by Game Launch, LLC.
            Approved refunds are processed back to the original payment
            method within ten (10) business days of approval, though actual
            receipt may depend on the payment processor or financial
            institution.
          </P>
          <P>
            <strong>Effect of refund.</strong> A refund of a VIP Pro
            payment cancels the Member&apos;s VIP Pro membership effective
            on the refund approval date. Upon refund approval, the Member
            forfeits all active VIP Pro deliverables, Continued Membership
            rights, Alumni Tier eligibility, Rank-Up Guarantee eligibility,
            and any Extended Coaching Period.
          </P>
          <P>
            This Section 4.5 supersedes the general refund provisions in
            Section 8 with respect to VIP Pro.
          </P>

          <H3>4.6 VIP Pro Code of Conduct</H3>
          <P>
            VIP Pro Members must comply with the Code of Conduct in Section
            11 and all reasonable instructions from coaches, moderators,
            support staff, and Game Launch, LLC representatives.
          </P>
          <P>
            Game Launch, LLC may remove any VIP Pro Member for a material
            breach of these Terms, a Code of Conduct violation, harassment,
            threats, abusive behavior, bad-faith guarantee conduct, payment
            fraud, chargebacks, or other conduct that materially disrupts
            the Program or community.
          </P>
          <P>
            Removal under this Section 4.6 may result in forfeiture of
            unused VIP Pro deliverables, refund rights except where required
            by law, Rank-Up Guarantee eligibility, Alumni Tier eligibility,
            and any Extended Coaching Period.
          </P>

          <H3>4.7 Recording and Marketing Consent for VIP Pro</H3>
          <P>
            VIP Pro Coaching Sessions, Accountability Check-Ins, Async
            Reviews, onboarding calls, support calls, and related
            communications may be recorded as described in Section 13.
          </P>
          <P>
            VIP Pro Members grant Game Launch, LLC a non-exclusive,
            worldwide, royalty-free license to use anonymized, aggregated,
            or de-identified Program footage, gameplay clips, replay
            materials, results, training outcomes, and before-and-after
            progress information for internal training, quality assurance,
            product improvement, education, and marketing purposes where
            permitted by law.
          </P>
          <P>
            Identifiable external marketing use of a VIP Pro Member&apos;s
            name, face, voice, Discord username, gamertag, testimonial,
            quote, or identifiable gameplay footage requires written
            consent as described in Section 13.
          </P>
          <P>
            A Member may withdraw permission for future identifiable
            marketing use by written notice to Game Launch, LLC. Withdrawal
            applies prospectively and does not require Game Launch, LLC to
            remove materials already published, distributed, incorporated
            into existing content, or otherwise in circulation before the
            withdrawal date, except where required by applicable law.
          </P>

          <H3>4.8 Alumni Tier and Locked Pricing</H3>
          <P>
            A VIP Pro Member becomes eligible for the Alumni Tier upon the
            earlier of:
          </P>
          <UL>
            <li>(a) achieving a Rank-Up while in active VIP Pro membership with all Compliance Requirements satisfied through the date of Rank-Up; or</li>
            <li>(b) completing the full 45-day Program Term with all applicable Compliance Requirements satisfied.</li>
          </UL>
          <P>
            Eligible Alumni Tier Members may elect to continue VIP Pro
            membership at a locked rate of $497.00 USD every ninety-one
            (91) days in lieu of the standard $199.00 USD every 30-day
            Continued Membership cadence.
          </P>
          <P>
            Unless Game Launch, LLC states otherwise in writing, Alumni
            Tier Members receive the same Continued Membership deliverables
            described in Section 4.3, measured over each ninety-one (91)
            day Alumni Tier billing period: three (3) Coaching Sessions,
            three (3) Async Reviews, and three (3) Accountability
            Check-Ins. Alumni Tier deliverables are subject to the
            scheduling, expiration, no-show, late cancellation, and
            non-rollover rules in Sections 9 and 10.
          </P>
          <P>
            The Alumni Tier rate is grandfathered for the eligible Alumni
            Tier Member for the duration of continuous active Alumni Tier
            membership and applies regardless of later price increases to
            standard VIP Pro pricing.
          </P>
          <P>
            The Alumni Tier rate ceases to apply if the Member&apos;s VIP
            Pro or Alumni Tier membership lapses, is cancelled, is
            terminated, is removed for non-payment, is removed under
            Section 4.6, or otherwise becomes inactive for any reason.
            Re-enrollment after a lapse is at then-current standard pricing
            unless Game Launch, LLC agrees otherwise in writing.
          </P>
          <P>
            Game Launch, LLC may require the Member to affirmatively elect
            Alumni Tier pricing before the end of the Program Term or
            within a reasonable election window communicated to the Member.
          </P>

          {/* 5 */}
          <H2 id="eligibility">5. Eligibility Requirements</H2>

          <H3>5.1 Age Requirements</H3>
          <P>You must be at least sixteen (16) years old to use the Services.</P>
          <P>
            Users under thirteen (13) years old are not permitted to
            purchase, enroll in, or use paid Services. If we learn that a
            user under thirteen (13) has accessed the Services or submitted
            personal information without legally required parental consent,
            we may remove access and take appropriate steps as required by
            law.
          </P>
          <P>
            If you are between sixteen (16) and eighteen (18) years old,
            you represent that you have obtained parental or guardian
            consent to use the Services and that your parent or guardian
            has reviewed and agreed to these Terms on your behalf.
          </P>
          <P>
            Paid coaching Services for minors may require additional parent
            or guardian consent, account verification, or approval by Game
            Launch, LLC.
          </P>
          <P>
            VIP Pro is available only to individuals who are at least
            eighteen (18) years old, unless Game Launch, LLC approves an
            exception in writing and receives any legally required parent
            or guardian consent.
          </P>

          <H3>5.2 Technical Requirements</H3>
          <P>
            To use the Services, you must have the technical equipment,
            accounts, and access reasonably necessary for the applicable
            Service.
          </P>
          <P>At minimum:</P>
          <UL>
            <li>(a) all Services require a Discord account and stable internet access;</li>
            <li>(b) all paid Services require a valid payment method and a Metafy, Whop, or other approved payment account when required;</li>
            <li>(c) Clubhouse access may be available through PC or console where compatible with the applicable Service;</li>
            <li>(d) all Coaching Sessions require the ability to attend live video, voice, screen-share, or similar sessions, with webcam optional unless otherwise stated and audio required;</li>
            <li>(e) VIP Pro and Bootcamp products require the ability to submit Rocket League replay files, gameplay clips, screenshots, tracker information, Ballchasing information when requested, or other materials reasonably requested for coaching or verification;</li>
            <li>(f) Bootcamp Pro, Bootcamp Unlimited, Bootcamp Off-Season, VIP Pro, and other coaching Services may require PC access with stable internet, Medal.tv or another approved clip-sharing tool, BakkesMod from bakkesmod.com, replay platforms, tracker platforms, or other tools communicated during enrollment or onboarding.</li>
          </UL>
          <P>
            Failure to maintain required accounts, tools, permissions, or
            access may limit our ability to deliver the Services and does
            not automatically entitle you to a refund.
          </P>

          <H3>5.3 Eligibility and Approval Process</H3>
          <P>
            Some Services, including VIP Pro and Bootcamp products, may
            require completion of an application, interview, onboarding
            call, or approval process before access is granted.
          </P>
          <P>
            Game Launch, LLC may decline any application at its sole
            discretion, subject to applicable law. Acceptance may be based
            on factors including age, technical readiness, rank, maturity,
            coach fit, schedule fit, payment status, community fit, account
            standing, and commitment level.
          </P>
          <P>
            Rank-related eligibility for the VIP Pro Rank-Up Guarantee is
            described in Section 4.4.
          </P>

          {/* 6 */}
          <H2 id="registration">6. Registration and Account</H2>

          <H3>6.1 Account Creation</H3>
          <P>To access the Services, you may need to create or maintain:</P>
          <UL>
            <li>An account through our website or checkout flow.</li>
            <li>A Discord account to join our community servers.</li>
            <li>A Metafy, Whop, or other approved account for payments and access management.</li>
            <li>A Calendly or other scheduling account or booking profile when required.</li>
            <li>A Rocket League account and tracker profile when required for coaching or verification.</li>
          </UL>
          <P>
            You agree to provide accurate, current, and complete information
            during registration, checkout, onboarding, and support
            interactions. You agree to keep your information updated.
          </P>

          <H3>6.2 Account Security</H3>
          <P>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            accounts. You agree to notify us immediately of any
            unauthorized use of your account, payment method, Discord
            account, Rocket League account, or other account used in
            connection with the Services.
          </P>

          <H3>6.3 Account Termination</H3>
          <P>
            We may suspend, restrict, or terminate your account or access
            to the Services at our sole discretion, subject to applicable
            law, for conduct that we determine violates these Terms,
            violates Platform rules, creates risk for other users, disrupts
            the Services, harms Game Launch, LLC, or harms any third party.
          </P>
          <P>
            Termination may result in loss of access, forfeiture of unused
            services, loss of grandfathered pricing, loss of Alumni Tier
            eligibility, loss of Rank-Up Guarantee eligibility, and loss of
            any accumulated benefits, except where a refund or other remedy
            is required by law or expressly provided in these Terms.
          </P>

          <H3>6.4 Membership Cancellation</H3>
          <P>
            You may cancel your membership by using the official online
            cancellation flow made available by the applicable checkout or
            subscription platform, by using any cancellation method made
            available through that platform, or by contacting support
            through the official support ticket system or another official
            support channel.
          </P>
          <P>
            Cancellation submitted through the official online cancellation
            flow is effective when submitted. Cancellation submitted
            through support is effective when received by us, subject to
            any payment already initiated by the payment processor.
          </P>
          <P>
            We will not require you to speak with a representative, attend
            a call, complete a survey, or accept a retention offer in order
            to cancel an online subscription.
          </P>
          <P>
            If you cancel and no refund is issued, you retain access to the
            applicable paid Services until the end of the then-current paid
            billing period, unless your access is terminated earlier for
            violation of these Terms.
          </P>
          <P>
            If a refund is issued, your access ends immediately upon refund
            approval unless Game Launch, LLC states otherwise in writing.
          </P>
          <P>
            Cancellation stops future renewal charges. Cancellation does
            not create a partial refund for any unused portion of the
            current billing period unless expressly provided in these Terms
            or required by law.
          </P>
          <P>
            Cancellation may result in forfeiture of grandfathered pricing,
            Alumni Tier pricing, accumulated benefits, unused deliverables,
            and any promotional pricing.
          </P>
          <P>
            If you rejoin after cancellation, lapse, termination, or
            non-payment, current market rates and current Terms will apply
            unless Game Launch, LLC agrees otherwise in writing.
          </P>

          {/* 7 */}
          <H2 id="payment">7. Payment Terms</H2>

          <H3>7.1 Pricing and Payment Options</H3>
          <P>
            Current membership fees and other charges will be disclosed
            before purchase through our website, Discord, checkout pages,
            Whop, Metafy, application calls, onboarding materials, or other
            official sales channels.
          </P>
          <P>
            <strong>VIP Pro Experience.</strong> VIP Pro is billed at
            $497.00 USD up front for the initial 45-day Program Term,
            followed by $199.00 USD every thirty (30) days on a recurring
            basis until cancelled. Recurring billing begins on day 46
            following the initial payment unless cancelled before renewal
            or unless Game Launch, LLC states otherwise in writing. Members
            who reach Alumni Tier status under Section 4.8 may elect to
            continue at $497.00 USD every ninety-one (91) days in lieu of
            the standard $199.00 USD every 30-day cadence.
          </P>
          <P>
            <strong>Clubhouse, Bootcamp, and other Services.</strong>{" "}
            Pricing, billing cycle, trial terms, activation fees, and
            included services for Clubhouse, Bootcamp, Academy upgrades,
            and any other Services are disclosed before purchase and may
            vary by offer, platform, plan, promotion, or enrollment date.
          </P>
          <P>
            <strong>Activation fees.</strong> A one-time activation fee may
            be charged upon initial registration for certain membership
            tiers. A reactivation fee may apply if your account becomes
            inactive, cancelled, lapsed, or inactive for four (4) weeks or
            longer and you later choose to reactivate. Any activation or
            reactivation fee will be disclosed before purchase.
          </P>
          <P>
            <strong>Currency.</strong> All prices are in U.S. Dollars
            unless clearly stated otherwise. Taxes are not included in
            quoted prices unless expressly stated and may be added at
            checkout as required by law.
          </P>

          <H3>7.2 How Membership Billing Works</H3>
          <P>
            Before purchase, the checkout page will disclose the material
            subscription terms for the applicable Service, including price,
            billing frequency, renewal timing, trial or promotional terms
            if any, and cancellation method.
          </P>
          <P>
            For VIP Pro, checkout will disclose that the initial charge is
            $497.00 USD for the initial 45-day Program Term and that,
            unless cancelled before renewal, the membership renews on day
            46 at $199.00 USD every thirty (30) days until cancelled,
            unless Alumni Tier pricing or another written arrangement
            applies. If a Rank-Up Guarantee is offered, checkout, the sales
            page, onboarding materials, or the written enrollment
            disclosure will identify the applicable Guarantee Window and
            Program requirements for that offer.
          </P>
          <P>
            For any free trial, discounted period, or promotional period,
            checkout will disclose the trial length or promotional period,
            renewal price, billing frequency, first charge date, and
            cancellation method before purchase. Where required by law, we
            will send a reminder notice before the trial, discount, or
            promotional period converts to paid or standard pricing.
          </P>
          <P>
            Memberships automatically bill according to the billing cycle
            selected or disclosed at signup.
          </P>
          <P>
            By signing up, enrolling, starting a free trial, or purchasing
            a membership, you authorize us and our payment processors to
            charge your payment method for all applicable fees, taxes, and
            charges until you cancel properly.
          </P>
          <P>
            You are responsible for all charges until the cancellation
            process is properly completed.
          </P>
          <P>
            All payments are processed through third-party Platforms such
            as Metafy, Whop, Stripe, PayPal, or other payment processors.
            Available payment methods may include PayPal and major credit
            cards where accepted by the applicable Platform. You agree to
            follow the payment terms and policies of those Platforms.
          </P>
          <P>
            Initiating a chargeback, payment dispute, or payment reversal
            without first attempting to resolve the issue through our
            support process may constitute a material breach of these
            Terms. We reserve the right to submit evidence, dispute the
            chargeback, suspend or terminate access, revoke benefits, and
            pursue collection of unpaid amounts where appropriate.
          </P>

          <H3>7.3 Price Changes and Grandfathered Pricing</H3>
          <P>
            We may change prices for the Services at any time. If a price
            change affects an active recurring membership, we will provide
            notice by email, Discord, Platform notice, or another
            reasonable method at least fourteen (14) days before the change
            takes effect, unless a longer notice period is required by law.
          </P>
          <P>
            If you continue using the Services after the price change takes
            effect, you agree to pay the new rate.
          </P>
          <P>
            Members with active memberships may be eligible for
            grandfathered pricing, meaning they keep their original
            membership rate as long as the membership remains active and
            uninterrupted.
          </P>
          <P>You may lose grandfathered pricing if you:</P>
          <UL>
            <li>(a) cancel your membership;</li>
            <li>(b) change to a different membership tier;</li>
            <li>(c) allow your membership to lapse or become inactive;</li>
            <li>(d) fail to pay when due;</li>
            <li>(e) are removed for violation of these Terms; or</li>
            <li>(f) otherwise lose eligibility under the terms of the offer.</li>
          </UL>
          <P>
            Price changes will not apply retroactively to periods already
            paid for.
          </P>

          <H3>7.4 Taxes and Additional Fees</H3>
          <P>
            Listed prices do not include applicable taxes unless expressly
            stated.
          </P>
          <P>
            Depending on your location, sales tax, VAT, or other taxes may
            be added at checkout as required by law.
          </P>
          <P>
            We do not control third-party fees. You may incur additional
            fees from your bank, credit card provider, PayPal, Whop,
            Metafy, payment processors, currency conversion, foreign
            transaction fees, or other third parties.
          </P>

          {/* 8 — REFUND POLICY (deep-linked from /checkout) */}
          <H2 id="refund-policy">8. Refund Policy</H2>

          <H3>8.1 When You Can Request a Refund</H3>
          <P>
            Refunds are available only under the specific circumstances
            described in these Terms or as required by applicable law.
          </P>
          <P>We may offer the following refund rights:</P>
          <UL>
            <li>(a) <strong>Service cancellation by us.</strong> If we cancel a paid Service before delivering any material part of the Service for the applicable billing period, we may issue a full or prorated refund depending on the circumstances.</li>
            <li>(b) <strong>Clubhouse satisfaction guarantee.</strong> If offered at purchase, first-time Clubhouse Members may request a refund within the disclosed satisfaction guarantee window, typically thirty (30) days from first paid access, subject to the limits disclosed at purchase and in these Terms.</li>
            <li>(c) <strong>Bootcamp satisfaction guarantee.</strong> If offered at purchase, first-time Bootcamp Members may request a refund within the disclosed satisfaction guarantee window, typically seven (7) days from first paid access, subject to the limits disclosed at purchase and in these Terms.</li>
            <li>(d) <strong>VIP Pro Money-Back Guarantee.</strong> VIP Pro refund rights are governed by Section 4.5. Section 4.5 controls over this Section 8 for VIP Pro.</li>
          </UL>

          <H3>8.2 When Refunds Are Not Available</H3>
          <P>
            Unless expressly stated otherwise in these Terms or required by
            law, refunds are not available for:
          </P>
          <UL>
            <li>Missed sessions.</li>
            <li>No-shows.</li>
            <li>Late cancellations.</li>
            <li>Failure to schedule available Coaching Sessions, Async Reviews, events, or other included services.</li>
            <li>Services already delivered, conducted, reserved, allocated, or made available.</li>
            <li>Unused services after the applicable billing cycle has started.</li>
            <li>Dissatisfaction with coaching results, rank improvement, gameplay performance, or personal progress.</li>
            <li>Membership payments after the applicable refund window has passed.</li>
            <li>Account suspension or termination due to violation of these Terms or the Code of Conduct.</li>
            <li>Free trial periods.</li>
            <li>Activation fees, unless we cancel the Service before delivery or applicable law requires otherwise.</li>
          </UL>

          <H3>8.3 How to Request a Refund</H3>
          <P>
            All refund requests must be submitted in writing through our
            support ticket system or another official support channel
            designated by Game Launch, LLC.
          </P>
          <P>
            Your request should include your order or membership details,
            the applicable Service, the payment date, and the reason for
            the request.
          </P>
          <P>
            Approved refunds are processed back to the original payment
            method within five (5) to ten (10) Business Days unless a
            different timeline is stated in the applicable product-specific
            refund section. Actual receipt may depend on your payment
            provider, bank, card issuer, Whop, Metafy, PayPal, or other
            payment processor.
          </P>

          {/* 9 */}
          <H2 id="scheduling">9. Session Scheduling, Attendance, and Forfeiture</H2>

          <H3>9.1 How to Schedule Coaching Sessions</H3>
          <P>
            All Coaching Sessions must be scheduled through our official
            booking system, such as Calendly or another scheduling tool
            designated by Game Launch, LLC.
          </P>
          <P>
            We recommend scheduling sessions at least forty-eight (48)
            hours in advance to secure a preferred time slot. Session times
            are subject to coach availability and are not guaranteed for
            specific days, times, or time zones.
          </P>
          <P>
            Standard Coaching Sessions are sixty (60) minutes unless
            otherwise specified for your membership tier or offer.
          </P>
          <P>Session cadence varies by product:</P>
          <UL>
            <li>Bootcamp Pro Members generally receive bi-weekly Coaching Sessions.</li>
            <li>Bootcamp Unlimited Members may schedule Coaching Sessions subject to the cooldown period, booking limits, and coach availability.</li>
            <li>Bootcamp Off-Season Members generally receive one Coaching Session every four weeks.</li>
            <li>VIP Pro Members receive Coaching Sessions according to Section 4.3, Section 4.4, or Section 4.8, depending on their status.</li>
          </UL>
          <P>
            Unless Game Launch, LLC approves otherwise in writing, Members
            may not have more than two (2) future Coaching Sessions booked
            at any time.
          </P>

          <H3>9.2 If You Need to Cancel or Reschedule</H3>
          <P>
            You must cancel or reschedule at least twenty-four (24) hours
            before your scheduled Coaching Session, Accountability
            Check-In, or other scheduled call.
          </P>
          <P>
            Sessions, check-ins, or calls cancelled with less than
            twenty-four (24) hours&apos; notice may be considered used and
            forfeited. No refund, replacement session, or extension is
            required for late cancellations.
          </P>
          <P>
            To cancel or reschedule, use the cancellation or rescheduling
            function in the official booking system and notify your coach
            or support team when reasonably possible.
          </P>

          <H3>9.3 If Your Coach Cancels</H3>
          <P>
            If your coach needs to cancel a scheduled Coaching Session, we
            will work with you to reschedule at a reasonably available
            time. We may notify you of coach cancellations through Discord,
            email, the official booking system, or another reasonable
            method.
          </P>
          <P>
            If your assigned coach becomes unavailable for an extended
            period, we may reassign you to another coach based on
            availability, fit, and operational needs.
          </P>
          <P>
            Coach cancellations do not count as Member no-shows, late
            cancellations, or failure to comply with VIP Pro Compliance
            Requirements.
          </P>

          <H3>9.4 Extension Requests</H3>
          <P>
            Extensions may be granted for repeated coach cancellations,
            documented emergencies, extended travel, military deployment,
            medical events, platform outages, or other circumstances
            approved by Game Launch, LLC.
          </P>
          <P>
            Extension requests must be submitted through the support ticket
            system or another official support channel within five (5)
            days of the relevant event unless impossible under the
            circumstances.
          </P>
          <P>
            Approval is at our sole discretion and is not guaranteed.
          </P>

          <H3>9.5 Cooldown Period</H3>
          <P>
            Bootcamp Unlimited and any other plan described as subject to a
            cooldown period require a mandatory seventy-two (72) hour
            cooldown period between completed Coaching Sessions.
          </P>
          <P>
            The cooldown period begins at the end of the completed Coaching
            Session.
          </P>
          <P>
            The cooldown period exists to provide adequate time to
            practice, implement coaching advice, and prevent unreasonable
            use of coach availability.
          </P>
          <P>
            Individual coaches do not have authority to waive or modify the
            cooldown period unless Game Launch, LLC approves the exception
            in writing.
          </P>

          <H3>9.6 No-Show and Late Arrival Policy</H3>
          <P>
            A &quot;no-show&quot; occurs when you fail to attend a
            scheduled Coaching Session, Accountability Check-In, onboarding
            call, or other scheduled call without timely cancellation.
          </P>
          <P>
            Coaches or staff will generally wait fifteen (15) minutes from
            the scheduled start time before marking a session as a no-show.
          </P>
          <P>
            If you arrive more than ten (10) minutes late, the coach or
            staff member may treat the session as a late arrival, shorten
            the session, or mark the session as forfeited, depending on the
            circumstances and remaining time.
          </P>
          <P>
            Repeated no-shows, late arrivals, or late cancellations may
            result in scheduling restrictions, loss of sessions, loss of
            refund rights, loss of guarantee eligibility, suspension, or
            termination.
          </P>
          <P>
            No-show designations may be appealed through the support system
            within forty-eight (48) hours.
          </P>

          <H3>9.7 Service Allocation and Expiration</H3>
          <P>
            When a billing cycle begins, the services included in your plan
            are allocated or made available for that cycle. Included
            services may include Coaching Sessions, Async Reviews, group
            events, community access, training resources, accountability
            support, or other benefits.
          </P>
          <P>
            Unless expressly stated otherwise in writing, unused included
            services expire at the end of the billing cycle or program
            period in which they were allocated. Unused sessions, reviews,
            check-ins, calls, benefits, and access rights do not roll over
            to later cycles.
          </P>
          <P>
            Included services also expire when a membership ends, is
            cancelled, lapses, is refunded, is terminated, or is removed
            for violation of these Terms.
          </P>
          <P>
            No refund is issued for expired, unused, unscheduled, missed,
            late-cancelled, or forfeited services, except where expressly
            provided in these Terms or required by law.
          </P>

          {/* 10 */}
          <H2 id="coach-availability">10. Coach Availability and Service Limitations</H2>

          <H3>10.1 Coach Response Times</H3>
          <P>
            Coach communication availability depends on the applicable
            Service, membership tier, coach schedule, and operational
            capacity.
          </P>
          <P>
            Bootcamp Pro, Bootcamp Unlimited, and Bootcamp Off-Season
            Members receive 24/5 between-session coach messaging unless
            Game Launch, LLC states otherwise in writing. Members may send
            messages at any time, and coaches typically respond within
            twenty-four (24) hours during their designated Coach Working
            Days, subject to the plan terms, coach schedule, and coach
            availability.
          </P>
          <P>
            VIP Pro Members receive Coaching Sessions, Async Reviews,
            Accountability Check-Ins, training routines, and support as
            described in Section 4. VIP Pro does not include unlimited
            direct messaging access to a coach unless expressly stated in
            writing.
          </P>
          <P>
            Clubhouse Members receive community access and group support as
            described for Clubhouse. Clubhouse does not include direct
            one-on-one coach messaging unless expressly stated in writing.
          </P>

          <H3>10.2 Session Availability</H3>
          <P>
            Session times are subject to coach availability, booking
            windows, calendar capacity, time zones, holidays, Platform
            availability, and operational needs. Unless otherwise stated in
            writing, Members may generally schedule Coaching Sessions up to
            fourteen (14) days in advance.
          </P>
          <P>
            Prime-time slots, evenings, and weekends may be limited and may
            require earlier booking.
          </P>
          <P>
            We do not guarantee any specific coach, date, time, time zone,
            or coaching style unless expressly agreed in writing.
          </P>

          <H3>10.3 Service Limitations</H3>
          <P>
            Coaching Sessions focus on Rocket League skills, strategy,
            gameplay review, training structure, mindset related to
            gameplay improvement, and implementation of coaching feedback.
          </P>
          <P>
            Coaches are not obligated to address unrelated topics, personal
            matters, technical support outside the scope of the Services,
            business advice, medical advice, legal advice, financial
            advice, or mental health counseling.
          </P>
          <P>
            We may reassign coaches based on availability, specialization,
            scheduling, Member fit, operational needs, or staff changes.
          </P>
          <P>
            Coaches, contractors, moderators, guides, hosts, and support
            staff do not have authority to modify these Terms, waive
            payment obligations, grant refunds, promise results, change
            guarantee eligibility, change membership benefits, or alter
            scheduling rules unless confirmed in writing by Game Launch,
            LLC through an official administrative or support channel.
          </P>
          <P>
            Our ability to provide Services may be affected by third-party
            Platforms, including Discord, Metafy, Whop, Calendly, payment
            processors, Rocket League, Epic Games, tracker platforms,
            replay platforms, internet service providers, and other
            systems outside our control. If a Platform becomes unavailable,
            we may use email, Discord, or another reasonable backup
            communication method when available.
          </P>

          <H3>10.4 Force Majeure</H3>
          <P>
            We are not responsible for delay, interruption, or failure to
            perform caused by circumstances beyond our reasonable control,
            including:
          </P>
          <UL>
            <li>Internet outages.</li>
            <li>Server outages.</li>
            <li>Natural disasters.</li>
            <li>Public emergencies.</li>
            <li>Acts of war, terrorism, civil unrest, or government action.</li>
            <li>Labor disputes or supply disruptions.</li>
            <li>Rocket League server issues or game updates.</li>
            <li>Discord, Metafy, Whop, Calendly, tracker platform, replay platform, or payment processor downtime.</li>
            <li>Coach illness, emergency, or unavailability where we use commercially reasonable efforts to reschedule or reassign.</li>
          </UL>
          <P>
            Where appropriate, we may reschedule affected sessions, extend
            deadlines, provide alternate delivery methods, or adjust
            delivery timelines at our reasonable discretion.
          </P>

          <H3>10.5 Company-Caused Service Failure</H3>
          <P>
            If Game Launch, LLC is unable to provide a material paid
            deliverable during the applicable billing cycle or program
            period for reasons within our reasonable control, we may
            provide a replacement session, extension, Store Credit,
            prorated refund, or another reasonable remedy. This does not
            apply to Member no-shows, late cancellations, failure to
            schedule, Platform outages, or force majeure events.
          </P>

          {/* 11 */}
          <H2 id="conduct">11. Code of Conduct</H2>

          <H3>11.1 General Conduct</H3>
          <P>You agree to:</P>
          <UL>
            <li>Follow all rules established in our Discord servers, community spaces, events, sessions, support channels, and onboarding materials.</li>
            <li>Treat coaches, staff, moderators, hosts, guides, and fellow Members with respect.</li>
            <li>Use appropriate language and refrain from disruptive behavior.</li>
            <li>Comply promptly with reasonable instructions from moderators, hosts, guides, coaches, and Game Launch, LLC representatives.</li>
            <li>Participate in the Services in good faith.</li>
            <li>Respect the time, boundaries, and availability of coaches, staff, and other Members.</li>
          </UL>

          <H3>11.2 Prohibited Conduct</H3>
          <P>You agree not to:</P>
          <UL>
            <li>Harass, abuse, threaten, bully, intimidate, stalk, or harm other users, coaches, staff, moderators, hosts, guides, or third parties.</li>
            <li>Use offensive, discriminatory, hateful, sexually explicit, violent, or otherwise inappropriate language or content.</li>
            <li>Use slurs or engage in conduct targeting race, ethnicity, national origin, religion, sex, gender, sexual orientation, disability, age, language, accent, country, or other protected or personal characteristics.</li>
            <li>Disrupt Coaching Sessions, Accountability Check-Ins, events, group classes, Discord channels, support channels, or community communications.</li>
            <li>Engage in conduct that negatively affects another user&apos;s experience or the safety of the community.</li>
            <li>Attempt to manipulate, exploit, or abuse any aspect of the Services, Platforms, ranking systems, payments, refunds, guarantees, or support processes.</li>
            <li>Share, sell, loan, transfer, or misuse account credentials.</li>
            <li>Use smurf accounts, boosted accounts, purchased accounts, borrowed accounts, shared accounts, cheats, exploits, automation, or unauthorized third-party tools in connection with the Services.</li>
            <li>Circumvent scheduling rules, cooldown periods, booking limits, access controls, role permissions, or other service limitations.</li>
            <li>Submit false, edited, misleading, incomplete, or unverifiable evidence, screenshots, replays, tracker data, payment information, or support information.</li>
            <li>Record, stream, publish, distribute, or share Coaching Sessions, group sessions, private Discord content, community content, or other Service content without written permission.</li>
            <li>Solicit Members for competing services, spam Members, scrape Member data, or use the community for unauthorized commercial activity.</li>
            <li>Violate any applicable Platform terms, Rocket League rules, Discord rules, Metafy rules, Whop rules, payment processor rules, or applicable law.</li>
          </UL>

          <H3>11.3 Consequences</H3>
          <P>
            Violation of these conduct rules may result in one or more of
            the following:
          </P>
          <UL>
            <li>Warning.</li>
            <li>Message deletion or content removal.</li>
            <li>Temporary restriction from channels, events, sessions, or community spaces.</li>
            <li>Temporary suspension from the Services.</li>
            <li>Scheduling restrictions.</li>
            <li>Loss of Coaching Sessions, Async Reviews, Accountability Check-Ins, events, roles, or other benefits.</li>
            <li>Loss of refund rights, Store Credit, grandfathered pricing, Alumni Tier eligibility, Rank-Up Guarantee eligibility, or Extended Coaching Period eligibility.</li>
            <li>Immediate termination of your account or membership.</li>
            <li>Permanent ban from some or all Game Launch, LLC Services.</li>
          </UL>
          <P>
            We may use progressive discipline for minor violations, but we
            are not required to do so. We may immediately terminate or
            remove any Member for severe violations, repeated violations,
            bad-faith conduct, threats, harassment, discriminatory conduct,
            payment fraud, chargebacks, guarantee manipulation, or conduct
            we reasonably determine creates risk for the community, staff,
            other Members, Platforms, or Game Launch, LLC.
          </P>

          {/* 12 */}
          <H2 id="ip">12. Intellectual Property</H2>

          <H3>12.1 Our Ownership</H3>
          <P>
            All Content and intellectual property created, owned, licensed,
            or used by Game Launch, LLC is the exclusive property of Game
            Launch, LLC or its licensors, including but not limited to:
          </P>
          <UL>
            <li>Coaching methodologies, frameworks, systems, and techniques.</li>
            <li>Video guides, written guides, educational content, and training plans.</li>
            <li>Training materials, resources, documents, worksheets, checklists, and templates.</li>
            <li>Community events, event formats, server systems, onboarding systems, and coaching systems.</li>
            <li>Website content, copy, graphics, logos, branding, product names, and visual assets.</li>
            <li>Recordings, edited coaching content, lesson structures, replay review formats, and training routines.</li>
          </UL>
          <P>
            The Content is protected by copyright, trademark, trade secret,
            contract, and other intellectual property laws.
          </P>

          <H3>12.2 Limited License to Use</H3>
          <P>
            Subject to these Terms and your active access rights, we grant
            you a limited, non-exclusive, non-transferable, non-sublicensable,
            revocable license to access and use the Services and Content
            for your personal, non-commercial use only.
          </P>
          <P>
            This license ends when your membership ends, your access is
            removed, your account is terminated, or we revoke the license
            under these Terms.
          </P>

          <H3>12.3 Restrictions</H3>
          <P>You agree not to:</P>
          <UL>
            <li>Copy, modify, reproduce, republish, upload, post, transmit, sell, lease, license, distribute, or create derivative works from any Content without our express written permission.</li>
            <li>Reverse engineer, decompile, disassemble, scrape, extract, or attempt to obtain the source code, underlying systems, workflows, or proprietary methods of the Services.</li>
            <li>Share, leak, post, or redistribute coaching materials, videos, recordings, Discord content, training routines, internal documents, templates, or member-only resources.</li>
            <li>Record, stream, upload, publish, or share Coaching Sessions, group sessions, events, private calls, or private communications without our express written permission.</li>
            <li>Use the Services or Content to create, train, market, or operate a competing coaching, education, community, or training service.</li>
          </UL>

          <H3>12.4 User Content</H3>
          <P>
            By submitting User Content to Game Launch, LLC, its coaches,
            staff, communities, support systems, or Platforms, you grant
            Game Launch, LLC a worldwide, non-exclusive, royalty-free,
            sublicensable, transferable license to use, reproduce, modify,
            adapt, display, analyze, and create derivative works from that
            User Content in connection with providing, improving,
            protecting, enforcing, and supporting the Services.
          </P>
          <P>
            This license includes the right to use gameplay clips, replays,
            screenshots, questions, feedback, progress results,
            communications, and other submitted materials for coaching
            delivery, product improvement, quality assurance, dispute
            resolution, safety, compliance, enforcement, support, and
            internal training. External marketing use is governed by
            Section 13 and any product-specific rules in Section 4.
          </P>
          <P>
            You represent that you have all rights necessary to submit User
            Content and grant the license described in this Section 12.4.
          </P>

          {/* 13 */}
          <H2 id="recordings">13. Recordings, Testimonials, and Marketing Use</H2>

          <H3>13.1 Session and Event Recordings</H3>
          <P>
            We may record Coaching Sessions, Accountability Check-Ins,
            onboarding calls, application calls, support calls,
            consultations, interviews, group classes, community events, and
            similar communications with Game Launch, LLC staff for coaching
            delivery, quality assurance, internal training, safety, dispute
            resolution, compliance, and product improvement.
          </P>

          <H3>13.2 Recording Consent</H3>
          <P>
            Where practical, we will provide notice that a session, call,
            or event is being recorded. By remaining in the session, call,
            or event after notice is provided, you consent to the recording.
          </P>
          <P>
            If you do not consent to recording, you must notify us in
            writing before any communication, session, event, or call takes
            place. We may be unable to provide some Services if recording
            is required for delivery, quality assurance, safety, compliance,
            or dispute resolution.
          </P>

          <H3>13.3 Internal Use</H3>
          <P>
            We may use recordings, gameplay clips, replays, screenshots,
            questions, feedback, progress information, communications, and
            other submitted materials for internal training, coaching
            delivery, product improvement, quality assurance, safety,
            compliance, support, dispute resolution, and enforcement.
          </P>

          <H3>13.4 External Marketing Use</H3>
          <P>
            We will not use your name, face, voice, Discord username,
            gamertag, testimonial, quote, or identifiable gameplay footage
            in external marketing without your written consent, except for
            public community activity or de-identified information as
            permitted by law.
          </P>
          <P>
            Written consent may be collected through email, support ticket,
            checkbox, testimonial form, media release, or another written
            method approved by Game Launch, LLC. No Member is required to
            provide a testimonial or marketing consent as a condition of
            receiving the Services.
          </P>
          <P>
            For Members under eighteen (18), identifiable external
            marketing use requires written consent from a parent or legal
            guardian where required by law.
          </P>

          <H3>13.5 Public Community Activity and De-Identified Results</H3>
          <P>
            Leaderboards, event participation, rank data, public Discord
            activity, community contributions, and gameplay results may be
            public within our communities. We may use anonymized,
            aggregated, or de-identified outcomes and training examples for
            education, internal training, product improvement, and
            marketing where permitted by law.
          </P>

          <H3>13.6 Opt-Out Requests</H3>
          <P>
            You may request that we stop using your identifiable recordings,
            testimonials, quotes, or progress information in future
            marketing materials by contacting support in writing.
          </P>
          <P>
            Unless required by law, an opt-out applies prospectively only
            and does not require us to remove materials that were already
            published, distributed, incorporated into existing content,
            used in paid advertisements, or otherwise in circulation before
            the opt-out request was received.
          </P>

          <H3>13.7 Testimonials and Results</H3>
          <P>
            Testimonials, rank changes, progress examples, before-and-after
            examples, MMR changes, and other results reflect individual
            experiences and do not guarantee that current or future Members
            will achieve the same results. Marketing materials must not
            imply that a result is typical unless Game Launch, LLC has a
            reasonable basis for that claim and provides appropriate context
            or disclosure where required by law.
          </P>

          {/* 14 */}
          <H2 id="privacy">14. Privacy and Data Collection</H2>
          <P>
            This Section 14 serves as our privacy policy for the Services.
            It explains what personal information we collect, how we use
            it, how we share it, how long we retain it, and what privacy
            rights may apply to you. By accessing, purchasing, enrolling
            in, or using the Services, you acknowledge the privacy
            practices described in this Section 14.
          </P>
          <P>
            We do not knowingly allow children under thirteen (13) years
            old to purchase, enroll in, or use paid Services. If we learn
            that we have collected personal information from a child under
            thirteen (13) without legally required parental consent, we
            will take appropriate steps to delete or limit that information
            as required by law.
          </P>

          <H3>14.1 Information We Collect</H3>
          <P>
            We collect and process personal information as necessary to
            provide, manage, improve, protect, and enforce the Services.
            Information we collect may include:
          </P>
          <UL>
            <li>Contact information, including name, email, Discord ID, and username.</li>
            <li>Payment and subscription information, subject to the policies of our payment processors.</li>
            <li>Rocket League account information, gamertags, rank, MMR, match history, replay files, clips, tracker information, and gameplay statistics.</li>
            <li>Communications with coaches, staff, support, moderators, guides, hosts, and other Members.</li>
            <li>Session recordings, support recordings, application recordings, call notes, coaching notes, and training materials.</li>
            <li>Discord activity, support ticket activity, attendance records, scheduling records, and account access records.</li>
            <li>Technical information related to access, security, troubleshooting, and Platform usage.</li>
          </UL>

          <H3>14.2 How We Use Information</H3>
          <P>We use information to:</P>
          <UL>
            <li>Provide, maintain, and improve the Services.</li>
            <li>Process payments, manage subscriptions, and administer accounts.</li>
            <li>Verify eligibility, rank, MMR, attendance, compliance, and guarantee status.</li>
            <li>Communicate with you about the Services.</li>
            <li>Deliver coaching, feedback, training routines, support, events, and community access.</li>
            <li>Analyze and improve coaching effectiveness, product quality, and Member outcomes.</li>
            <li>Enforce these Terms, protect the community, prevent abuse, and resolve disputes.</li>
            <li>Comply with legal obligations and Platform requirements.</li>
          </UL>

          <H3>14.3 Information Sharing</H3>
          <P>We do not sell your personal information.</P>
          <P>We may share information:</P>
          <UL>
            <li>With coaches, staff, contractors, moderators, guides, and support personnel as necessary to provide the Services.</li>
            <li>With service providers and Platforms that help us operate the Services, including Discord, Metafy, Whop, Calendly, payment processors, analytics tools, tracker platforms, replay platforms, hosting providers, and communication tools.</li>
            <li>With professional advisors, legal counsel, accountants, insurers, or compliance providers.</li>
            <li>If required by law, subpoena, court order, legal process, or governmental request.</li>
            <li>To protect the rights, safety, property, and security of Game Launch, LLC, Members, staff, Platforms, or third parties.</li>
            <li>In connection with a merger, acquisition, financing, restructuring, sale of assets, or change of control.</li>
          </UL>

          <H3>14.4 Data Retention</H3>
          <P>
            We retain personal information, logs, recordings, records, and
            User Content for as long as reasonably necessary for business,
            legal, tax, accounting, safety, compliance, dispute resolution,
            fraud prevention, coaching, product improvement, and enforcement
            purposes.
          </P>
          <P>
            We may retain some information after your membership ends where
            necessary to comply with law, resolve disputes, enforce
            agreements, prevent abuse, preserve business records, or
            maintain security.
          </P>

          <H3>14.5 Privacy Requests</H3>
          <P>
            You may contact support to request access, correction, deletion,
            or other handling of your personal information. We will respond
            as required by applicable law and may need to verify your
            identity before processing a request.
          </P>
          <P>
            Some information may not be deleted if we need it for legal,
            security, dispute resolution, fraud prevention, accounting,
            tax, enforcement, or legitimate business purposes.
          </P>

          <H3>14.6 Cookies, Analytics, and Technical Data</H3>
          <P>
            We and our Platforms or service providers may collect technical
            information such as device information, browser information,
            IP address, log data, referral information, usage activity,
            account access records, and similar technical data for
            security, analytics, troubleshooting, product improvement,
            fraud prevention, and service delivery.
          </P>
          <P>
            We may use cookies, pixels, analytics tools, platform logs, or
            similar technologies where available through our website,
            checkout flow, Discord, Whop, Metafy, hosting providers,
            analytics providers, or other Platforms. Some of these
            technologies are controlled by third-party Platforms, and their
            use may be governed by those Platforms&apos; own terms and
            privacy policies.
          </P>

          <H3>14.7 Payment Information</H3>
          <P>
            Payments are processed by third-party payment processors and
            Platforms such as Whop, Metafy, Stripe, PayPal, or other
            approved providers. We may receive transaction records,
            subscription status, payment status, refund status, chargeback
            information, tax information, and limited billing details. We
            generally do not receive or store full credit card numbers or
            complete payment credentials.
          </P>

          <H3>14.8 International Users</H3>
          <P>
            The Services are operated by Game Launch, LLC in the United
            States. If you access the Services from outside the United
            States, you understand that your information may be processed
            in the United States and other locations where our Platforms,
            contractors, or service providers operate, subject to
            applicable law.
          </P>

          <H3>14.9 Security</H3>
          <P>
            We use reasonable administrative, technical, and organizational
            measures designed to protect personal information. No online
            service, Platform, or transmission method is completely secure.
            You are responsible for maintaining the security of your
            Discord, Whop, Metafy, email, Rocket League, tracker, and other
            accounts used with the Services.
          </P>

          <H3>14.10 Your Privacy Choices and Rights</H3>
          <P>
            Depending on your location, you may have rights to request
            access, correction, deletion, portability, restriction,
            objection, or other handling of your personal information. To
            make a privacy request, open an official Discord support ticket
            or contact{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[var(--accent)] underline-offset-2 transition hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            if Discord access is unavailable. We may need to verify your
            identity before processing a request. We will respond as
            required by applicable law.
          </P>

          <H3>14.11 Changes to This Privacy Section</H3>
          <P>
            We may update this Section 14 from time to time. If we make
            material changes to how we collect, use, or share personal
            information, we will provide notice through a reasonable method
            such as Discord announcement, email, Platform notice, website
            notice, or another appropriate channel.
          </P>

          {/* 15 */}
          <H2 id="warranties">15. Disclaimer of Warranties</H2>
          <P>
            EXCEPT FOR THE EXPRESS VIP PRO RANK-UP GUARANTEE IN SECTION 4.4
            AND THE EXPRESS REFUND RIGHTS IN SECTION 4.5 AND SECTION 8, THE
            SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER
            EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT
            LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </P>
          <P>
            EXCEPT FOR THE EXPRESS VIP PRO RANK-UP GUARANTEE IN SECTION
            4.4, WE DO NOT GUARANTEE ANY SPECIFIC RESULTS FROM THE USE OF
            THE SERVICES, INCLUDING RANK IMPROVEMENT, MMR IMPROVEMENT, SKILL
            ENHANCEMENT, TOURNAMENT RESULTS, MATCH RESULTS, TEAM PLACEMENT,
            PROFESSIONAL OPPORTUNITIES, CONTENT PERFORMANCE, OR ANY OTHER
            GAMEPLAY OR CAREER OUTCOME.
          </P>
          <P>
            WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED,
            TIMELY, SECURE, ERROR-FREE, COMPATIBLE WITH YOUR EQUIPMENT,
            AVAILABLE IN YOUR REGION, OR FREE FROM THIRD-PARTY PLATFORM
            LIMITATIONS.
          </P>
          <P>
            YOUR USE OF THE SERVICES IS AT YOUR OWN RISK. COACHING ADVICE,
            TRAINING ROUTINES, REPLAY FEEDBACK, COMMUNITY ADVICE, AND
            EDUCATIONAL CONTENT ARE PROVIDED FOR INFORMATIONAL AND
            EDUCATIONAL PURPOSES ONLY.
          </P>

          {/* 16 */}
          <H2 id="liability">16. Limitation of Liability</H2>
          <P>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, GAME LAUNCH, LLC, ITS
            OFFICERS, DIRECTORS, MEMBERS, MANAGERS, EMPLOYEES, CONTRACTORS,
            COACHES, MODERATORS, HOSTS, GUIDES, AGENTS, AFFILIATES, AND
            REPRESENTATIVES SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
            DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF DATA, LOSS OF
            GOODWILL, LOSS OF USE, LOSS OF OPPORTUNITY, BUSINESS
            INTERRUPTION, PERSONAL REPUTATION HARM, GAME ACCOUNT
            CONSEQUENCES, RANK LOSS, MMR LOSS, OR OTHER INTANGIBLE LOSSES
            ARISING FROM OR RELATED TO:
          </P>
          <UL>
            <li>YOUR ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE SERVICES.</li>
            <li>ANY CONDUCT OR CONTENT OF ANY USER, MEMBER, COACH, STAFF MEMBER, PLATFORM, OR THIRD PARTY.</li>
            <li>ANY CONTENT, ADVICE, FEEDBACK, TRAINING ROUTINE, OR COACHING PROVIDED THROUGH THE SERVICES.</li>
            <li>ANY UNAUTHORIZED ACCESS TO OR USE OF YOUR ACCOUNT, CONTENT, TRANSMISSIONS, OR DATA.</li>
            <li>ANY TECHNICAL FAILURE, INTERNET ISSUE, PLATFORM OUTAGE, PAYMENT PROCESSOR ISSUE, ROCKET LEAGUE ISSUE, TRACKER ISSUE, OR REPLAY PLATFORM ISSUE.</li>
            <li>ANY FAILURE TO ACHIEVE A DESIRED RANK, MMR, SKILL LEVEL, GAMEPLAY RESULT, TEAM RESULT, OR PERSONAL OUTCOME, EXCEPT FOR THE LIMITED SERVICE-CONTINUATION REMEDY EXPRESSLY PROVIDED BY THE VIP PRO RANK-UP GUARANTEE IN SECTION 4.4.</li>
          </UL>
          <P>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF
            GAME LAUNCH, LLC FOR ANY CLAIMS ARISING OUT OF OR RELATED TO
            THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE GREATER OF:
            (A) THE AMOUNT YOU PAID TO GAME LAUNCH, LLC FOR THE SPECIFIC
            SERVICE GIVING RISE TO THE CLAIM DURING THE THREE (3) MONTH
            PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (B) ONE
            HUNDRED DOLLARS ($100.00 USD).
          </P>
          <P>
            Some jurisdictions do not allow certain limitations of
            liability. In those jurisdictions, our liability will be limited
            to the maximum extent permitted by law.
          </P>

          {/* 17 */}
          <H2 id="indemnification">17. Indemnification</H2>
          <P>
            You agree to defend, indemnify, and hold harmless Game Launch,
            LLC, its officers, directors, members, managers, employees,
            contractors, coaches, moderators, hosts, guides, agents,
            affiliates, and representatives from and against any claims,
            damages, obligations, losses, liabilities, costs, debts, and
            expenses, including reasonable attorneys&apos; fees, arising
            from or related to:
          </P>
          <UL>
            <li>Your access to or use of the Services.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any Platform terms, Rocket League rules, Discord rules, Whop rules, Metafy rules, payment processor rules, or applicable law.</li>
            <li>Your violation of any third-party right, including intellectual property, privacy, publicity, property, contract, or confidentiality rights.</li>
            <li>Your User Content.</li>
            <li>Any claim that your User Content caused damage to a third party.</li>
            <li>Your conduct in our communities, sessions, events, support channels, or Platforms.</li>
            <li>Your payment disputes, chargebacks, fraudulent activity, false submissions, or bad-faith guarantee claims.</li>
          </UL>
          <P>
            We reserve the right to assume the exclusive defense and
            control of any matter subject to indemnification, and you agree
            to cooperate with our defense of those claims.
          </P>

          {/* 18 */}
          <H2 id="disputes">18. Dispute Resolution</H2>

          <H3>18.1 Informal Resolution</H3>
          <P>
            If you have a dispute with us, you agree to contact us first
            and attempt to resolve the dispute informally by sending
            written notice through our support ticket system or by email
            to{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[var(--accent)] underline-offset-2 transition hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </P>
          <P>
            Your notice must include your name, account information, the
            Service involved, a description of the dispute, the relief
            requested, and any supporting documentation.
          </P>
          <P>
            The parties will attempt in good faith to resolve the dispute
            informally for sixty (60) days after notice is received.
          </P>

          <H3>18.2 Binding Arbitration</H3>
          <P>
            If the dispute is not resolved informally within sixty (60)
            days, any controversy, dispute, or claim arising out of or
            relating to these Terms, the Services, your account, your
            membership, payments, refunds, guarantees, or communications
            with us shall be resolved by binding arbitration administered
            by the American Arbitration Association under its Consumer
            Arbitration Rules, except where applicable law requires a
            different forum, rule set, or procedure.
          </P>
          <P>
            The arbitration may be conducted remotely by video, phone, or
            written submission where permitted by the applicable rules,
            unless the arbitrator determines that an in-person proceeding
            is required. If an in-person proceeding is required, it will
            take place in Illinois unless the parties agree otherwise or
            applicable law requires a different location.
          </P>
          <P>
            Game Launch, LLC will pay arbitration fees beyond any consumer
            filing fee where required by AAA rules or applicable law. Each
            party will otherwise bear its own attorneys&apos; fees and
            costs unless the arbitrator determines that a different
            allocation is required by law or by the applicable arbitration
            rules.
          </P>
          <P>
            Judgment on the arbitration award may be entered in any court
            having jurisdiction.
          </P>

          <H3>18.3 Arbitration Opt-Out</H3>
          <P>
            You may opt out of binding arbitration within thirty (30) days
            after you first accept these Terms by sending written notice to
            the official legal notice address listed in Section 28. Your
            opt-out notice must include your name, account email, the
            Service involved, and a clear statement that you are opting out
            of arbitration. Opting out of arbitration does not affect any
            other part of these Terms.
          </P>

          <H3>18.4 Class Action Waiver</H3>
          <P>
            To the maximum extent permitted by law, all disputes must be
            resolved only on an individual basis. Neither you nor Game
            Launch, LLC may bring, join, or participate in any class
            action, collective action, consolidated action, private
            attorney general action, or other representative proceeding.
          </P>
          <P>
            The arbitrator may award relief only to the individual party
            seeking relief and only to the extent necessary to resolve that
            individual&apos;s claim.
          </P>

          <H3>18.5 Exceptions</H3>
          <P>
            Nothing in this Section 18 prevents either party from seeking
            injunctive, equitable, or emergency relief in court for matters
            involving intellectual property, data security, unauthorized
            access, confidentiality, Platform abuse, harassment, threats,
            or misuse of the Services.
          </P>
          <P>
            Nothing in this Section 18 prevents either party from pursuing
            claims in small claims court where permitted by law.
          </P>

          <H3>18.6 Severability of Arbitration Terms</H3>
          <P>
            If any part of this Section 18 is found unenforceable, that
            part will be limited or severed to the minimum extent
            necessary. If the class action waiver is found unenforceable as
            to a particular claim, that claim must proceed in court rather
            than arbitration unless applicable law requires otherwise.
          </P>

          {/* 19 */}
          <H2 id="governing-law">19. Governing Law</H2>
          <P>
            These Terms are governed by and construed in accordance with
            the laws of the State of Illinois, United States, without
            regard to conflict of law principles, except where applicable
            consumer protection law requires otherwise.
          </P>

          {/* 20 */}
          <H2 id="modifications">20. Modifications to Terms</H2>
          <P>We may modify these Terms at any time.</P>
          <P>
            If we make material changes that affect active Members, we will
            provide reasonable notice by email, Discord announcement,
            Platform notice, website notice, or another reasonable method
            before the changes take effect, unless immediate changes are
            necessary for legal, safety, security, fraud prevention,
            Platform compliance, or operational reasons.
          </P>
          <P>
            Your continued access to or use of the Services after the
            effective date of updated Terms constitutes acceptance of the
            updated Terms.
          </P>
          <P>
            If you do not agree to updated Terms, you must stop using the
            Services and cancel any active membership before the next
            renewal date.
          </P>

          {/* 21 */}
          <H2 id="severability">21. Severability</H2>
          <P>
            If any provision of these Terms is found to be invalid, illegal,
            or unenforceable, that provision will be limited, modified, or
            eliminated to the minimum extent necessary so that the
            remaining provisions remain in full force and effect.
          </P>
          <P>
            If a court or arbitrator determines that a provision cannot be
            modified or limited, that provision will be severed, and the
            remainder of these Terms will remain enforceable.
          </P>

          {/* 22 */}
          <H2 id="entire-agreement">22. Entire Agreement</H2>
          <P>
            These Terms, together with any product-specific terms, checkout
            disclosures, enrollment disclosures, onboarding materials, and
            policies expressly incorporated by reference, constitute the
            entire agreement between you and Game Launch, LLC regarding the
            Services.
          </P>
          <P>
            These Terms supersede all prior and contemporaneous agreements,
            proposals, statements, advertisements, representations,
            discussions, or communications, whether written or oral,
            concerning the subject matter of these Terms, except where a
            separate written agreement signed by Game Launch, LLC expressly
            states that it controls.
          </P>
          <P>
            If marketing materials, sales pages, Discord posts, calls,
            checkout pages, or onboarding materials conflict with these
            Terms, these Terms control unless the conflicting material is a
            written product-specific term expressly incorporated into these
            Terms or required by law.
          </P>

          {/* 23 */}
          <H2 id="non-waiver">23. Non-Waiver</H2>
          <P>
            The failure of Game Launch, LLC to exercise or enforce any
            right or provision of these Terms does not constitute a waiver
            of that right or provision.
          </P>
          <P>
            No waiver by Game Launch, LLC is effective unless made in
            writing by an authorized representative.
          </P>
          <P>
            A waiver of one breach does not constitute a waiver of any
            other or later breach.
          </P>

          {/* 24 */}
          <H2 id="assignment">24. Assignment</H2>
          <P>
            You may not assign, transfer, delegate, or sublicense these
            Terms, your membership, your account, your access rights, or
            any rights or obligations under these Terms without our prior
            written consent.
          </P>
          <P>
            We may assign or transfer these Terms, in whole or in part,
            without restriction and without notice to you, including in
            connection with a merger, acquisition, financing, restructuring,
            sale of assets, change of control, or transfer of business
            operations.
          </P>

          {/* 25 */}
          <H2 id="notices">25. Notices</H2>
          <P>
            All notices required or permitted under these Terms must be in
            writing and will be deemed effective upon:
          </P>
          <UL>
            <li>Personal delivery.</li>
            <li>Delivery by email to the email address associated with your account.</li>
            <li>Delivery through the support ticket system.</li>
            <li>Delivery through Platform notification.</li>
            <li>Delivery by Discord direct message to your Discord account.</li>
            <li>Posting in our Discord servers in an appropriate announcement channel.</li>
            <li>Posting on our website or checkout page, where reasonable for general notices.</li>
          </UL>
          <P>
            Notices to us should be sent through the official support
            ticket system or to{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[var(--accent)] underline-offset-2 transition hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            , unless we designate a different official contact method.
          </P>
          <P>
            You are responsible for keeping your contact information current
            and for checking email, Discord, Platform notifications, and
            support messages related to your account.
          </P>

          {/* 26 */}
          <H2 id="survival">26. Survival</H2>
          <P>
            Any provisions of these Terms that by their nature should
            survive termination will survive termination, cancellation,
            expiration, refund, or account closure, including but not
            limited to provisions regarding ownership, license restrictions,
            User Content, recordings, marketing usage, privacy, warranty
            disclaimers, limitation of liability, indemnification, dispute
            resolution, governing law, payment obligations, chargebacks,
            notices, and this Survival section.
          </P>

          {/* 27 */}
          <H2 id="accessibility">27. Accessibility</H2>
          <P>
            We are committed to making the Services reasonably accessible.
          </P>
          <P>
            If you experience accessibility barriers or need assistance
            accessing the Services, please contact us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[var(--accent)] underline-offset-2 transition hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            or through the official support ticket system. We will work
            with you to provide reasonable accommodations where practical
            and appropriate.
          </P>

          {/* 28 */}
          <H2 id="contact">28. Contact Information</H2>
          <P>
            If you have questions about these Terms, please contact us at:
          </P>
          <UL>
            <li>
              Email:{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[var(--accent)] underline-offset-2 transition hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>Support: Official Discord support ticket system</li>
            <li>Discord Contact: @SpookyLuke, unless we designate a different official Discord contact</li>
            <li>Operator: Game Launch, LLC</li>
            <li>Official Contact Method: The best way to contact us is by opening an official support ticket in our Discord server.</li>
            <li>
              Privacy Requests: Official Discord support ticket system, or{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[var(--accent)] underline-offset-2 transition hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              if Discord access is unavailable.
            </li>
            <li>
              Copyright and DMCA Notices: Official Discord support ticket
              system, or{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[var(--accent)] underline-offset-2 transition hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              if Discord access is unavailable.
            </li>
          </UL>

          {/* 29 */}
          <H2 id="legacy">29. Legacy Membership Plans</H2>

          <H3>29.1 Archived Legacy Plans</H3>
          <P>
            Before April 15, 2025, Game Launch, LLC offered legacy
            membership plans, including plans referred to as
            &quot;Pro,&quot; &quot;Pro+,&quot; and &quot;Off-Season&quot;
            plans.
          </P>
          <P>
            Legacy Plans are no longer available for purchase by new
            Members. This Section 29 is included for historical reference
            and to clarify the status of any remaining legacy arrangements.
          </P>

          <H3>29.2 Continuation of Valid Legacy Arrangements</H3>
          <P>
            Members who enrolled in a Legacy Plan before its
            discontinuation and maintained active, uninterrupted membership
            may have been eligible to continue under the terms communicated
            to them at the time, subject to any later notice, migration,
            cancellation, termination, or expiration.
          </P>
          <P>
            Any active legacy arrangement is governed by the written terms
            communicated to that Legacy Member, these Terms, and any
            applicable migration or sunset notice.
          </P>

          <H3>29.3 Loss of Legacy Status</H3>
          <P>
            A Legacy Member may lose legacy status, grandfathered pricing,
            session rollover, locked benefits, or other legacy rights if
            the Member:
          </P>
          <UL>
            <li>Cancels membership.</li>
            <li>Allows membership to lapse or become inactive.</li>
            <li>Fails to pay when due.</li>
            <li>Changes to a different membership tier.</li>
            <li>Accepts a migration to a current plan.</li>
            <li>Violates the Code of Conduct.</li>
            <li>Is removed or terminated under these Terms.</li>
            <li>Otherwise loses eligibility under the written terms of the legacy arrangement.</li>
          </UL>

          <H3>29.4 Legacy Plan Termination</H3>
          <P>
            Game Launch, LLC may discontinue, sunset, migrate, or terminate
            Legacy Plans with reasonable notice to affected Legacy Members,
            subject to applicable law and any written terms provided to
            those Members.
          </P>
          <P>
            All Legacy Plans, regardless of purchase date, terminated on
            December 31, 2025. Affected Members may have been offered
            transition to a comparable current membership tier, special
            pricing, Store Credit, or another transition option at Game
            Launch, LLC&apos;s discretion, unless a different remedy was
            required by law.
          </P>

          {/* Closing */}
          <P className="mt-12">
            By using the Services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </P>
        </div>
      </section>

      {/* SUPPORT TICKET CTA */}
      <section className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Need help?
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
            Questions about these terms or your account?
          </h2>
          <p className="mt-3 text-base text-white/65">
            Open a support ticket in our Discord. Refund requests, billing
            issues, account questions, all go through the same channel.
          </p>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-[var(--accent)] px-8 py-3 text-base font-bold text-white shadow-lg shadow-[var(--accent-glow)] transition hover:bg-[var(--accent-hover)]"
          >
            Open a Support Ticket →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

// ── Inline typography helpers (kept in-file to avoid adding a typography
// plugin or new shared component for a single legal page) ────────────────

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-24 text-2xl font-extrabold tracking-tight md:text-3xl"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-lg font-bold tracking-tight text-white md:text-xl">
      {children}
    </h3>
  );
}

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-4 text-base leading-relaxed text-white/75 ${className}`.trim()}
    >
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-white/75">
      {children}
    </ul>
  );
}

function DefList({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-4 space-y-3 text-base leading-relaxed text-white/75">
      {items.map(([term, def]) => (
        <div key={term}>
          <dt className="inline font-bold text-white">{`"${term}"`} </dt>
          <dd className="inline">means {def}</dd>
        </div>
      ))}
    </dl>
  );
}
