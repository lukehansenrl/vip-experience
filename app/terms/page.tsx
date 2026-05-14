import type { Metadata } from "next";

// Discord channel where members open support tickets for refunds, billing
// disputes, account issues, and general questions about the Terms.
const SUPPORT_URL =
  "https://discord.com/channels/1217265351658573895/1222927647126851604";

export const metadata: Metadata = {
  title: "Terms of Service & Refund Policy | RL Clubhouse",
  description:
    "Rocket League Bootcamp, Clubhouse & Academy by SpookyLuke — Terms of Service (V4.0). Operated by Game Launch, LLC.",
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
            Rocket League Bootcamp, Clubhouse &amp; Academy by SpookyLuke
            (V4.0). Operated by Game Launch, LLC.
          </p>
          <p className="mt-2 text-sm text-white/45">
            Effective Date: 8/22/2025 · Last Updated: 8/22/2025
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
              ["4. 6-Week Rank-Up Sprint", "sprint"],
              ["5. Eligibility Requirements", "eligibility"],
              ["6. Registration and Account", "registration"],
              ["7. Payment Terms", "payment"],
              ["8. Refund Policy", "refund-policy"],
              ["9. Session Scheduling and Cancellation", "scheduling"],
              ["10. Coach Availability and Limitations", "coach-availability"],
              ["11. Code of Conduct", "conduct"],
              ["12. Intellectual Property", "ip"],
              ["13. Recordings and Marketing", "recordings"],
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
            Welcome to Rocket League Bootcamp, Clubhouse &amp; Academy by
            SpookyLuke (&quot;RLB,&quot; &quot;RLC,&quot; &quot;RLA,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These
            programs are operated and legally provided by Game Launch, LLC.
            We provide structured coaching, community, and educational
            resources designed to help players grow in Rocket League. These
            Terms of Service (&quot;Terms&quot;) explain how our programs
            work, what you can expect from us, and what we expect from you.
          </P>
          <P>
            By enrolling in, accessing, or using any program, subscription,
            community, course, or service offered under Rocket League
            Bootcamp (&quot;RLB&quot;), Rocket League Clubhouse
            (&quot;RLC&quot;), and Rocket League Academy (&quot;RLA&quot;)
            (collectively, &quot;Services&quot;), you agree to be bound by
            these Terms. If you do not agree with any part of these Terms,
            you must not use our Services.
          </P>
          <P>
            By accessing or using our Services, you represent that you are
            at least 16 years of age.
          </P>

          {/* 2 */}
          <H2 id="definitions">2. Definitions</H2>
          <DefList
            items={[
              [
                "Academy / RLA",
                "Rocket League Academy, the free educational content and courses we provide for personal use only.",
              ],
              [
                "Bootcamp / RLB",
                "Rocket League Bootcamp, our paid coaching subscriptions and programs.",
              ],
              [
                "Clubhouse / RLC",
                "Rocket League Clubhouse, our paid community, events, resources, and cohort-based programs including the 6-Week Rank-Up Sprint.",
              ],
              [
                "Sprint",
                "The 6-Week Rank-Up Sprint conducted within the Clubhouse with specific requirements and guarantees as set forth herein.",
              ],
              [
                "Chosen Playlist",
                "The Competitive 2v2 or 3v3 playlist a Sprint participant selects at purchase, which cannot be changed for that Sprint.",
              ],
              [
                "Baseline",
                "The higher of (i) the participant's current MMR at Sprint start or (ii) the participant's 90-day peak MMR in the Chosen Playlist prior to Sprint start.",
              ],
              [
                "Work Requirements",
                "The Sprint participation milestones detailed in Section 12.",
              ],
              [
                "Bootcamp Pro",
                "Our membership-based service providing structured bi-weekly one-on-one coaching sessions with 24/5 messaging access to a pro coach.",
              ],
              [
                "Bootcamp Unlimited",
                "Our membership-based service providing unlimited one-on-one coaching sessions (subject to a mandatory 72-hour cooldown period), 24/5 messaging access to a pro coach, and access to a dedicated player network.",
              ],
              [
                "Bootcamp Off-Season",
                "Our membership-based service providing one coaching session every four weeks with 24/5 messaging access to a pro coach.",
              ],
              [
                "Legacy Plans",
                "The discontinued 'Pro,' 'Pro+,' and 'Off-Season' membership plans offered prior to April 15, 2025.",
              ],
              [
                "Legacy Members",
                "Members who purchased Legacy Plans before their discontinuation.",
              ],
              [
                "Business Day",
                "Monday through Friday, excluding U.S. federal holidays, in the Central Time (CT) zone.",
              ],
              [
                "Coach Working Days",
                "Five coach workdays per week; each coach sets their individual 5-day schedule which may include weekends, and coaches respond within 24 hours on their designated working days, creating 24/5 availability.",
              ],
              [
                "Store Credit",
                "Non-cash credit issued for use toward eligible Game Launch, LLC services and products; Store Credit is non-transferable and expires in 12 months.",
              ],
              [
                "We, us, our",
                "Game Launch, LLC, operating as Rocket League Bootcamp, Clubhouse & Academy by SpookyLuke, including our affiliates, staff, and contractors.",
              ],
              [
                "You, your, member, participant, student",
                "The individual who purchases, accesses, or uses any Service.",
              ],
            ]}
          />

          {/* 3 */}
          <H2 id="services">3. Services Description</H2>
          <P>
            We provide Rocket League education and coaching services,
            including but not limited to:
          </P>

          <H3>3.1 Rocket League Clubhouse (RLC)</H3>
          <P>
            A membership-based community providing access to group coaching
            sessions, events, resources, and cohort-based programs including
            the 6-Week Rank-Up Sprint. Members gain access to:
          </P>
          <UL>
            <li>Weekly tournaments with coaching feedback</li>
            <li>Custom game modes and practice sessions</li>
            <li>Member-only Discord channels</li>
            <li>Matchmaking with similarly skilled peers</li>
            <li>VOD review sessions and group coaching opportunities</li>
            <li>Network of fellow players for ranked matchmaking and practice</li>
          </UL>
          <P>
            Clubhouse offers a free trial period (typically 30 days via
            Metafy/Whop) which will automatically convert to paid
            membership if not canceled before the trial expires. This is a
            recurring membership that will automatically renew and charge
            you until canceled.
          </P>

          <H3>3.2 Rocket League Bootcamp Pro</H3>
          <P>
            A membership-based service providing structured bi-weekly
            one-on-one coaching sessions. This membership includes:
          </P>
          <UL>
            <li>Bi-weekly coaching sessions (one session every two weeks)</li>
            <li>Sessions expire after 4 weeks unless extension is requested and approved</li>
            <li>24/5 messaging access to a pro coach (reach out anytime, coach responds within 24 hours during their individual working days)</li>
            <li>Access to a dedicated network of higher-ranked players</li>
            <li>This is a recurring membership that will automatically renew until canceled</li>
          </UL>

          <H3>3.3 Rocket League Bootcamp Unlimited</H3>
          <P>
            A membership-based service providing unlimited one-on-one
            coaching sessions for players ranked Diamond or higher on PC
            (with exceptions for Platinum players as specified in Section
            5.3). This membership includes:
          </P>
          <UL>
            <li>Unlimited coaching sessions (subject to a mandatory 72-hour cooldown period between sessions)</li>
            <li>24/5 messaging access to a pro coach (reach out anytime, coach responds within 24 hours during their individual working days)</li>
            <li>Access to a dedicated network of higher-ranked players</li>
            <li>Maximum of 2 active session bookings at any time</li>
            <li>This is a recurring membership that will automatically renew until canceled</li>
          </UL>

          <H3>3.4 Rocket League Bootcamp Off-Season</H3>
          <P>
            A membership-based service providing monthly coaching sessions
            for maintaining skills during off-seasons or lighter training
            periods. This membership includes:
          </P>
          <UL>
            <li>One coaching session every four weeks</li>
            <li>Sessions automatically renew and must be scheduled within the 4-week period</li>
            <li>24/5 messaging access to a pro coach (reach out anytime, coach responds within 24 hours during their individual working days)</li>
            <li>Access to a dedicated network of higher-ranked players</li>
            <li>This is a recurring membership that will automatically renew until canceled</li>
          </UL>

          <H3>3.5 6-Week Rank-Up Sprint</H3>
          <P>
            The 6-Week Rank-Up Sprint is a cohort-based rank improvement
            program conducted within the Clubhouse with specific
            requirements and guarantees. The Rank-Up Sprint includes:
          </P>
          <UL>
            <li>Structured 6-week curriculum focused on rank advancement</li>
            <li>Playlist-specific coaching (2v2 or 3v3 only, 1v1 excluded)</li>
            <li>Performance tracking and verification through RL Tracker and Ballchasing</li>
            <li>Store Credit guarantee available through two paths: Outcome Path (+100 MMR achievement) or Effort Path (compliance completion)</li>
            <li>Anti-boosting enforcement and party queue restrictions</li>
            <li>Limited seating with cohort-based kickoff dates</li>
          </UL>

          <H3>3.6 Platform Integration</H3>
          <P>
            <strong>Metafy:</strong> Coaching roles and payments are
            managed through our Metafy platform integration. By using our
            Services, you agree to:
          </P>
          <UL>
            <li>Create and maintain a Metafy account</li>
            <li>Follow Metafy&apos;s terms of service and payment policies</li>
            <li>Make payments through Metafy&apos;s secure payment system</li>
          </UL>
          <P>
            <strong>Whop:</strong> Some payments and roles are also managed
            through our Whop platform integration. By using our Services,
            you agree to:
          </P>
          <UL>
            <li>Create and maintain a Whop account where required</li>
            <li>Follow Whop&apos;s terms of service and payment policies</li>
            <li>Make payments through Whop&apos;s secure payment system</li>
          </UL>
          <P>
            <strong>Calendly:</strong> All coaching session scheduling is
            managed through Calendly. You agree to:
          </P>
          <UL>
            <li>Schedule all coaching sessions through our Calendly booking links</li>
            <li>Follow scheduling guidelines and availability windows</li>
          </UL>

          <H3>3.7 Educational Resources (Academy)</H3>
          <P>
            We provide free access to a comprehensive library of
            educational content for everyone, regardless of membership
            status, for personal use only, including:
          </P>
          <UL>
            <li>Training packs and custom drill sequences</li>
            <li>Video tutorials for all skill levels (from fundamentals to advanced mechanics)</li>
            <li>Written guides and strategy documentation</li>
            <li>Replay analysis examples</li>
            <li>Rank-specific improvement roadmaps</li>
          </UL>
          <P>
            We reserve the right to modify, suspend, or discontinue any
            aspect of our Services at any time without prior notice.
          </P>

          {/* 4 */}
          <H2 id="sprint">4. 6-Week Rank-Up Sprint</H2>

          <H3>4.1 Sprint Overview</H3>
          <P>
            The 6-Week Rank-Up Sprint is a cohort-based rank improvement
            program conducted within the Clubhouse with specific
            requirements and guarantees as outlined in this section.
          </P>

          <H3>4.2 Eligibility Requirements</H3>
          <P><strong>Platform:</strong> PC only.</P>
          <P><strong>Age Requirement:</strong> Minimum age 16 years.</P>
          <P>
            <strong>Rank Guidelines:</strong> Recommended for Platinum
            through Diamond III. Champion I–III considered on a
            case-by-case basis; Grand Champion or higher not recommended.
          </P>
          <P>
            <strong>Region:</strong> North America and EU recommended;
            other regions accepted at our discretion.
          </P>
          <P>
            <strong>Single Account &amp; Playlist:</strong> One Rocket
            League account and one playlist (2v2 or 3v3 only, 1v1 excluded)
            must be selected at enrollment. Playlist changes after kickoff
            are prohibited.
          </P>
          <P>
            We reserve the right to verify eligibility and deny
            participation for failure to meet any requirements.
          </P>

          <H3>4.3 Program Structure</H3>
          <P>
            <strong>Duration:</strong> Six (6) consecutive weeks from the
            designated kickoff date for your cohort.
          </P>
          <P>
            <strong>Cohorts:</strong> Limited seating with set kickoff
            dates; waitlist may apply once capacity is reached.
          </P>
          <P>
            <strong>Community Access:</strong> Program communications and
            resources provided via private Discord channel.
          </P>
          <P>
            <strong>Baseline Establishment:</strong> Your Baseline is the
            higher of (i) your current MMR at Sprint start or (ii) your
            90-day peak MMR in the Chosen Playlist prior to Sprint start.
          </P>

          <H3>4.4 Conditional Guarantee — Store Credit Only</H3>
          <P>
            Participants may qualify for store credit
            (&quot;Guarantee&quot;) under either of the following pathways:
          </P>
          <P>
            <strong>(a) Outcome Path:</strong> Achieve a net increase of at
            least +100 MMR in your locked playlist relative to your
            Baseline within the 6-week period and receive store credit
            equal to 100% of the amount paid for the Sprint; OR
          </P>
          <P>
            <strong>(b) Effort Path:</strong> Fulfill all compliance
            requirements described in Section 4.5 and receive store credit
            equal to 100% of the amount paid for the Sprint.
          </P>
          <P><strong>Guarantee Limitations:</strong></P>
          <UL>
            <li><strong>Form of Payout:</strong> Store credit only, redeemable for our coaching services or future Sprint enrollment</li>
            <li><strong>No Cash Refunds:</strong> Under no circumstances will cash or other monetary refunds be issued</li>
            <li><strong>Non-Transferable:</strong> Store credit may not be transferred, sold, or redeemed for cash</li>
            <li><strong>Expiration:</strong> Must use within twelve (12) months of issuance</li>
            <li><strong>Abuse or Misuse:</strong> Fraudulent or bad-faith claims void eligibility for any credit</li>
          </UL>

          <H3>4.5 Compliance Requirements (Effort Path)</H3>
          <P>
            To remain eligible for the Guarantee under the Effort Path,
            participants must complete ALL of the following:
          </P>
          <UL>
            <li><strong>Ranked Volume:</strong> Complete at least 120 ranked matches in the selected playlist within the Sprint period.</li>
            <li><strong>Replay Submissions:</strong> Submit four (4) replay reviews asynchronously by required deadlines. One late submission permitted under Monday Grace provision (Section 4.6).</li>
            <li><strong>Weekly Check-Ins:</strong> Submit six (6) Sunday MMR screenshots per Section 4.6; one late check-in permitted under Monday Grace provision.</li>
            <li><strong>Baseline Proof:</strong> Provide kickoff submission including both current MMR screenshot and 90-day peak evidence.</li>
          </UL>
          <P>
            Failure to satisfy any compliance requirement results in
            forfeiture of the Guarantee.
          </P>

          <H3>4.6 Proof Standards, Deadlines, and Grace Periods</H3>
          <P>
            <strong>Sunday Submission Window:</strong> 12:00 a.m.–11:59
            p.m. (local time) each Sunday.
          </P>
          <P>
            <strong>Screenshot Content:</strong> Must show gamertag,
            playlist, rank/division, MMR, visible date/time, and be
            uncropped.
          </P>
          <P>
            <strong>Monday Grace:</strong> Participants may utilize one (1)
            Monday extension to submit any Sunday requirement by 11:59 p.m.
            Monday local time. Any additional late submissions void
            Guarantee eligibility.
          </P>
          <P>
            <strong>Replay Submission Timing:</strong> Due by 11:59 p.m.
            Sunday of the submission week; one late submission allowed
            using Monday Grace.
          </P>
          <P>
            <strong>Server Outages:</strong> Documented global outages
            extend applicable deadlines by 24 hours at Company discretion.
          </P>

          <H3>4.7 Integrity Rules (Zero Tolerance)</H3>
          <P>
            The following conduct strictly prohibits Guarantee eligibility
            and may result in removal from the program without refund or
            credit:
          </P>
          <UL>
            <li>Use of alternate or &quot;smurf&quot; accounts</li>
            <li>Account sharing or boosting by materially higher-ranked players</li>
            <li>Edited, falsified, or misleading proof submissions</li>
            <li>Playlist switching after kickoff</li>
            <li>Toxic or disruptive behavior in community spaces</li>
          </UL>
          <P>All violations are determined at our sole discretion.</P>

          <H3>4.8 Season Resets and Edge Cases</H3>
          <P>If a Rocket League season reset occurs during the Sprint:</P>
          <UL>
            <li>The Sprint period automatically extends by one (1) week</li>
            <li>Post-reset progress measured from the higher of (i) pre-reset Baseline or (ii) post-reset placement MMR</li>
          </UL>
          <P>
            <strong>Balance Updates:</strong> Significant game balance
            updates may justify up to one (1) week extension at Company
            discretion.
          </P>

          <H3>4.9 Sprint Payments and Cancellations</H3>
          <P>
            <strong>Payment:</strong> Full payment required upon
            enrollment.
          </P>
          <P>
            <strong>Non-Refundable Fees:</strong> All fees are final and
            non-refundable. Sprint purchases are non-refundable (Store
            Credit guarantee applies instead). Missed sessions or calls do
            not extend or pause the Sprint period.
          </P>
          <P>
            <strong>Chargebacks:</strong> Initiating a chargeback
            constitutes a material breach. We reserve the right to provide
            evidence to dispute claims and pursue collections where
            appropriate.
          </P>

          <H3>4.10 Sprint Code of Conduct</H3>
          <P>
            Participants must maintain professional, respectful, and
            non-toxic behavior. We reserve the right to remove any
            participant for inappropriate conduct without refund or credit.
          </P>

          <H3>4.11 Recording and Marketing Consent</H3>
          <P>
            By enrolling in the Sprint, you acknowledge the recording
            policies outlined in Section 13 and:
          </P>
          <UL>
            <li>Grant us a non-exclusive, royalty-free license to use anonymized Sprint results and voluntary testimonials for marketing purposes</li>
          </UL>

          <H3>4.12 Sprint Appeals and Disputes</H3>
          <P>
            <strong>Appeals Window:</strong> You have 7 days from Sprint
            completion to appeal any guarantee decisions.
          </P>
          <P>
            <strong>Appeals Process:</strong> Submit appeals via Discord
            support ticket with supporting documentation.
          </P>
          <P>
            <strong>Final Decision:</strong> All Sprint guarantee decisions
            are final after the appeals process.
          </P>

          {/* 5 */}
          <H2 id="eligibility">5. Eligibility Requirements</H2>

          <H3>5.1 Age Requirements</H3>
          <UL>
            <li>You must be at least 16 years old to use our Services.</li>
            <li>
              If you are between 16 and 18 years old, you represent that
              you have obtained parental or guardian consent to use our
              Services and that your parent or guardian has reviewed and
              agreed to these Terms.
            </li>
          </UL>

          <H3>5.2 Technical Requirements</H3>
          <P>
            <strong>All Services:</strong> A Discord account and access to
            Discord is required, as all services are delivered through our
            dedicated Discord servers.
          </P>
          <P>
            <strong>Clubhouse:</strong> A PC or console with stable
            internet access is required.
          </P>
          <P>
            <strong>Bootcamp Pro:</strong> A PC with stable internet
            access, Medal.tv or other approved clip-sharing software, and
            Bakkesmod from bakkesmod.com are required.
          </P>
          <P>
            <strong>Bootcamp Unlimited:</strong> A PC with stable internet
            access, Medal.tv or other approved clip-sharing software, and
            Bakkesmod from bakkesmod.com are required.
          </P>
          <P>
            <strong>Bootcamp Off-Season:</strong> A PC with stable internet
            access, Medal.tv or other approved clip-sharing software, and
            Bakkesmod from bakkesmod.com are required.
          </P>
          <P>
            <strong>Sprint and PC-Required Services:</strong> Sprint
            requires PC access with Bakkesmod, RL Tracker account, and
            Ballchasing account for verification purposes. Sprint is PC
            only.
          </P>
          <P><strong>Required Accounts:</strong></P>
          <UL>
            <li>A valid Metafy and/or Whop account is required for payment processing</li>
            <li>Access to Calendly is required for session scheduling</li>
          </UL>

          <H3>5.3 Eligibility and Approval Process</H3>
          <P><strong>Rank Guidelines:</strong></P>
          <UL>
            <li><strong>Clubhouse:</strong> Generally intended for players ranked Platinum or higher in Rocket League</li>
            <li><strong>Bootcamp Pro:</strong> Generally intended for players ranked Diamond or higher on PC. Platinum players may be considered if they are existing members of the Clubhouse.</li>
            <li><strong>Bootcamp Unlimited:</strong> Generally intended for players ranked Diamond or higher on PC. Platinum players may be considered if they are existing members of the Clubhouse.</li>
            <li><strong>Bootcamp Off-Season:</strong> Generally intended for players ranked Diamond or higher on PC. Platinum players may be considered if they are existing members of the Clubhouse.</li>
          </UL>
          <P><strong>Application and Approval Process:</strong></P>
          <UL>
            <li>All prospective members must complete an interview process regardless of rank</li>
            <li>Acceptance is at our sole discretion based on factors including maturity, responsibility, commitment, and dedication to Rocket League</li>
            <li>We reserve the right to deny application to any prospective member without providing specific reasons</li>
            <li>We reserve the right to ban or remove any member at any time at our sole discretion</li>
          </UL>

          {/* 6 */}
          <H2 id="registration">6. Registration and Account</H2>

          <H3>6.1 Account Creation</H3>
          <P>To access our Services, you need to create:</P>
          <UL>
            <li>An account through our website</li>
            <li>A Discord account to join our community servers</li>
            <li>A Metafy and/or Whop account for payments</li>
          </UL>
          <P>
            You agree to provide accurate, current, and complete information
            during registration and to keep your account information
            updated.
          </P>

          <H3>6.2 Account Security</H3>
          <P>
            You are solely responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur
            under your account. You agree to notify us immediately of any
            unauthorized use of your account.
          </P>

          <H3>6.3 Account Termination</H3>
          <P>
            We reserve the right to suspend or terminate your account at
            our sole discretion, without notice, for conduct that we
            determine violates these Terms or is harmful to other users,
            us, or third parties, or for any other reason.
          </P>

          <H3>6.4 Membership Cancellation</H3>
          <P>
            <strong>Cancellation Method:</strong> You can cancel your
            membership by:
          </P>
          <UL>
            <li>Submitting your cancellation directly through your Metafy or Whop account settings</li>
            <li>OR by contacting support directly</li>
          </UL>
          <P>
            <strong>Cancellation Deadline:</strong> Requests must be
            received at least 3 business days before your next billing date
            to avoid being charged for the next billing period.
          </P>
          <P>
            <strong>Access After Cancellation:</strong> Upon cancellation,
            you will retain access to all Services until the end of your
            current billing period.
          </P>
          <P>
            <strong>No Partial Refunds:</strong> No refunds will be issued
            for unused portions of your current billing period when you
            cancel.
          </P>
          <P>
            <strong>Impact on Benefits:</strong> Cancellation results in
            forfeiture of any grandfathered pricing and accumulated
            benefits.
          </P>
          <P>
            <strong>Re-Joining:</strong> If you wish to re-join after
            cancellation, current market rates and terms will apply.
          </P>

          {/* 7 */}
          <H2 id="payment">7. Payment Terms</H2>

          <H3>7.1 Pricing and Payment Options</H3>
          <P>
            <strong>Pricing Information:</strong> Current membership fees
            and other charges will be disclosed to you before purchase
            through our website, Discord channels, or during the
            application process.
          </P>
          <P>
            <strong>Activation Fees:</strong> A one-time activation fee is
            charged immediately upon initial registration for certain
            membership tiers. This fee will also apply if your account
            becomes inactive for 4 weeks or longer and you choose to
            reactivate it. The specific amount will be clearly disclosed
            before purchase.
          </P>
          <P>
            <strong>Payment Methods:</strong> All payments are processed
            through Metafy&apos;s or Whop&apos;s payment systems, which
            accept PayPal and all major credit cards.
          </P>
          <P>
            <strong>Currency:</strong> All prices are in US Dollars unless
            clearly marked otherwise. Taxes are excluded from quoted prices
            and will be added at checkout as required by law.
          </P>

          <H3>7.2 How Membership Billing Works</H3>
          <P>
            <strong>Automatic Billing:</strong> Your membership
            automatically bills you according to the billing cycle selected
            at signup (typically monthly).
          </P>
          <P>
            <strong>Platform Processing:</strong> All payments are
            processed through Metafy or Whop, and you agree to follow the
            respective platform&apos;s payment terms and conditions.
          </P>
          <P>
            <strong>Cancellation Deadline:</strong> To avoid charges, you
            must cancel at least 3 business days before your next billing
            date (see Section 6.4 for how to cancel).
          </P>
          <P>
            <strong>Payment Authorization:</strong> By signing up, you
            authorize us to charge your payment method for all membership
            fees until you cancel.
          </P>
          <P>
            <strong>Your Responsibility:</strong> You are responsible for
            all charges until you properly complete the cancellation
            process.
          </P>
          <P>
            <strong>Chargebacks:</strong> Initiating a chargeback
            constitutes a breach of contract and will result in immediate
            permanent ban from all Services with any outstanding balance
            remaining due.
          </P>

          <H3>7.3 Price Changes and Grandfathered Pricing</H3>
          <UL>
            <li>We will notify you via email and Discord announcement at least 14 days before any price changes take effect.</li>
            <li>If you continue using our services after a price change notification, you agree to pay the new rates.</li>
            <li><strong>Grandfathered Pricing:</strong> Members with active memberships are eligible for &quot;grandfathered&quot; pricing, which means you&apos;ll keep your original membership rate as long as your membership remains active without interruption.</li>
            <li>You will lose grandfathered pricing if you: (1) cancel your membership, (2) change to a different membership tier, or (3) allow your membership to lapse for any reason.</li>
            <li>If you lose grandfathered pricing, current market rates will apply to any new or modified membership.</li>
            <li>Price changes will never apply retroactively to periods you&apos;ve already paid for.</li>
          </UL>

          <H3>7.4 Taxes and Additional Fees</H3>
          <UL>
            <li>Listed prices do not include applicable taxes.</li>
            <li>Depending on your location, sales tax, VAT, or other taxes may be added to your bill as required by law.</li>
            <li><strong>Third-Party Fees:</strong> We do not charge processing fees, but you may incur additional fees from:</li>
            <li className="list-none ml-6">
              <UL>
                <li>Your payment provider (foreign transaction fees, currency conversion fees, etc.)</li>
                <li>Metafy, Whop, or other payment processors we use for billing</li>
                <li>Subscription management services</li>
              </UL>
            </li>
            <li>These third-party fees are outside our control and are not included in the membership price.</li>
          </UL>

          {/* 8 — REFUND POLICY (deep-linked from /checkout) */}
          <H2 id="refund-policy">8. Refund Policy</H2>

          <H3>8.1 When You Can Request a Refund</H3>
          <P>We offer refunds under these specific circumstances:</P>
          <UL>
            <li><strong>Service Cancellation by Us:</strong> Full refund if we cancel services before delivery.</li>
            <li><strong>30-Day Satisfaction Guarantee for Clubhouse:</strong> If you&apos;re not satisfied with your Clubhouse membership within your first 30 days, submit a refund request via support ticket for a full refund.</li>
            <li><strong>7-Day Satisfaction Guarantee for Bootcamp Services:</strong> If you&apos;re not satisfied with your Bootcamp Pro, Bootcamp Unlimited, or Bootcamp Off-Season membership within your first 7 days, submit a refund request via support ticket for a full refund.</li>
          </UL>

          <H3>8.2 When Refunds Are Not Available</H3>
          <P>Refunds will not be provided for:</P>
          <UL>
            <li><strong>6-Week Rank-Up Sprint purchases:</strong> Sprint purchases are final and non-refundable (Store Credit guarantee applies instead)</li>
            <li>Missed sessions or failure to schedule available coaching sessions</li>
            <li>Any services already delivered or coaching sessions already conducted</li>
            <li>Dissatisfaction with coaching results, rank improvements, or gameplay progress</li>
            <li>Membership payments after the applicable refund window has passed</li>
            <li>Account suspension or termination due to violations of our Code of Conduct</li>
          </UL>

          <H3>8.3 How to Request a Refund</H3>
          <UL>
            <li>All refund requests must be submitted in writing via our support ticket system.</li>
            <li>Include your order/membership details and specific reason for the refund request.</li>
            <li>Approved refunds will be processed to your original payment method within 5–10 business days, though actual receipt may depend on your payment provider&apos;s policies.</li>
            <li>Standard processing time for refunds is 5–10 business days, depending on your payment provider.</li>
            <li>Activation fees are non-refundable except in cases where we cancel the service before delivery.</li>
          </UL>

          {/* 9 */}
          <H2 id="scheduling">9. Session Scheduling and Cancellation</H2>

          <H3>9.1 How to Schedule Your Sessions</H3>
          <P>
            <strong>Booking System:</strong> All coaching sessions must be
            scheduled through our official Calendly booking system.
          </P>
          <P>
            <strong>Advance Booking:</strong> We recommend scheduling
            sessions at least 48 hours in advance to secure your preferred
            time slot.
          </P>
          <P>
            <strong>Coach Availability:</strong> Session times are subject
            to coach availability and cannot be guaranteed for specific
            days or times.
          </P>
          <P>
            <strong>Session Duration:</strong> Standard sessions are 60
            minutes unless otherwise specified for your membership tier.
          </P>
          <P><strong>Session Cadence:</strong></P>
          <UL>
            <li>Bootcamp Pro members receive bi-weekly sessions (one session every two weeks)</li>
            <li>Bootcamp Unlimited members may schedule unlimited sessions subject to the 72-hour cooldown period</li>
            <li>Bootcamp Off-Season members receive one session every four weeks (auto-renewing subscription)</li>
          </UL>
          <P>
            <strong>Session Expiry:</strong> Bootcamp Pro sessions expire
            after 4 weeks unless extension is requested and approved
            through support.
          </P>
          <P>
            <strong>Cooldown Period:</strong> Bootcamp Unlimited members
            must observe a mandatory 72-hour cooldown period between
            completed coaching sessions (see Section 9.5).
          </P>

          <H3>9.2 If You Need to Cancel or Reschedule</H3>
          <P>
            <strong>24-Hour Notice Required:</strong> You must cancel or
            reschedule at least 24 hours before your scheduled session.
          </P>
          <P><strong>Late Cancellations:</strong></P>
          <UL>
            <li><strong>Bootcamp Pro:</strong> Sessions canceled with less than 24 hours&apos; notice will be considered used and forfeited</li>
            <li><strong>Bootcamp Unlimited:</strong> Sessions canceled with less than 24 hours&apos; notice will be considered used and may affect your ability to schedule future sessions</li>
            <li><strong>Bootcamp Off-Season:</strong> Sessions canceled with less than 24 hours&apos; notice will be considered used and forfeited</li>
          </UL>
          <P>
            <strong>How to Cancel:</strong> Use the cancellation function
            in our Calendly booking system or contact support in case of
            emergency.
          </P>
          <P>
            <strong>No-Shows:</strong> If you fail to attend a scheduled
            session without cancellation, you may be subject to a no-show
            penalty as outlined in Section 9.6.
          </P>

          <H3>9.3 If Your Coach Cancels</H3>
          <P>
            <strong>Rescheduling Priority:</strong> If your coach needs to
            cancel, we&apos;ll work with you to reschedule at a time that
            works for you.
          </P>
          <P>
            <strong>Notification:</strong> You&apos;ll receive notification
            of any coach cancellations via Discord and email.
          </P>
          <P>
            <strong>Coach Matchmaking Guarantee:</strong> If your assigned
            coach becomes unavailable for an extended period (such as
            breaks or leaves), we guarantee to match you with a new
            compatible coach to continue your training.
          </P>

          <H3>9.4 Extension Requests</H3>
          <P>
            <strong>Valid Reasons:</strong> Extensions may be granted for
            repeated coach cancellations, documented emergencies, or
            travel/deployment situations communicated within 5 days.
          </P>
          <P>
            <strong>Bootcamp Pro Sessions:</strong> Extensions for session
            expiry (4-week limit) may be requested for valid reasons such
            as extended travel or military deployment.
          </P>
          <P>
            <strong>Bootcamp Off-Season Sessions:</strong> Extensions for
            session expiry (4-week allocation period) may be requested for
            valid reasons such as extended travel or military deployment.
          </P>
          <P>
            <strong>How to Request:</strong> Submit extension requests via
            support ticket with detailed explanation.
          </P>
          <P>
            <strong>Response Time:</strong> We&apos;ll respond to extension
            requests within 3 business days.
          </P>
          <P>
            <strong>Approval:</strong> Extension approvals are at our sole
            discretion and are not guaranteed.
          </P>

          <H3>9.5 Bootcamp Unlimited Cooldown Period</H3>
          <P>
            <strong>Mandatory Wait Period:</strong> All Bootcamp Unlimited
            members must observe a 72-hour cooldown period between
            completed coaching sessions.
          </P>
          <P>
            <strong>Purpose:</strong> This cooldown ensures adequate
            practice time to implement coaching advice and make progress
            between sessions.
          </P>
          <P>
            <strong>Scheduling Limitations:</strong> Our Calendly booking
            system is configured to prevent scheduling sessions that
            violate the cooldown period.
          </P>
          <P>
            <strong>Cooldown Calculation:</strong> The 72-hour period
            begins at the end of your completed coaching session.
          </P>
          <P>
            <strong>Exceptions:</strong> Rare exceptions to the cooldown
            period may be granted for special circumstances, but these must
            be requested through your account manager at least 24 hours in
            advance. Individual coaches do not have the authority to waive
            or modify the cooldown period.
          </P>

          <H3>9.6 No-Show Policy</H3>
          <P>
            <strong>Definition:</strong> A &quot;no-show&quot; occurs when
            you fail to attend a scheduled session without prior
            cancellation.
          </P>
          <P>
            <strong>First Offense:</strong> Warning and education about
            cancellation procedures.
          </P>
          <P>
            <strong>Second Offense:</strong> 7-day restriction from
            scheduling new sessions.
          </P>
          <P>
            <strong>Repeated Offenses:</strong> May result in membership
            termination without refund.
          </P>
          <P>
            <strong>Coach Wait Time:</strong> Coaches will wait 15 minutes
            from the scheduled start time before marking a session as a
            no-show.
          </P>
          <P>
            <strong>Appeals:</strong> No-show designations may be appealed
            through our support system within 48 hours.
          </P>

          {/* 10 */}
          <H2 id="coach-availability">10. Coach Availability and Service Limitations</H2>

          <H3>10.1 Coach Response Times</H3>
          <P>
            <strong>Messaging Access:</strong> Bootcamp Pro, Bootcamp
            Unlimited, and Bootcamp Off-Season members have 24/5 messaging
            access to their assigned coach (you can reach out anytime,
            coaches respond within 24 hours during their individual working
            days).
          </P>
          <P>
            <strong>Response Window:</strong> Coaches will respond to
            messages during their individual working hours, which will be
            clearly communicated upon coach assignment.
          </P>
          <P>
            <strong>Response Time:</strong> Coaches will typically respond
            within 24 hours during their designated working days (5 days
            per week, which may include weekends based on coach
            availability and student needs).
          </P>
          <P>
            <strong>Coach Time Off:</strong> Coaches may have up to two
            consecutive days off per week, during which response times may
            be longer.
          </P>

          <H3>10.2 Session Availability</H3>
          <P>
            <strong>Bootcamp Pro:</strong> Sessions are scheduled bi-weekly
            according to your membership cadence. Sessions must be used
            within 4 weeks of allocation.
          </P>
          <P>
            <strong>Bootcamp Unlimited:</strong> While Bootcamp Unlimited
            offers unlimited sessions, this is subject to reasonable use
            and coach availability.
          </P>
          <P>
            <strong>Bootcamp Off-Season:</strong> Sessions are scheduled
            once every four weeks on an auto-renewing basis. Sessions must
            be scheduled within the 4-week allocation period.
          </P>
          <P>
            <strong>Booking Windows:</strong> Members may schedule sessions
            up to 14 days in advance.
          </P>
          <P>
            <strong>Popular Times:</strong> Prime-time slots (evenings and
            weekends) are in high demand and may require booking further
            in advance.
          </P>
          <P>
            <strong>Maximum Active Bookings:</strong> Bootcamp Unlimited
            members may have up to 2 future sessions scheduled at any given
            time.
          </P>

          <H3>10.3 Service Limitations</H3>
          <P>
            <strong>Session Focus:</strong> Coaching sessions focus on
            Rocket League skills, strategy, and improvement. Coaches are
            not obligated to address unrelated topics.
          </P>
          <P>
            <strong>Scope of Coaching:</strong> Coaching is limited to the
            game modes and aspects covered in our service description.
          </P>
          <P>
            <strong>Coach Reassignment:</strong> We reserve the right to
            reassign coaches based on availability, specialization needs,
            or operational requirements.
          </P>
          <P>
            <strong>Platform Limitations:</strong> Our ability to provide
            certain services may be affected by third-party platforms like
            Discord, Metafy, Whop, or Rocket League itself. In case of
            platform unavailability, we will use email as backup
            communication.
          </P>

          <H3>10.4 Force Majeure</H3>
          <P>
            We are not responsible for service interruptions due to
            circumstances beyond our reasonable control, including but not
            limited to:
          </P>
          <UL>
            <li>Internet or server outages</li>
            <li>Natural disasters</li>
            <li>Public emergencies</li>
            <li>Rocket League server issues or game updates</li>
            <li>Discord service interruptions</li>
            <li>Metafy or Whop platform downtime</li>
          </UL>

          {/* 11 */}
          <H2 id="conduct">11. Code of Conduct</H2>

          <H3>11.1 General Conduct</H3>
          <P>You agree to:</P>
          <UL>
            <li>Follow all rules established in our Discord server and during sessions.</li>
            <li>Treat coaches and fellow participants with respect.</li>
            <li>Use courteous language and refrain from disruptive behavior.</li>
            <li>Comply promptly with instructions from moderators, hosts, and coaches.</li>
          </UL>

          <H3>11.2 Prohibited Conduct</H3>
          <P>You agree not to:</P>
          <UL>
            <li>Harass, abuse, or harm other users or coaches.</li>
            <li>Use offensive, discriminatory, or inappropriate language.</li>
            <li>Disrupt coaching sessions, community events, or Discord communications.</li>
            <li>Engage in any behavior that negatively impacts other users&apos; experience.</li>
            <li>Attempt to manipulate or exploit any aspect of our Services.</li>
            <li>Share your account credentials with others.</li>
            <li>Attempt to circumvent the 72-hour cooldown or other service limitations.</li>
          </UL>

          <H3>11.3 Consequences</H3>
          <P>Violation of these conduct rules may result in:</P>
          <UL>
            <li>Warning or temporary suspension from Services.</li>
            <li>Immediate termination of your account.</li>
            <li>Forfeiture of any unused coaching opportunities without refund.</li>
          </UL>
          <P>
            <strong>Enforcement Policy:</strong> Repeat violations of the
            same conduct rule will result in immediate account termination.
            Multiple different violations may be handled with progressive
            discipline, but we reserve the right to immediately terminate
            any account for severe violations.
          </P>

          {/* 12 */}
          <H2 id="ip">12. Intellectual Property</H2>

          <H3>12.1 Our Ownership</H3>
          <P>
            All Content and Intellectual Property created, owned, or
            licensed by us, including but not limited to:
          </P>
          <UL>
            <li>Coaching methodologies and techniques</li>
            <li>Video guides and educational content</li>
            <li>Training materials, resources, and documents</li>
            <li>Community events and their formats</li>
            <li>Website content, logos, and branding</li>
          </UL>
          <P>
            are the exclusive property of Game Launch, LLC and are
            protected by copyright, trademark, and other intellectual
            property laws.
          </P>

          <H3>12.2 License to Use</H3>
          <P>
            We grant you a limited, non-exclusive, non-transferable,
            revocable license to access and use our Services and Content
            for your personal, non-commercial use only, subject to these
            Terms.
          </P>

          <H3>12.3 Restrictions</H3>
          <P>You agree not to:</P>
          <UL>
            <li>Copy, modify, distribute, sell, or lease any part of our Services or Content.</li>
            <li>Reverse engineer, decompile, or attempt to extract the source code of our Services.</li>
            <li>Share, reproduce, or distribute any Content without our express written permission.</li>
            <li>Record, stream, or share coaching sessions without our express written permission.</li>
          </UL>

          <H3>12.4 User Content</H3>
          <P>
            By submitting any content to us (including gameplay clips,
            feedback, or communications), you grant us a worldwide,
            non-exclusive, royalty-free license to use, reproduce, modify,
            adapt, publish, translate, and distribute such content in
            connection with providing the Services.
          </P>

          {/* 13 */}
          <H2 id="recordings">13. Recordings and Marketing</H2>

          <H3>13.1 Session and Event Recordings</H3>
          <P>
            All coaching sessions, community events, and any communications
            with our staff (including support calls, consultations,
            interviews, and meetings) may be recorded by us for quality
            assurance, training purposes, dispute resolution, and marketing
            use.
          </P>

          <H3>13.2 Recording Consent</H3>
          <P>
            By using our Services, you expressly consent to the recording
            of all communications with Game Launch, LLC staff. If you do
            not consent to recording, you must notify us in writing before
            any communication takes place.
          </P>

          <H3>13.3 Marketing Usage</H3>
          <P>
            Recordings may be used in training materials and marketing
            content unless you specifically opt-out by contacting support.
          </P>

          <H3>13.4 Public Information</H3>
          <P>
            Leaderboards and progress information may be made public and
            are not anonymous unless specifically requested.
          </P>

          {/* 14 */}
          <H2 id="privacy">14. Privacy and Data Collection</H2>

          <H3>14.1 Information Collection</H3>
          <P>
            We collect and process personal information as necessary to
            provide our Services, including:
          </P>
          <UL>
            <li>Contact information (name, email, Discord ID)</li>
            <li>Payment information</li>
            <li>Rocket League statistics and tracker information</li>
            <li>Communications and interactions with our coaches and community</li>
            <li>Session recordings and gameplay clips</li>
          </UL>

          <H3>14.2 Information Usage</H3>
          <P>We use your information to:</P>
          <UL>
            <li>Provide, maintain, and improve our Services</li>
            <li>Process payments and manage your account</li>
            <li>Communicate with you about our Services</li>
            <li>Analyze and improve coaching effectiveness</li>
          </UL>

          <H3>14.3 Information Sharing</H3>
          <P>
            We do not sell your personal information to third parties. We
            may share your information:
          </P>
          <UL>
            <li>With our coaches, as necessary to provide coaching services</li>
            <li>With service providers who assist in providing our Services (including Metafy and Whop)</li>
            <li>If required by law or to protect our rights</li>
          </UL>

          <H3>14.4 Data Retention</H3>
          <P>
            We retain your personal information and logs indefinitely until
            no longer required for business or legal purposes.
          </P>

          {/* 15 */}
          <H2 id="warranties">15. Disclaimer of Warranties</H2>
          <P>
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
            OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
            NON-INFRINGEMENT.
          </P>
          <P>
            WE DO NOT GUARANTEE ANY SPECIFIC RESULTS FROM THE USE OF OUR
            SERVICES, INCLUDING BUT NOT LIMITED TO RANK IMPROVEMENT OR
            SKILL ENHANCEMENT IN ROCKET LEAGUE.
          </P>
          <P>
            WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED,
            TIMELY, SECURE, OR ERROR-FREE.
          </P>

          {/* 16 */}
          <H2 id="liability">16. Limitation of Liability</H2>
          <P>
            IN NO EVENT SHALL GAME LAUNCH, LLC, ITS OFFICERS, DIRECTORS,
            EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
            SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
            LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES, RESULTING FROM:
          </P>
          <UL>
            <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
            <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
            <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            <li>TECHNICAL FAILURES OR INTERNET CONNECTION ISSUES</li>
          </UL>
          <P>
            THE TOTAL LIABILITY OF GAME LAUNCH, LLC FOR ANY CLAIMS ARISING
            UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE
            SERVICES DURING THE THREE (3) MONTH PERIOD PRECEDING THE EVENT
            GIVING RISE TO THE LIABILITY.
          </P>

          {/* 17 */}
          <H2 id="indemnification">17. Indemnification</H2>
          <P>
            You agree to defend, indemnify, and hold harmless Game Launch,
            LLC, its officers, directors, employees, and agents, from and
            against any and all claims, damages, obligations, losses,
            liabilities, costs or debt, and expenses (including but not
            limited to attorney&apos;s fees) arising from:
          </P>
          <UL>
            <li>Your use of and access to the Services</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
            <li>Any claim that your content caused damage to a third party</li>
          </UL>

          {/* 18 */}
          <H2 id="disputes">18. Dispute Resolution</H2>

          <H3>18.1 Informal Resolution</H3>
          <P>
            If you have a dispute with us, you agree to contact us first
            and attempt to resolve the dispute informally by sending a
            notice to support@rocketleaguebootcamp.com.
          </P>

          <H3>18.2 Binding Arbitration</H3>
          <P>
            If we cannot resolve the dispute informally within 60 days, any
            controversy or claim arising out of or relating to these Terms
            shall be settled by binding arbitration in accordance with the
            commercial arbitration rules of the American Arbitration
            Association. The arbitration shall be conducted in Illinois,
            and judgment on the arbitration award may be entered into any
            court having jurisdiction thereof.
          </P>

          <H3>18.3 Class Action Waiver</H3>
          <P>
            Any proceedings to resolve or litigate any dispute in any forum
            will be conducted solely on an individual basis. Neither you
            nor we will seek to have any dispute heard as a class action or
            in any other proceeding in which either party acts or proposes
            to act in a representative capacity.
          </P>

          <H3>18.4 Exceptions</H3>
          <P>
            Nothing in this section shall prevent either party from seeking
            injunctive or other equitable relief from the courts for
            matters related to data security, intellectual property, or
            unauthorized access to the Services.
          </P>

          {/* 19 */}
          <H2 id="governing-law">19. Governing Law</H2>
          <P>
            These Terms shall be governed by and construed in accordance
            with the laws of the State of Illinois, United States, without
            regard to its conflict of law principles.
          </P>

          {/* 20 */}
          <H2 id="modifications">20. Modifications to Terms</H2>
          <P>
            We reserve the right to modify these Terms at any time. If we
            make material changes to these Terms, we will notify you by
            email or through our Discord server before the changes take
            effect. Your continued use of our Services after such
            notification constitutes your acceptance of the modified
            Terms.
          </P>

          {/* 21 */}
          <H2 id="severability">21. Severability</H2>
          <P>
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision will be limited or eliminated to the
            minimum extent necessary so that these Terms will otherwise
            remain in full force and effect and enforceable.
          </P>

          {/* 22 */}
          <H2 id="entire-agreement">22. Entire Agreement</H2>
          <P>
            These Terms constitute the entire agreement between you and
            Game Launch, LLC regarding the Services and supersede all
            prior and contemporaneous agreements, proposals, or
            representations, written or oral, concerning the subject
            matter of these Terms.
          </P>

          {/* 23 */}
          <H2 id="non-waiver">23. Non-Waiver</H2>
          <P>
            The failure of Game Launch, LLC to exercise or enforce any
            right or provision of these Terms shall not constitute a waiver
            of such right or provision. No waiver by Game Launch, LLC of
            any term or condition set out in these Terms shall be deemed a
            further or continuing waiver of such term or condition or a
            waiver of any other term or condition, and any failure of Game
            Launch, LLC to assert a right or provision under these Terms
            shall not constitute a waiver of such right or provision.
          </P>

          {/* 24 */}
          <H2 id="assignment">24. Assignment</H2>
          <P>
            You may not assign, transfer, or sublicense these Terms or any
            rights or obligations hereunder without our prior written
            consent. We may assign or transfer these Terms, in whole or in
            part, without restriction and without notice to you. If Game
            Launch, LLC is acquired by or merged with a third-party entity,
            we reserve the right to transfer or assign the information we
            have collected from you as part of such merger, acquisition,
            sale, or other change of control.
          </P>

          {/* 25 */}
          <H2 id="notices">25. Notices</H2>
          <P>
            All notices required or permitted under these Terms shall be in
            writing and will be deemed effective upon:
          </P>
          <UL>
            <li>Personal delivery</li>
            <li>Delivery by email to the email address associated with your account</li>
            <li>Delivery via Discord direct message to your Discord account</li>
            <li>Posting in our Discord servers in an appropriate announcement channel</li>
          </UL>
          <P>
            Notices to us should be sent to support@rocketleaguebootcamp.com
            or via Discord to @SpookyLuke.
          </P>

          {/* 26 */}
          <H2 id="survival">26. Survival</H2>
          <P>
            The terms and conditions of these Terms which by their nature
            should survive termination shall survive termination,
            including, but not limited to, ownership provisions, warranty
            disclaimers, indemnity, limitations of liability, dispute
            resolution, governing law, and the provisions of this Survival
            section.
          </P>

          {/* 27 */}
          <H2 id="accessibility">27. Accessibility</H2>
          <P>
            We are committed to ensuring our Services are accessible to all
            users. If you experience any accessibility barriers or need
            assistance accessing our Services, please contact us at
            support@rocketleaguebootcamp.com and we will work with you to
            provide reasonable accommodations.
          </P>

          {/* 28 */}
          <H2 id="contact">28. Contact Information</H2>
          <P>
            If you have any questions about these Terms, please contact us
            at:
          </P>
          <UL>
            <li>Email: support@rocketleaguebootcamp.com</li>
            <li>Discord: @SpookyLuke</li>
          </UL>

          {/* 29 */}
          <H2 id="legacy">29. Legacy Membership Plans</H2>

          <H3>29.1 Continuation of Legacy Plans</H3>
          <P>
            Prior to April 15, 2025, we offered different membership tiers
            including &quot;Pro,&quot; &quot;Pro+,&quot; and
            &quot;Off-Season&quot; plans (collectively &quot;Legacy
            Plans&quot;). Members who purchased these Legacy Plans before
            their discontinuation (&quot;Legacy Members&quot;) may continue
            to access Services under their original terms with the
            following conditions:
          </P>
          <P>
            <strong>Grandfathered Status:</strong> Legacy Members may
            continue their Legacy Plan at their original pricing as long as
            their membership remains active without interruption.
          </P>
          <P>
            <strong>Session Allocation:</strong> Legacy Members will
            continue to receive their originally purchased number of
            coaching sessions per billing cycle as specified in their
            Legacy Plan agreement.
          </P>
          <P>
            <strong>Session Rollover:</strong> Any unused coaching sessions
            from a Legacy Member&apos;s current billing cycle will
            automatically roll over to the next billing cycle, subject to
            the following conditions:
          </P>
          <UL>
            <li>A maximum of twice the original monthly session allocation may be accumulated at any time</li>
            <li>Legacy Members must maintain an active, paid membership for rollovers to remain valid</li>
            <li>Unused sessions expire after 60 days from the date they were originally allocated</li>
          </UL>
          <P>
            <strong>Pro+ Locked-In Guarantee:</strong> Legacy Members with
            Pro+ plans will continue to receive their guaranteed time slots
            if previously established.
          </P>

          <H3>29.2 Modifications to Legacy Plans</H3>
          <P>
            <strong>Service Changes:</strong> While the core benefits of
            Legacy Plans will be honored, specific aspects of service
            delivery (such as scheduling systems, coaches, or communication
            methods) may be updated to align with current operational
            practices.
          </P>
          <P>
            <strong>Plan Conversion:</strong> Legacy Members may elect to
            convert to current membership offerings (Clubhouse, Bootcamp
            Pro, Bootcamp Unlimited, or Bootcamp Off-Season) at any time.
            Such conversion will terminate all rights and benefits
            associated with their Legacy Plan.
          </P>
          <P>
            <strong>Loss of Legacy Status:</strong> A Legacy Member will
            lose their Legacy Plan status and associated benefits if they:
          </P>
          <UL>
            <li>Cancel their membership</li>
            <li>Allow their membership to lapse or become inactive for any reason</li>
            <li>Change to a different membership tier</li>
            <li>Violate the Code of Conduct resulting in account suspension</li>
          </UL>

          <H3>29.3 Legacy Plan Termination</H3>
          <P>
            <strong>Notice Requirement:</strong> We reserve the right to
            discontinue all Legacy Plans with at least 60 days&apos;
            advance notice to Legacy Members.
          </P>
          <P>
            <strong>Transition Offer:</strong> In the event of Legacy Plan
            termination, affected members will be offered transition to
            the most comparable current membership tier with special
            incentives.
          </P>
          <P>
            <strong>Final Date:</strong> All Legacy Plans, regardless of
            purchase date, will terminate on December 31, 2025, after which
            all members will need to transition to current membership
            offerings.
          </P>

          {/* Closing */}
          <P className="mt-12">
            By using our Services, you acknowledge that you have read,
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
