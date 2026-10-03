import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft size={16} /> Back to Mediena
      </Link>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
            <ShieldCheck size={23} />
          </span>
          <div>
            <p className="guide">Legal</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
              Privacy policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: October 3, 2026
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-7 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="text-lg font-extrabold text-foreground">
              What this site does
            </h2>
            <p className="mt-2">
              Mediena helps medical graduates compare licensing and training
              pathways. The information on this site is educational orientation
              and is not legal, immigration, financial, employment, or medical
              advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-foreground">
              Information you provide
            </h2>
            <p className="mt-2">
              If you create an account or complete your profile, you may provide
              information such as your name, email address, medical school,
              current country, study year, graduation details, and pathway
              preferences. You choose whether to provide this information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-foreground">
              How information is used
            </h2>
            <p className="mt-2">
              Profile information is used to save and personalize your
              pathway-planning experience. We do not sell your personal
              information. Account authentication and related account data may
              be handled by Supabase, the authentication provider configured for
              this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-foreground">
              Your choices
            </h2>
            <p className="mt-2">
              You can contact us to ask about your information or request help
              with your account. You can also choose not to create an account
              and use the public pathway guides without submitting profile
              details.
            </p>
          </section>

          <section id="disclaimer">
            <h2 className="text-lg font-extrabold text-foreground">
              Important disclaimer
            </h2>
            <p className="mt-2">
              Licensing rules, exam requirements, fees, salaries, immigration
              rules, and application processes change. Always verify the current
              requirements with the relevant official licensing body or
              government authority before making a decision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be raised in the community or
              through the questions page.
            </p>
          </section>
        </div>
      </section>
    </article>
  );
}
