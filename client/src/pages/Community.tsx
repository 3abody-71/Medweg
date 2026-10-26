import { useMemo, useState } from "react";
import {
  Bookmark,
  Check,
  ChevronDown,
  Heart,
  MessageCircle,
  MoreHorizontal,
  PenLine,
  Plus,
  Repeat2,
  Search,
  Sparkles,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { FEATURE_VISIBILITY } from "../config/featureVisibility";

const TOPICS = [
  "For you",
  "Countries",
  ...(FEATURE_VISIBILITY.specialties ? ["Specialties"] : []),
  "Exams & licensing",
  "Student life",
];

type Member = {
  name: string;
  handle: string;
  role: string;
  initials: string;
  tone: string;
  verified?: boolean;
};

type CommunityPost = {
  id: string;
  author: Member;
  body: string;
  topic: string;
  time: string;
  replies: number;
  likes: number;
  reposts: number;
  starter?: boolean;
};

const MEMBERS: Member[] = [
  { name: "Medweg Guides", handle: "medweg", role: "Pathway editors", initials: "M", tone: "blue", verified: true },
  { name: "Lina Hassan", handle: "linah", role: "IMG · UK pathway", initials: "LH", tone: "peach" },
  { name: "Omar Khaled", handle: "omark", role: "Final-year medical student", initials: "OK", tone: "mint" },
  { name: "Sara Mensah", handle: "saram", role: "Resident · Canada", initials: "SM", tone: "lavender" },
];

const STARTER_POSTS: CommunityPost[] = [
  {
    id: "compare-routes",
    author: MEMBERS[0],
    body: "Before choosing a country, compare the full route—not just the exam. Registration, language evidence, cost, visa clarity, training length, and your realistic application timeline all matter.",
    topic: "Countries",
    time: "2h",
    replies: 12,
    likes: 38,
    reposts: 7,
    starter: true,
  },
  {
    id: "uk-plab",
    author: MEMBERS[1],
    body: "For anyone preparing for PLAB 1: what resources helped you most, and how far in advance did you book your exam? I’m building a 12-week plan and would love to compare approaches.",
    topic: "Exams & licensing",
    time: "4h",
    replies: 19,
    likes: 26,
    reposts: 3,
  },
  {
    id: "specialty-fit",
    author: MEMBERS[2],
    body: "I’m between internal medicine and paediatrics. The work itself matters more to me than the “easy” route. How did you decide which daily rhythm and patient relationship fit you best?",
    topic: "Specialties",
    time: "6h",
    replies: 8,
    likes: 21,
    reposts: 2,
  },
  {
    id: "first-month",
    author: MEMBERS[3],
    body: "Small reminder for anyone moving countries: the first month is mostly admin. Make one folder for identity documents, translations, exam receipts, and every email from the licensing body.",
    topic: "Student life",
    time: "1d",
    replies: 6,
    likes: 44,
    reposts: 11,
  },
];

function loadPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem("medweg-community-feed-v2");
    return raw ? (JSON.parse(raw) as CommunityPost[]) : STARTER_POSTS;
  } catch {
    return STARTER_POSTS;
  }
}

function savePosts(posts: CommunityPost[]) {
  try {
    localStorage.setItem("medweg-community-feed-v2", JSON.stringify(posts));
  } catch {
    // The feed still works when browser storage is unavailable.
  }
}

function Avatar({ member, size = "md" }: { member: Member; size?: "sm" | "md" | "lg" }) {
  return (
    <span className={`community-avatar community-avatar-${member.tone} community-avatar-${size}`} aria-hidden="true">
      {member.initials}
    </span>
  );
}

export default function Community() {
  const { profile } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(loadPosts);
  const [activeTopic, setActiveTopic] = useState("For you");
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("Countries");
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [followedHandles, setFollowedHandles] = useState<string[]>(["medweg"]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter(post => {
      if (!FEATURE_VISIBILITY.specialties && post.topic === "Specialties") return false;
      const matchesTopic = activeTopic === "For you" || post.topic === activeTopic;
      const matchesQuery = !normalizedQuery || `${post.body} ${post.topic} ${post.author.name} ${post.author.handle}`.toLowerCase().includes(normalizedQuery);
      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, posts, query]);

  const currentMember: Member = profile.name.trim()
    ? { name: profile.name.trim(), handle: profile.name.trim().toLowerCase().replace(/\s+/g, ""), role: profile.currentCountry || "Medweg member", initials: profile.name.trim().split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase(), tone: "blue" }
    : { name: "Your profile", handle: "yourprofile", role: "Complete your profile", initials: "Y", tone: "blue" };

  const handlePublish = () => {
    const trimmedBody = body.trim();
    if (!trimmedBody) return;
    const nextPosts = [{ id: `post-${Date.now()}`, author: currentMember, body: trimmedBody, topic, time: "now", replies: 0, likes: 0, reposts: 0 }, ...posts];
    setPosts(nextPosts);
    savePosts(nextPosts);
    setBody("");
    setTopic("Countries");
    setComposerOpen(false);
  };

  const updatePost = (post: CommunityPost, field: "likes" | "reposts", amount: number) => {
    const nextPosts = posts.map(item => item.id === post.id ? { ...item, [field]: Math.max(0, item[field] + amount) } : item);
    setPosts(nextPosts);
    savePosts(nextPosts);
  };

  const toggleLike = (post: CommunityPost) => {
    const liked = likedIds.includes(post.id);
    updatePost(post, "likes", liked ? -1 : 1);
    setLikedIds(current => liked ? current.filter(id => id !== post.id) : [...current, post.id]);
  };

  const toggleSave = (post: CommunityPost) => setSavedIds(current => current.includes(post.id) ? current.filter(id => id !== post.id) : [...current, post.id]);
  const toggleFollow = (member: Member) => setFollowedHandles(current => current.includes(member.handle) ? current.filter(handle => handle !== member.handle) : [...current, member.handle]);

  return (
    <div className="community-page">
      <section className="community-intro">
        <div>
          <div className="eyebrow inline-flex items-center gap-2"><Users size={14} /> The Medweg community</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">A better place to figure it out together.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Follow the people, questions, and practical notes that make an international medical journey feel less complicated.</p>
        </div>
        <button type="button" onClick={() => setComposerOpen(true)} className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm" data-testid="button-start-discussion"><PenLine size={16} /> Share an update</button>
      </section>

      <div className="community-shell">
        <aside className="community-sidebar">
          <div className="community-profile-card">
            <div className="flex items-center gap-3"><Avatar member={currentMember} size="lg" /><div className="min-w-0"><p className="truncate text-sm font-extrabold">{currentMember.name}</p><p className="truncate text-xs text-muted-foreground">@{currentMember.handle}</p></div></div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Your profile helps other members understand your perspective.</p>
            <Link to="/profile" className="mt-4 inline-flex text-xs font-extrabold text-primary hover:underline">Edit profile <span aria-hidden="true" className="ml-1">→</span></Link>
          </div>
          <nav className="community-topic-nav" aria-label="Community categories">
            <p className="community-nav-label">Browse</p>
            {TOPICS.map(item => <button key={item} type="button" onClick={() => setActiveTopic(item)} className={activeTopic === item ? "active" : ""}><span className="community-topic-dot" />{item}</button>)}
          </nav>
          <div className="community-side-note"><Sparkles size={16} className="text-primary" /><p><strong>Keep it useful.</strong><br />Share context, sources, and what you’ve already tried.</p></div>
        </aside>

        <main className="community-feed">
          <div className="community-feed-toolbar">
            <div><p className="text-sm font-extrabold">{activeTopic === "For you" ? "Your community feed" : activeTopic}</p><p className="mt-1 text-xs text-muted-foreground">Short notes from people on the same journey</p></div>
            <div className="relative w-full sm:w-56"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the community" className="community-search" aria-label="Search the community" /></div>
          </div>

          {composerOpen && <section className="community-composer"><div className="flex items-start gap-3"><Avatar member={currentMember} /><div className="min-w-0 flex-1"><textarea autoFocus value={body} onChange={event => setBody(event.target.value)} rows={4} placeholder="What are you learning, planning, or wondering about?" className="community-composer-input" data-testid="textarea-community-body" /><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><label className="relative"><span className="sr-only">Choose a category</span><select value={topic} onChange={event => setTopic(event.target.value)} className="community-select">{TOPICS.filter(item => item !== "For you").map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" /></label><div className="flex items-center gap-2"><button type="button" onClick={() => setComposerOpen(false)} className="btn-quiet rounded-lg px-3 py-2 text-xs">Cancel</button><button type="button" onClick={handlePublish} disabled={!body.trim()} className="btn-primary rounded-lg px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-publish-community">Post update</button></div></div></div><button type="button" onClick={() => setComposerOpen(false)} className="icon-button" aria-label="Close composer"><X size={16} /></button></div></section>}

          <div className="space-y-3">{visiblePosts.map(post => {
            const liked = likedIds.includes(post.id);
            const saved = savedIds.includes(post.id);
            return <article key={post.id} className="community-post-card">
              <div className="flex items-start gap-3"><button type="button" onClick={() => setSelectedMember(post.author)} className="shrink-0" aria-label={`View ${post.author.name} profile`}><Avatar member={post.author} /></button><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><button type="button" onClick={() => setSelectedMember(post.author)} className="truncate text-left text-sm font-extrabold hover:text-primary">{post.author.name}{post.author.verified && <Check size={13} className="ml-1 inline rounded-full bg-primary p-0.5 text-white" />}</button><p className="truncate text-xs text-muted-foreground">@{post.author.handle} · {post.time}</p></div><button type="button" className="icon-button -mr-2 -mt-2 h-8 w-8" aria-label="More post options"><MoreHorizontal size={16} /></button></div><p className="mt-3 text-sm leading-6 text-foreground">{post.body}</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className="community-topic-chip">{post.topic}</span>{post.starter && <span className="community-guide-chip">Guide</span>}</div><div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"><button type="button" onClick={() => undefined} className="community-action"><MessageCircle size={15} /> {post.replies}</button><button type="button" onClick={() => updatePost(post, "reposts", post.reposts ? -post.reposts : 1)} className={`community-action ${post.reposts ? "text-primary" : ""}`}><Repeat2 size={15} /> {post.reposts}</button><button type="button" onClick={() => toggleLike(post)} className={`community-action ${liked ? "text-rose-500" : ""}`}><Heart size={15} fill={liked ? "currentColor" : "none"} /> {post.likes}</button><button type="button" onClick={() => toggleSave(post)} className={`community-action ${saved ? "text-primary" : ""}`} aria-label={saved ? "Remove bookmark" : "Bookmark post"}><Bookmark size={15} fill={saved ? "currentColor" : "none"} /></button></div></div></div>
            </article>;
          })}</div>
          {visiblePosts.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><Search size={20} className="mx-auto text-muted-foreground" /><h3 className="mt-3 text-sm font-extrabold">Nothing here yet</h3><p className="mt-1 text-xs text-muted-foreground">Try a different category or search term.</p></div>}
        </main>

        <aside className="community-right-rail">
          <div className="community-rail-card"><div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">People to know</h2><Sparkles size={15} className="text-primary" /></div><div className="mt-4 space-y-4">{MEMBERS.filter(member => member.handle !== currentMember.handle).slice(0, 3).map(member => { const followed = followedHandles.includes(member.handle); return <div key={member.handle} className="flex items-center gap-3"><button type="button" onClick={() => setSelectedMember(member)}><Avatar member={member} size="sm" /></button><button type="button" className="min-w-0 flex-1 text-left" onClick={() => setSelectedMember(member)}><p className="truncate text-xs font-extrabold">{member.name}</p><p className="truncate text-[11px] text-muted-foreground">{member.role}</p></button><button type="button" onClick={() => toggleFollow(member)} className={`community-follow ${followed ? "following" : ""}`}>{followed ? "Following" : <><UserPlus size={13} /> Follow</>}</button></div>; })}</div><button type="button" className="mt-5 text-xs font-extrabold text-primary hover:underline">See more people</button></div>
          <div className="community-rail-card"><h2 className="text-sm font-extrabold">Popular rooms</h2><div className="mt-3 space-y-2">{TOPICS.filter(topicName => topicName !== "For you").slice(0, 3).map((item, index) => <button key={item} type="button" onClick={() => setActiveTopic(item)} className="community-room"><span>0{index + 1}</span><strong>{item}</strong><small>{index * 8 + 12} conversations</small></button>)}</div></div>
        </aside>
      </div>

      {selectedMember && <div className="community-modal-backdrop" role="presentation" onClick={() => setSelectedMember(null)}><section className="community-member-modal" role="dialog" aria-modal="true" aria-label={`${selectedMember.name} profile`} onClick={event => event.stopPropagation()}><button type="button" onClick={() => setSelectedMember(null)} className="icon-button absolute right-3 top-3" aria-label="Close profile"><X size={16} /></button><div className={`community-profile-cover community-profile-cover-${selectedMember.tone}`} /><div className="-mt-8 px-6"><Avatar member={selectedMember} size="lg" /><h2 className="mt-3 text-xl font-extrabold">{selectedMember.name}{selectedMember.verified && <Check size={15} className="ml-1 inline rounded-full bg-primary p-0.5 text-white" />}</h2><p className="text-sm text-muted-foreground">@{selectedMember.handle}</p><p className="mt-4 text-sm leading-6">{selectedMember.role}. Sharing practical notes and learning with the Medweg community.</p><div className="mt-5 flex items-center gap-3"><button type="button" onClick={() => toggleFollow(selectedMember)} className={`community-modal-follow ${followedHandles.includes(selectedMember.handle) ? "following" : ""}`}>{followedHandles.includes(selectedMember.handle) ? "Following" : "Follow"}</button><button type="button" onClick={() => setSelectedMember(null)} className="btn-quiet rounded-lg px-4 py-2 text-xs">Close</button></div></div></section></div>}
    </div>
  );
}

export type { CommunityPost };
