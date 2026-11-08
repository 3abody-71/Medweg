import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  PenLine,
  Search,
  Send,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import countries from "../data/countries.json";
import { FEATURE_VISIBILITY } from "../config/featureVisibility";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

type Member = {
  name: string;
  handle: string;
  role: string;
  initials: string;
  tone: string;
  country?: string;
  verified?: boolean;
};

type Comment = { id: string; author: Member; body: string; time: string };
type CommunityPost = {
  id: string;
  author: Member;
  body: string;
  topic: string;
  countryId?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  likedBy?: string[];
  reported?: boolean;
};

type Conversation = { handle: string; member: Member; messages: string[] };

const TOPICS = ["All posts", "Countries", ...(FEATURE_VISIBILITY.specialties ? ["Specialties"] : []), "Exams & licensing", "Student life"];
const MEMBERS: Member[] = [
  { name: "medvade Guides", handle: "medweg", role: "Pathway editors", initials: "M", tone: "blue", verified: true },
  { name: "Lina Hassan", handle: "linah", role: "IMG · UK pathway", initials: "LH", tone: "peach", country: "United Kingdom" },
  { name: "Omar Khaled", handle: "omark", role: "Final-year medical student", initials: "OK", tone: "mint", country: "United States" },
  { name: "Sara Mensah", handle: "saram", role: "Resident · Canada", initials: "SM", tone: "lavender", country: "Canada" },
];
const STARTER_POSTS: CommunityPost[] = [
  { id: "compare-routes", author: MEMBERS[0], body: "Before choosing a country, compare the full route—not just the exam. Registration, language evidence, cost, visa clarity, training length, and your realistic application timeline all matter.", topic: "Countries", createdAt: "2026-11-08T15:30:00.000Z", likes: 38, comments: [{ id: "c1", author: MEMBERS[1], body: "This is exactly the checklist I needed.", time: "1h" }] },
  { id: "uk-plab", author: MEMBERS[1], body: "For anyone preparing for PLAB 1: what resources helped you most, and how far in advance did you book your exam? I’m building a 12-week plan and would love to compare approaches.", topic: "Exams & licensing", countryId: "uk", createdAt: "2026-11-08T13:30:00.000Z", likes: 26, comments: [] },
  { id: "specialty-fit", author: MEMBERS[2], body: "I’m between internal medicine and paediatrics. The work itself matters more to me than the “easy” route. How did you decide which daily rhythm and patient relationship fit you best?", topic: "Specialties", createdAt: "2026-11-08T11:30:00.000Z", likes: 21, comments: [] },
  { id: "first-month", author: MEMBERS[3], body: "Small reminder for anyone moving countries: the first month is mostly admin. Make one folder for identity documents, translations, exam receipts, and every email from the licensing body.", topic: "Student life", countryId: "canada", createdAt: "2026-11-07T15:30:00.000Z", likes: 44, comments: [] },
];

function load<T>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}
function store(key: string, value: unknown) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ } }
function memberFromProfile(profile: ReturnType<typeof useApp>["profile"]): Member {
  const name = profile.name.trim() || "Your profile";
  return { name, handle: name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18) || "yourprofile", role: profile.currentCountry || "Medvade member", country: profile.currentCountry || undefined, initials: name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "Y", tone: "blue" };
}
function timeAgo(iso: string) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
  return `${Math.round(minutes / 1440)}d`;
}
function Avatar({ member, size = "md" }: { member: Member; size?: "sm" | "md" | "lg" }) {
  return <span className={`community-avatar community-avatar-${member.tone} community-avatar-${size}`} aria-hidden="true">{member.initials}</span>;
}

export default function Community() {
  const { profile } = useApp();
  const { user } = useAuth();
  const currentMember = useMemo(() => memberFromProfile(profile), [profile]);
  const [posts, setPosts] = useState<CommunityPost[]>(() => load("medweg-community-posts-v3", STARTER_POSTS));
  const [activeTopic, setActiveTopic] = useState("All posts");
  const [countryFilter, setCountryFilter] = useState("");
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("Countries");
  const [countryId, setCountryId] = useState("");
  const [likedIds, setLikedIds] = useState<string[]>(() => load("medweg-community-likes", []));
  const [followedHandles, setFollowedHandles] = useState<string[]>(() => load("medweg-community-follows", ["medweg"]));
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [dmBody, setDmBody] = useState("");
  const [reportedId, setReportedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => { store("medweg-community-posts-v3", posts); }, [posts]);
  useEffect(() => { store("medweg-community-likes", likedIds); }, [likedIds]);
  useEffect(() => { store("medweg-community-follows", followedHandles); }, [followedHandles]);

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(post => {
      const country = countries.find(item => item.id === post.countryId);
      const text = `${post.body} ${post.topic} ${post.author.name} ${post.author.handle} ${country?.name || ""}`.toLowerCase();
      const topicMatch = activeTopic === "All posts" || post.topic === activeTopic;
      const countryMatch = !countryFilter || post.countryId === countryFilter;
      const queryMatch = !q || text.includes(q);
      const followingMatch = activeTopic !== "Following" || followedHandles.includes(post.author.handle);
      return topicMatch && countryMatch && queryMatch && followingMatch;
    });
  }, [activeTopic, countryFilter, followedHandles, posts, query]);

  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 3000); };
  const publish = async () => {
    const trimmed = body.trim();
    const lastOwnPost = posts.find(post => post.author.handle === currentMember.handle);
    if (!trimmed) return;
    if (trimmed.length > 600) return showNotice("Keep posts under 600 characters.");
    if (lastOwnPost && Date.now() - new Date(lastOwnPost.createdAt).getTime() < 30000) return showNotice("Please wait a little before posting again.");
    if (posts.some(post => post.author.handle === currentMember.handle && post.body.trim().toLowerCase() === trimmed.toLowerCase())) return showNotice("That looks like a duplicate post.");
    if ((trimmed.match(/https?:\/\//g) || []).length > 2 || /(.)\1{8,}/.test(trimmed)) return showNotice("This post was blocked by the spam check.");
    const next: CommunityPost = { id: `post-${Date.now()}`, author: currentMember, body: trimmed, topic, countryId: countryId || undefined, createdAt: new Date().toISOString(), likes: 0, comments: [] };
    setPosts(current => [next, ...current]); setBody(""); setCountryId(""); setComposerOpen(false); showNotice("Posted to the community.");
    if (user && supabase) { await supabase.from("medweg_community_posts").insert({ id: next.id, author_id: user.id, body: next.body, topic: next.topic, country_id: next.countryId || null }); }
  };
  const toggleLike = (post: CommunityPost) => {
    const liked = likedIds.includes(post.id);
    setLikedIds(current => liked ? current.filter(id => id !== post.id) : [...current, post.id]);
    setPosts(current => current.map(item => item.id === post.id ? { ...item, likes: Math.max(0, item.likes + (liked ? -1 : 1)) } : item));
  };
  const addComment = async (post: CommunityPost) => {
    const trimmed = commentBody.trim();
    if (!trimmed || trimmed.length > 300) return showNotice("Comments must be between 1 and 300 characters.");
    const comment: Comment = { id: `comment-${Date.now()}`, author: currentMember, body: trimmed, time: "now" };
    setPosts(current => current.map(item => item.id === post.id ? { ...item, comments: [...item.comments, comment] } : item));
    setCommentBody("");
    if (user && supabase) await supabase.from("medweg_community_comments").insert({ id: comment.id, post_id: post.id, author_id: user.id, body: trimmed });
  };
  const toggleFollow = (member: Member) => {
    if (member.handle === currentMember.handle) return;
    setFollowedHandles(current => current.includes(member.handle) ? current.filter(handle => handle !== member.handle) : [...current, member.handle]);
  };
  const reportPost = async (post: CommunityPost) => {
    setPosts(current => current.map(item => item.id === post.id ? { ...item, reported: true } : item));
    setReportedId(null); showNotice("Thanks. The post was sent for review.");
    if (user && supabase) await supabase.from("medweg_community_reports").insert({ post_id: post.id, reporter_id: user.id, reason: "community report" });
  };
  const openDm = (member: Member) => { setActiveConversation({ handle: member.handle, member, messages: [`Hi ${member.name.split(" ")[0]}, I found your community post helpful.`] }); setMessagesOpen(true); setSelectedMember(null); };
  const sendDm = () => { if (!dmBody.trim() || !activeConversation) return; setActiveConversation(current => current ? { ...current, messages: [...current.messages, dmBody.trim()] } : current); setDmBody(""); };

  return <div className="community-page">
    <section className="community-intro">
      <div><div className="eyebrow inline-flex items-center gap-2"><Users size={14} /> medvade community</div><h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Practical conversations for your next medical move.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Ask, compare, and learn from people navigating the same countries, exams, and training decisions.</p></div>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={() => setComposerOpen(true)} className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm"><PenLine size={16} /> Create post</button><button type="button" onClick={() => setMessagesOpen(true)} className="btn-quiet inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm"><MessageCircle size={16} /> Messages</button></div>
    </section>
    {notice && <div className="community-notice" role="status"><ShieldCheck size={15} /> {notice}</div>}
    <div className="community-shell">
      <aside className="community-sidebar"><div className="community-profile-card"><div className="flex items-center gap-3"><Avatar member={currentMember} size="lg" /><div className="min-w-0"><p className="truncate text-sm font-extrabold">{currentMember.name}</p><p className="truncate text-xs text-muted-foreground">@{currentMember.handle}</p></div></div><p className="mt-4 text-xs leading-5 text-muted-foreground">Your profile helps people understand your pathway perspective.</p><Link to="/profile" className="mt-4 inline-flex text-xs font-extrabold text-primary hover:underline">Edit profile →</Link></div>
        <nav className="community-topic-nav" aria-label="Community feed"><p className="community-nav-label">Feed</p>{["All posts", "Following", ...TOPICS.filter(item => item !== "All posts")].map(item => <button key={item} type="button" onClick={() => setActiveTopic(item)} className={activeTopic === item ? "active" : ""}><span className="community-topic-dot" />{item}</button>)}</nav>
        <div className="community-side-note"><ShieldCheck size={16} className="text-primary" /><p><strong>Keep it useful.</strong><br />No spam, harassment, or unsafe medical advice.</p></div>
      </aside>
      <main className="community-feed">
        <div className="community-feed-toolbar"><div><p className="text-sm font-extrabold">{activeTopic}</p><p className="mt-1 text-xs text-muted-foreground">Short, useful notes from people on the same journey</p></div><div className="relative w-full sm:w-56"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search posts" className="community-search" aria-label="Search community posts" /></div></div>
        <div className="community-filter-row"><label className="community-filter"><span>Country</span><select value={countryFilter} onChange={event => setCountryFilter(event.target.value)}><option value="">Every country</option>{countries.map(country => <option key={country.id} value={country.id}>{country.flag} {country.name}</option>)}</select><ChevronDown size={13} /></label><span className="text-xs text-muted-foreground">{visiblePosts.length} conversation{visiblePosts.length === 1 ? "" : "s"}</span></div>
        {composerOpen && <section className="community-composer"><div className="flex items-start gap-3"><Avatar member={currentMember} /><div className="min-w-0 flex-1"><textarea autoFocus value={body} onChange={event => setBody(event.target.value)} rows={4} maxLength={600} placeholder="Share a question, lesson, or useful pathway update…" className="community-composer-input" /><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2"><label className="community-select"><span className="sr-only">Category</span><select value={topic} onChange={event => setTopic(event.target.value)}>{TOPICS.filter(item => !["All posts", "Following"].includes(item)).map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><label className="community-select"><span className="sr-only">Country</span><select value={countryId} onChange={event => setCountryId(event.target.value)}><option value="">No country</option>{countries.map(country => <option key={country.id} value={country.id}>{country.flag} {country.name}</option>)}</select><ChevronDown size={13} /></label></div><div className="flex items-center gap-2"><span className="text-[11px] text-muted-foreground">{body.length}/600</span><button type="button" onClick={() => setComposerOpen(false)} className="btn-quiet rounded-lg px-3 py-2 text-xs">Cancel</button><button type="button" onClick={publish} disabled={!body.trim()} className="btn-primary rounded-lg px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40">Post</button></div></div></div><button type="button" onClick={() => setComposerOpen(false)} className="icon-button" aria-label="Close composer"><X size={16} /></button></div></section>}
        <div className="space-y-3">{visiblePosts.map(post => { const liked = likedIds.includes(post.id); const country = countries.find(item => item.id === post.countryId); return <article key={post.id} className="community-post-card"><div className="flex items-start gap-3"><button type="button" onClick={() => setSelectedMember(post.author)} className="shrink-0" aria-label={`View ${post.author.name} profile`}><Avatar member={post.author} /></button><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><button type="button" onClick={() => setSelectedMember(post.author)} className="truncate text-left text-sm font-extrabold hover:text-primary">{post.author.name}{post.author.verified && <Check size={13} className="ml-1 inline rounded-full bg-primary p-0.5 text-white" />}</button><p className="truncate text-xs text-muted-foreground">@{post.author.handle} · {timeAgo(post.createdAt)}</p></div><button type="button" onClick={() => setReportedId(post.id)} className="icon-button -mr-2 -mt-2 h-8 w-8" aria-label="Report post"><MoreHorizontal size={16} /></button></div><p className="mt-3 text-sm leading-6 text-foreground">{post.body}</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className="community-topic-chip">{post.topic}</span>{country && <Link to={`/countries/${country.id}`} className="community-guide-chip">{country.flag} {country.name}</Link>}</div><div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"><button type="button" onClick={() => { setOpenComments(openComments === post.id ? null : post.id); setCommentBody(""); }} className="community-action"><MessageCircle size={15} /> {post.comments.length}</button><button type="button" onClick={() => toggleLike(post)} className={`community-action ${liked ? "text-rose-500" : ""}`}><Heart size={15} fill={liked ? "currentColor" : "none"} /> {post.likes}</button><button type="button" onClick={() => toggleFollow(post.author)} className={`community-action ${followedHandles.includes(post.author.handle) ? "text-primary" : ""}`}><UserPlus size={15} /> {followedHandles.includes(post.author.handle) ? "Following" : "Follow"}</button></div>{openComments === post.id && <div className="community-comments"><div className="space-y-3">{post.comments.map(comment => <div key={comment.id} className="flex gap-2"><Avatar member={comment.author} size="sm" /><div className="rounded-xl bg-secondary/60 px-3 py-2"><p className="text-xs font-extrabold">{comment.author.name} <span className="font-normal text-muted-foreground">· {comment.time}</span></p><p className="mt-1 text-xs leading-5">{comment.body}</p></div></div>)}</div><div className="mt-3 flex gap-2"><input value={commentBody} onChange={event => setCommentBody(event.target.value)} onKeyDown={event => { if (event.key === "Enter") void addComment(post); }} placeholder="Write a helpful reply" className="community-comment-input" aria-label="Write a comment" /><button type="button" onClick={() => void addComment(post)} className="btn-primary rounded-lg px-3 py-2 text-xs"><Send size={13} /></button></div></div>}</div></div></article>; })}</div>
        {visiblePosts.length === 0 && <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><Search size={20} className="mx-auto text-muted-foreground" /><h3 className="mt-3 text-sm font-extrabold">No conversations found</h3><p className="mt-1 text-xs text-muted-foreground">Try another category, country, or search phrase.</p></div>}
      </main>
      <aside className="community-right-rail"><div className="community-rail-card"><div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">People to follow</h2><Bell size={15} className="text-primary" /></div><div className="mt-4 space-y-4">{MEMBERS.filter(member => member.handle !== currentMember.handle).map(member => <div key={member.handle} className="flex items-center gap-3"><button type="button" onClick={() => setSelectedMember(member)}><Avatar member={member} size="sm" /></button><button type="button" className="min-w-0 flex-1 text-left" onClick={() => setSelectedMember(member)}><p className="truncate text-xs font-extrabold">{member.name}</p><p className="truncate text-[11px] text-muted-foreground">{member.role}</p></button><button type="button" onClick={() => toggleFollow(member)} className={`community-follow ${followedHandles.includes(member.handle) ? "following" : ""}`}>{followedHandles.includes(member.handle) ? "Following" : "Follow"}</button></div>)}</div></div><div className="community-rail-card"><h2 className="text-sm font-extrabold">Explore countries</h2><p className="mt-2 text-xs leading-5 text-muted-foreground">Search pathway conversations by destination.</p><div className="mt-3 flex flex-wrap gap-2">{countries.slice(0, 6).map(country => <button key={country.id} type="button" onClick={() => setCountryFilter(country.id)} className="community-country-chip">{country.flag} {country.name}</button>)}</div></div></aside>
    </div>
    {selectedMember && <div className="community-modal-backdrop" role="presentation" onClick={() => setSelectedMember(null)}><section className="community-member-modal" role="dialog" aria-modal="true" aria-label={`${selectedMember.name} profile`} onClick={event => event.stopPropagation()}><button type="button" onClick={() => setSelectedMember(null)} className="icon-button absolute right-3 top-3" aria-label="Close profile"><X size={16} /></button><div className={`community-profile-cover community-profile-cover-${selectedMember.tone}`} /><div className="-mt-8 px-6"><Avatar member={selectedMember} size="lg" /><h2 className="mt-3 text-xl font-extrabold">{selectedMember.name}{selectedMember.verified && <Check size={15} className="ml-1 inline rounded-full bg-primary p-0.5 text-white" />}</h2><p className="text-sm text-muted-foreground">@{selectedMember.handle}</p><p className="mt-4 text-sm leading-6">{selectedMember.role}. Sharing practical notes and learning with the medvade community.</p>{selectedMember.country && <p className="mt-3 text-xs font-bold text-primary">Country focus: {selectedMember.country}</p>}<div className="mt-5 flex items-center gap-3"><button type="button" onClick={() => toggleFollow(selectedMember)} className={`community-modal-follow ${followedHandles.includes(selectedMember.handle) ? "following" : ""}`}>{followedHandles.includes(selectedMember.handle) ? "Following" : "Follow"}</button><button type="button" onClick={() => openDm(selectedMember)} className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs"><MessageCircle size={13} /> Message</button></div></div></section></div>}
    {reportedId && <div className="community-modal-backdrop" role="presentation" onClick={() => setReportedId(null)}><section className="community-report-modal" role="dialog" aria-modal="true" onClick={event => event.stopPropagation()}><Flag size={20} className="text-primary" /><h2 className="mt-3 text-lg font-extrabold">Report this post?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use reports for spam, harassment, unsafe medical claims, or content that does not belong in this community.</p><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setReportedId(null)} className="btn-quiet rounded-lg px-3 py-2 text-xs">Cancel</button><button type="button" onClick={() => { const post = posts.find(item => item.id === reportedId); if (post) void reportPost(post); }} className="btn-primary rounded-lg px-3 py-2 text-xs">Send report</button></div></section></div>}
    {messagesOpen && <div className="community-modal-backdrop" role="presentation" onClick={() => setMessagesOpen(false)}><section className="community-messages-modal" role="dialog" aria-modal="true" onClick={event => event.stopPropagation()}><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="eyebrow">Private messages</p><h2 className="text-lg font-extrabold">Keep helpful conversations moving.</h2></div><button type="button" onClick={() => setMessagesOpen(false)} className="icon-button" aria-label="Close messages"><X size={16} /></button></div><div className="grid min-h-[330px] sm:grid-cols-[180px_1fr]">{!activeConversation ? <div className="col-span-full p-6"><p className="text-sm font-extrabold">Start with someone you follow</p><div className="mt-4 space-y-2">{MEMBERS.filter(member => member.handle !== currentMember.handle).map(member => <button key={member.handle} type="button" onClick={() => openDm(member)} className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-secondary"><Avatar member={member} size="sm" /><span><strong className="block text-xs">{member.name}</strong><small className="text-muted-foreground">@{member.handle}</small></span></button>)}</div></div> : <><div className="border-r border-border p-3"><button type="button" onClick={() => setActiveConversation(null)} className="text-xs font-bold text-primary">← People</button><div className="mt-4 flex items-center gap-2"><Avatar member={activeConversation.member} size="sm" /><span className="text-xs font-extrabold">{activeConversation.member.name}</span></div></div><div className="flex flex-col p-4"><div className="flex-1 space-y-2">{activeConversation.messages.map((message, index) => <div key={`${message}-${index}`} className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-5 ${index % 2 ? "ml-auto bg-primary text-white" : "bg-secondary"}`}>{message}</div>)}</div><div className="mt-4 flex gap-2"><input value={dmBody} onChange={event => setDmBody(event.target.value)} onKeyDown={event => { if (event.key === "Enter") sendDm(); }} placeholder="Write a message" className="community-comment-input" /><button type="button" onClick={sendDm} className="btn-primary rounded-lg px-3 py-2 text-xs"><Send size={13} /></button></div></div></>}</div></section></div>}
  </div>;
}

export type { CommunityPost };
