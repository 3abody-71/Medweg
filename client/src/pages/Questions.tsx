import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Mail, Send, Users, X } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function Questions() {
  const { profile } = useApp();
  const [question, setQuestion] = useState("");

  const mailtoHref = `mailto:contact@medweg.com?subject=${encodeURIComponent("Medweg inquiry")}&body=${encodeURIComponent(question || "Your next question")}`;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HelpCircle size={20} />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Questions
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Use this space for the questions you want to answer while comparing
          countries and specialties. When you are ready, send your question
          through the Contact Me button above.
        </p>
        <Link
          to="/community"
          className="btn-quiet mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold"
          data-testid="link-questions-community"
        >
          <Users size={14} /> Browse Community discussions
        </Link>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-extrabold">Your next question</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Ask the question that moves your pathway forward.
        </p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={5}
          placeholder="Your next question"
          aria-label="Your next question"
          className="mt-4 w-full resize-y rounded-xl border border-border bg-background/60 p-4 text-sm leading-6 outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          data-testid="textarea-question"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {question
              ? "When you are ready, send it through the Contact Me flow."
              : "Start typing to shape your question."}
          </p>
          <div className="flex items-center gap-2">
            {question && (
              <button
                onClick={() => setQuestion("")}
                className="btn-quiet inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold"
              >
                <X size={12} /> Clear
              </button>
            )}
            <a
              href={mailtoHref}
              className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs"
              data-testid="button-save-question"
            >
              <Send size={13} /> Save question
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card/70 p-5">
        <div className="flex items-center gap-2">
          <Mail size={15} className="text-primary" />
          <h3 className="text-sm font-extrabold">Prefer email?</h3>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Write directly to{" "}
          <a
            href="mailto:contact@medweg.com"
            className="font-bold text-primary hover:underline"
          >
            contact@medweg.com
          </a>{" "}
          with your question and a short note about your profile.{" "}
          {profile.name ? `${profile.name.split(" ")[0]},` : ""} the more context
          you share, the sharper the answer.
        </p>
      </section>
    </div>
  );
}
