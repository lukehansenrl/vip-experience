import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | RL Clubhouse",
};

// TODO: replace placeholder copy below with finalized terms from counsel.
// Until then, this page exists so the /terms link from the checkout
// agreement checkbox doesn't 404.
export default function TermsPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0b0e17" }}
    >
      <nav className="border-b border-white/10 bg-[#0b0e17]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <div className="text-lg font-extrabold tracking-tight">
            RL <span className="text-[var(--accent)]">Clubhouse</span>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-16 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/70">
            Our complete terms and conditions are being finalized. While we
            polish the legal language, please reach out via Discord or
            email if you have any questions about your membership, billing,
            or how the Rocket League Clubhouse operates.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            By purchasing or using our services, you agree to act in good
            faith with our community and coaches, follow our community
            rules, and accept that membership is provided as described on
            our marketing pages.
          </p>
          <p className="mt-6 text-sm text-white/40">
            Questions? Contact us in Discord or email support.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
        &copy; {new Date().getFullYear()} RL Clubhouse. All rights reserved.
      </footer>
    </div>
  );
}
