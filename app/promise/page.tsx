import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Rank-Up Promise — RL Clubhouse VIP",
  description:
    "Full terms and conditions for the RL Clubhouse Rank-Up Promise. Rank up, hold it, get a free controller.",
};

export default function PromisePage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0b0e17" }}
    >
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-extrabold tracking-tight">
            RL <span style={{ color: "var(--accent)" }}>Clubhouse</span>
          </a>
          <a
            href="/"
            className="text-sm font-semibold text-white/60 hover:text-white transition"
          >
            &larr; Back to VIP
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          Terms &amp; Conditions
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          The Rank-Up Promise
        </h1>
        <p className="mt-4 text-white/50">
          Last updated: April 11, 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/70">
          {/* 1. Overview */}
          <Section title="1. Overview">
            <p>
              The Rank-Up Promise (&ldquo;the Promise&rdquo;) is an
              improvement reward program offered by RL Clubhouse
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) to
              active VIP Experience members (&ldquo;you,&rdquo;
              &ldquo;member&rdquo;). If you achieve a full competitive rank
              increase in Rocket League and maintain it for the required
              verification period, we will ship you one (1) standard gaming
              controller at no additional cost.
            </p>
          </Section>

          {/* 2. Eligibility */}
          <Section title="2. Eligibility">
            <p>To be eligible for the Rank-Up Promise, you must:</p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>
                Be an active, paid VIP Experience member in good standing at the
                time of enrollment, throughout the improvement period, and at the
                time of claim submission.
              </li>
              <li>
                Have maintained an active, uninterrupted VIP membership for a
                minimum of ninety (90) consecutive days prior to submitting your
                claim.
              </li>
              <li>
                Have completed at least one (1) coaching check-in session with
                the RL Clubhouse team during the improvement period.
              </li>
              <li>
                Be at least 18 years of age or have parental/guardian consent.
              </li>
            </ul>
            <p className="mt-3">
              Members who cancel and rejoin are not eligible unless they complete
              a new, uninterrupted 90-day period after rejoining.
            </p>
          </Section>

          {/* 3. Qualifying Rank-Up */}
          <Section title="3. What Counts as a Qualifying Rank-Up">
            <p>
              A qualifying rank-up is defined as advancing one full competitive
              rank tier in any standard Rocket League competitive playlist (1v1,
              2v2, or 3v3). Examples of qualifying rank-ups:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>Platinum &rarr; Diamond</li>
              <li>Diamond &rarr; Champion</li>
              <li>Champion &rarr; Grand Champion</li>
              <li>Grand Champion &rarr; Supersonic Legend</li>
            </ul>
            <p className="mt-3">The following do not qualify:</p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>
                Division changes within the same rank (e.g., Diamond 1 &rarr;
                Diamond 3)
              </li>
              <li>Rank changes in casual, extra modes, or tournament playlists</li>
              <li>
                Rank changes achieved through boosting, account sharing, or any
                other form of rank manipulation
              </li>
              <li>
                Rank changes on alternate/smurf accounts (must be your primary
                account)
              </li>
            </ul>
          </Section>

          {/* 4. Verification Period */}
          <Section title="4. Verification Period">
            <p>
              After achieving your rank-up, you must maintain the new rank for a
              minimum of ninety (90) days, spanning at least two (2) consecutive
              competitive seasons. This means:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>
                You must hold the new rank at the end of the season in which you
                achieved it.
              </li>
              <li>
                You must place into and hold the new rank (or higher) in the
                following season.
              </li>
              <li>
                Temporary dips below the rank during a season are acceptable,
                but you must end each season at or above the qualifying rank.
              </li>
            </ul>
          </Section>

          {/* 5. Required Proof */}
          <Section title="5. Required Proof">
            <p>
              When submitting your claim, you must provide the following
              documentation:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>
                <strong className="text-white">Starting rank screenshot:</strong>{" "}
                A screenshot of your competitive rank taken at or near the time
                you enrolled in VIP, showing the date and your gamertag.
              </li>
              <li>
                <strong className="text-white">End-of-season 1 screenshot:</strong>{" "}
                A screenshot showing your new rank at the end of the season in
                which you ranked up.
              </li>
              <li>
                <strong className="text-white">End-of-season 2 screenshot:</strong>{" "}
                A screenshot showing you maintained the rank (or higher) at the
                end of the following season.
              </li>
              <li>
                <strong className="text-white">Tracker link:</strong> A link to
                your Rocket League Tracker profile (or equivalent third-party
                tracking service) showing your rank history.
              </li>
            </ul>
            <p className="mt-3">
              All screenshots must clearly show your in-game gamertag, the date,
              and the rank. We reserve the right to request additional
              verification, including but not limited to: screen recordings,
              replay files, or a live verification call with a team member.
            </p>
          </Section>

          {/* 6. Reward */}
          <Section title="6. The Reward">
            <p>
              Upon successful verification of your rank-up, we will ship you one
              (1) standard gaming controller. The specific model will be
              determined at our discretion and may include:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>Sony DualSense (PS5) controller</li>
              <li>Sony DualShock 4 (PS4) controller</li>
              <li>Xbox Wireless Controller</li>
            </ul>
            <p className="mt-3">
              The reward is limited to one (1) controller per member, per
              lifetime. Custom, specialty, or pro-level controllers (e.g., SCUF,
              Battle Beaver) are not included. Color and model selection are
              subject to availability.
            </p>
          </Section>

          {/* 7. Shipping */}
          <Section title="7. Shipping &amp; Delivery">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Rewards are shipped to addresses within the United States at no
                cost to the member. Standard shipping times apply (typically
                5&ndash;10 business days).
              </li>
              <li>
                For members located outside the United States, shipping costs and
                import duties are the responsibility of the member. We will
                provide a shipping quote before proceeding.
              </li>
              <li>
                If you are located in an area where shipping is not feasible
                (remote locations, restricted countries, etc.), we reserve the
                right to hold your reward until it can be picked up at an RL
                Clubhouse event or designated location, or until a viable
                shipping method becomes available.
              </li>
              <li>
                We are not responsible for packages lost, stolen, or damaged
                after delivery confirmation by the carrier.
              </li>
              <li>
                You must provide a valid shipping address within 30 days of
                claim approval. Failure to do so may result in forfeiture of the
                reward.
              </li>
            </ul>
          </Section>

          {/* 8. Disqualification */}
          <Section title="8. Disqualification &amp; Anti-Fraud">
            <p>
              We take the integrity of this program seriously. The following
              will result in immediate disqualification:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>
                <strong className="text-white">Boosting:</strong> Having another
                player play on your account or intentionally queuing with
                higher-ranked players to inflate your rank.
              </li>
              <li>
                <strong className="text-white">Account sharing:</strong> Using
                an account that is not your primary, personal account.
              </li>
              <li>
                <strong className="text-white">Smurfing:</strong> Intentionally
                deranking or placing lower than your actual skill level to create
                an artificial starting point.
              </li>
              <li>
                <strong className="text-white">Fraudulent documentation:</strong>{" "}
                Submitting altered, photoshopped, or otherwise falsified
                screenshots or rank data.
              </li>
              <li>
                <strong className="text-white">Exploits:</strong> Using any game
                exploits, glitches, or third-party software to gain an unfair
                competitive advantage.
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to investigate any claim and deny rewards if
              we reasonably believe fraud or manipulation has occurred.
              Disqualified members may also have their VIP membership revoked
              without refund.
            </p>
          </Section>

          {/* 9. Limitations */}
          <Section title="9. Limitations &amp; Disclaimers">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                The Rank-Up Promise is a reward program, not a guarantee of
                results. Individual improvement depends on factors including
                practice time, consistency, coachability, and baseline skill
                level.
              </li>
              <li>
                This program may be modified, suspended, or terminated at any
                time at our discretion. Changes will not affect claims already
                approved.
              </li>
              <li>
                The reward has no cash value and cannot be exchanged for money,
                credit, or other products.
              </li>
              <li>
                We reserve the right to limit the total number of rewards
                distributed per calendar year.
              </li>
              <li>
                This offer is void where prohibited by law.
              </li>
            </ul>
          </Section>

          {/* 10. How to Submit */}
          <Section title="10. How to Submit Your Claim">
            <ol className="ml-5 list-decimal space-y-2">
              <li>
                Gather all required proof (see Section 5).
              </li>
              <li>
                Contact the RL Clubhouse team via Discord DM or the
                #rank-up-claims channel.
              </li>
              <li>
                Submit your screenshots, tracker link, and shipping address.
              </li>
              <li>
                Our team will review your submission within 14 business days.
              </li>
              <li>
                If approved, your controller will be shipped within 21 business
                days of approval.
              </li>
            </ol>
          </Section>

          {/* 11. Contact */}
          <Section title="11. Questions">
            <p>
              If you have questions about the Rank-Up Promise, reach out to us
              on Discord or email us at the address listed in your VIP welcome
              materials.
            </p>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
