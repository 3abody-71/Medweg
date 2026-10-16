import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const MENTORS = [
  {
    name: "Pathway planning mentors",
    focus: "Country choices, licensing steps, and realistic timelines",
    detail:
      "Get help turning a broad destination idea into a practical sequence of next steps.",
    initials: "PP",
  },
  {
    name: "Specialty mentors",
    focus: "Work style, specialty fit, and training decisions",
    detail:
      "Talk through the kind of clinical work, pace, and future scope that suits you.",
    initials: "SM",
  },
  {
    name: "Exam & application mentors",
    focus: "Exam preparation, documents, and applications",
    detail:
      "Build a clearer checklist and learn what to prepare before each application stage.",
    initials: "EA",
  },
];

export default function Mentors() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-[#0c3347] p-6 text-white shadow-sm sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-[#f2bb6e]/15" aria-hidden="true" />
        <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full border-[20px] border-[#8dd8ed]/10" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
            <Users size={14} /> Mentor guidance
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find the right guidance for your next step.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
            Explore mentor categories for country pathways, specialties, exams,
            and applications. Start with the area where you need the clearest
            direction.
          </p>
          <Link
            to="/questions"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#17617e] shadow-lg transition-transform hover:-translate-y-0.5"
            data-testid="link-mentors-question"
          >
            Tell us what you need <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Mentor categories</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              Choose a starting point
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Pick the kind of support that best matches the decision in front
              of you.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {MENTORS.map((mentor) => (
            <article
              key={mentor.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-sm font-extrabold text-primary">
                  {mentor.initials}
                </span>
                <span className="rounded-full bg-secondary/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Coming soon
                </span>
              </div>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight">
                {mentor.name}
              </h3>
              <p className="mt-2 text-sm font-bold text-primary">
                {mentor.focus}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {mentor.detail}
              </p>
              <button
                type="button"
                className="btn-quiet mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold"
                onClick={() => window.alert("Mentor matching is coming soon. For now, tell us what guidance you need through Questions.")}
                data-testid={`button-mentor-interest-${mentor.initials.toLowerCase()}`}
              >
                <MessageCircle size={13} /> I’m interested
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: CalendarDays,
            title: "Plan your conversation",
            text: "Bring one clear decision or question to make the session useful.",
          },
          {
            icon: CheckCircle2,
            title: "Leave with next steps",
            text: "Turn advice into a short checklist you can act on immediately.",
          },
          {
            icon: ShieldCheck,
            title: "Keep it practical",
            text: "Use official licensing sources to verify every important requirement.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-secondary/45 p-5">
            <Icon size={18} className="text-primary" />
            <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-primary/15 bg-primary/[0.06] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extrabold tracking-tight">Not sure where to start?</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Ask a question first and use it to shape your future mentor conversation.
            </p>
          </div>
          <Link
            to="/questions"
            className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs"
            data-testid="link-mentors-ask-question"
          >
            Ask a question <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
