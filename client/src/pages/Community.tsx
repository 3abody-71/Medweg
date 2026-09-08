import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Clock3,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";

const TOPICS = [
  "All discussions",
  "Countries",
  "Specialties",
  "Exams & licensing",
  "Student life",
];

type CommunityPost = {
  id: string;
  title: string;
  body: string;
  topic: string;
  author: string;
  time: string;
  replies: number;
  likes: number;
  isStarter?: boolean;
};

const STARTER_POSTS: CommunityPost[] = [
  {
    id: "compare-routes",
    title: "What should I compare before choosing a country?",
    body: "A useful starting point is to compare registration steps, language evidence, training length, cost, and how realistic the application timeline is for your current stage.",
    topic: "Countries",
    author: "Medweg starter",
    time: "Community guide",
    replies: 0,
    likes: 0,
    isStarter: true,
  },
  {
    id: "finding-specialty-fit",
    title: "How are you narrowing down your specialty options?",
    body: "Share the kind of work that gives you energy: acute decisions, continuity of care, procedures, diagnostics, research, or working closely with families.",
    topic: "Specialties",
    author: "Medweg starter",
    time: "Community guide",
    replies: 0,
    likes: 0,
    isStarter: true,
  },
  {
    id: "licensing-plans",
    title: "Where do you keep your licensing checklist?",
    body: "A country-by-country checklist can make a complicated route easier to manage. What do you track first: exams, language, documents, registration, or applications?",
    topic: "Exams & licensing",
    author: "Medweg starter",
    time: "Community guide",
    replies: 0,
    likes: 0,
    isStarter: true,
  },
];

function loadPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem("medweg-community-posts");
    return raw ? (JSON.parse(raw) as CommunityPost[]) : STARTER_POSTS;
  } catch {
    return STARTER_POSTS;
  }
}

function savePosts(posts: CommunityPost[]) {
  try {
    localStorage.setItem("medweg-community-posts", JSON.stringify(posts));
  } catch {
    // Local storage is a convenience; the page remains usable if it is unavailable.
  }
}

export default function Community() {
  const { profile } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(loadPosts);
  const [activeTopic, setActiveTopic] = useState("All discussions");
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("Countries");
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTopic =
        activeTopic === "All discussions" || post.topic === activeTopic;
      const matchesQuery =
        !normalizedQuery ||
        `${post.title} ${post.body} ${post.topic}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, posts, query]);

  const handlePublish = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;

    const nextPosts = [
      {
        id: `post-${Date.now()}`,
        title: trimmedTitle,
        body: trimmedBody,
        topic,
        author: profile.name.trim() || "You",
        time: "Just now",
        replies: 0,
        likes: 0,
      },
      ...posts,
    ];
    setPosts(nextPosts);
    savePosts(nextPosts);
    setTitle("");
    setBody("");
    setTopic("Countries");
    setComposerOpen(false);
  };

  const handleLike = (post: CommunityPost) => {
    const alreadyLiked = likedIds.includes(post.id);
    const nextPosts = posts.map((item) =>
      item.id === post.id
        ? { ...item, likes: Math.max(0, item.likes + (alreadyLiked ? -1 : 1)) }
        : item
    );
    setPosts(nextPosts);
    savePosts(nextPosts);
    setLikedIds((current) =>
      alreadyLiked
        ? current.filter((id) => id !== post.id)
        : [...current, post.id]
    );
  };

  return (
    <div className="space-y-8">
      <section className="community-hero relative overflow-hidden rounded-3xl p-6 text-white shadow-sm sm:p-8">
        <div className="community-hero-orbit" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
            <Users size={14} /> Student community
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Compare notes. Find your people.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
            A calm place for students and graduates to exchange practical ideas
            about countries, specialties, exams, and the next step in the
            journey.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#17617e] shadow-lg transition-transform hover:-translate-y-0.5"
              data-testid="button-start-discussion"
            >
              <Plus size={15} /> Start a discussion
            </button>
            <span className="text-xs text-white/70">
              {profile.name ? `Welcome, ${profile.name.split(" ")[0]}.` : "No account needed to explore."}
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Countries", note: "Routes and requirements" },
          { icon: Sparkles, label: "Specialties", note: "Fit, lifestyle, and scope" },
          { icon: Clock3, label: "Exams & licensing", note: "Plans and preparation" },
          { icon: MessageCircle, label: "Student life", note: "The experience between steps" },
        ].map(({ icon: Icon, label, note }) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTopic(label)}
            className={`rounded-2xl border p-4 text-left transition-colors ${
              activeTopic === label
                ? "border-primary/50 bg-secondary/60"
                : "border-border bg-card hover:border-primary/35 hover:bg-secondary/30"
            }`}
          >
            <Icon size={18} className="text-primary" />
            <div className="mt-3 text-sm font-extrabold">{label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{note}</div>
          </button>
        ))}
      </section>

      {composerOpen && (
        <section className="rounded-2xl border border-primary/25 bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow">Share what you know</div>
              <h2 className="mt-2 text-xl font-extrabold">Start a discussion</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Add a question, resource, or experience that could help another
                student.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setComposerOpen(false)}
              className="icon-button"
              aria-label="Close discussion form"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="text-xs font-bold">Discussion title</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="For example: Which route is realistic after internship?"
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background/60 px-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                data-testid="input-community-title"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <label className="block">
                <span className="text-xs font-bold">Your message</span>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={5}
                  placeholder="Share the context, question, or resource you want to discuss."
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-background/60 p-3 text-sm leading-6 outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                  data-testid="textarea-community-body"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold">Topic</span>
                <div className="relative mt-2">
                  <select
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-border bg-background/60 px-3 pr-9 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                    data-testid="select-community-topic"
                  >
                    {TOPICS.filter((item) => item !== "All discussions").map(
                      (item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] leading-5 text-muted-foreground">
                This preview saves your post in this browser. Shared student
                discussions will be connected in a later release.
              </p>
              <button
                type="button"
                onClick={handlePublish}
                disabled={!title.trim() || !body.trim()}
                className="btn-primary rounded-lg px-4 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-45"
                data-testid="button-publish-community"
              >
                Publish discussion
              </button>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow">Explore the conversation</div>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              Useful ideas from the community
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Browse by topic now. Later, this space can grow into live student
              discussions and trusted pathway knowledge.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search discussions"
              className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-hidden focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              aria-label="Search discussions"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {TOPICS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTopic(item)}
              className={`filter-pill rounded-full px-3 py-2 text-xs font-bold transition-colors ${
                activeTopic === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {visiblePosts.map((post) => {
            const liked = likedIds.includes(post.id);
            return (
              <article
                key={post.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-primary">
                    {post.topic}
                  </span>
                  {post.isStarter && (
                    <span className="rounded-full border border-border px-2.5 py-1">
                      Starter guide
                    </span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1">
                    <Clock3 size={12} /> {post.time}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-extrabold leading-6">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {post.body}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="font-bold">{post.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle size={13} /> {post.replies} replies
                    </span>
                    <button
                      type="button"
                      onClick={() => handleLike(post)}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                        liked
                          ? "bg-secondary text-primary"
                          : "hover:bg-secondary/70 hover:text-primary"
                      }`}
                      aria-label={`${liked ? "Unlike" : "Like"} ${post.title}`}
                    >
                      <ThumbsUp size={13} /> {post.likes + (liked ? 0 : 0)}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visiblePosts.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
            <Search size={20} className="mx-auto text-muted-foreground" />
            <h3 className="mt-3 text-sm font-extrabold">No discussions found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try another topic or search term, or start the first discussion.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// Keep this page intentionally client-only until the shared community service is connected.
export type { CommunityPost };


