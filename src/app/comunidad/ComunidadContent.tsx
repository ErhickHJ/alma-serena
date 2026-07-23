"use client";

import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { site } from "@/lib/site";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";
import { ForumForm } from "./ForumForm";
import { LeadersSection } from "./LeadersSection";
import { AdminDeleteButton } from "@/components/AdminDeleteButton";

const CHALLENGE_ICONS: Record<string, string> = {
  sunrise: "🌅",
  diary: "📝",
  pause: "🧘",
};

const FEATURE_ICONS = ["☽", "✦", "✿"];

export default function ComunidadContent({ posts, offline }: { posts: any[]; offline: boolean }) {
  const { lang } = useLang();
  const t = translations[lang].communityPage;

  return (
    <>
      <CommunityHero t={t} />
      <CommunityFeatures t={t} />
      <MonthlyChallenges t={t} />
      <ForumSection t={t} posts={posts} offline={offline} />
      <LeadersSection />
      <CommunityCTA t={t} />
    </>
  );
}

// ============ HERO COMUNIDAD ============
function CommunityHero({ t }: { t: any }) {
  return (
    <section className="py-20 bg-gradient-to-b from-sage/5 to-warm-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-gold/60 text-xs tracking-widest uppercase mb-3 font-medium">{t.heroLabel}</div>
        <h1 className="font-serif text-4xl sm:text-5xl text-sage-dark leading-tight mb-4">
          {t.heroTitle}
        </h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed">
          {t.heroDesc}
        </p>
      </div>
    </section>
  );
}

// ============ RETOS MENSUALES ============
function MonthlyChallenges({ t }: { t: any }) {
  const challenges = [
    { icon: "🌅", ...t.challenges.sunrise, tag: "Mindfulness" },
    { icon: "📝", ...t.challenges.diary, tag: "Gratitud" },
    { icon: "🧘", ...t.challenges.pause, tag: "Meditación" },
  ];

  return (
    <section className="py-20 bg-sage/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>{t.challengesTitle}</SectionTitle>
          <p className="text-xs text-charcoal/50 mt-2">{t.challengesDesc}</p>
          <DecorativeDivider className="my-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((c: any) => (
            <div key={c.title} className="p-6 rounded-xl bg-warm-white border border-sage/10 hover:border-sage/30 transition-all flex flex-col">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <span className="text-3xl">{c.icon}</span>
                <span className="text-[10px] uppercase tracking-wider text-sage bg-sage/10 px-2 py-1 rounded-full">{c.tag}</span>
              </div>
              <h3 className="font-serif text-lg text-sage-dark mb-2 shrink-0">{c.title}</h3>
              <p className="text-xs text-charcoal/50 leading-relaxed flex-1">{c.desc}</p>
              <div className="flex items-center justify-between mt-4 shrink-0">
                <span className="text-[10px] text-gold font-medium">{c.duration}</span>
                <span className="text-[10px] text-sage/50">Tag: #AlmaSerena</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CARACTERÍSTICAS COMUNIDAD ============
function CommunityFeatures({ t }: { t: any }) {
  const features = [
    { icon: "☽", ...t.features.forum },
    { icon: "✦", ...t.features.challenges },
    { icon: "✿", ...t.features.content },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f: any) => (
            <div key={f.title} className="p-8 rounded-xl bg-cream/40 border border-sage/10 text-center hover:border-sage/30 transition-colors flex flex-col">
              <div className="text-4xl mb-4 shrink-0">{f.icon}</div>
              <h3 className="font-serif text-xl text-sage-dark mb-3 shrink-0">{f.title}</h3>
              <p className="text-sm text-charcoal/50 leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FORO COMUNIDAD ============
function ForumSection({ t, posts, offline }: { t: any; posts: any[]; offline: boolean }) {
  return (
    <section className="py-20 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle>{t.voicesTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
        </div>

        {offline && (
          <p className="text-center text-xs text-sage/50 italic mb-8">✿ {t.sampleMsg}</p>
        )}

        <div className="space-y-6 mb-10">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-xl bg-warm-white border border-sage/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-medium text-sm">
                  {post.author?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-medium text-sm text-charcoal">{post.author}</div>
                  <div className="text-xs text-gold">{post.tag || "Comunidad"}</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs text-charcoal/30">{new Date(post.createdAt).toLocaleDateString("es")}</span>
                  {!offline && <ReportButton t={t} postId={post.id} />}
                  {!offline && <AdminDeleteButton postId={post.id} />}
                </div>
              </div>
              <p className="text-charcoal/60 text-sm leading-relaxed">&ldquo;{post.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <ForumForm />
      </div>
    </section>
  );
}

function ReportButton({ t, postId }: { t: any; postId: string }) {
  return (
    <button
      onClick={async () => {
        await fetch("/api/forum/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId }) });
        alert(t.reportMsg);
      }}
      className="text-xs text-charcoal/20 hover:text-red-400 transition-colors"
      title={t.reportBtn}
    >
      ⚑
    </button>
  );
}

// ============ CTA COMUNIDAD ============
function CommunityCTA({ t }: { t: any }) {
  return (
    <section className="py-20 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-4xl mb-4 text-sage/40">☽</div>
        <SectionTitle>{t.shareTitle}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/60 leading-relaxed mb-8">
          {t.shareDesc}
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-charcoal/50">
          <span>{t.followUs}:</span>
          {Object.values(site.social).filter(s => s.url && s.label !== "WhatsApp").map(s => (
            <a key={s.label} href={s.url!} target="_blank" rel="noopener noreferrer" className="text-sage-dark hover:text-sage transition-colors font-medium">
              {s.label}
            </a>
          ))}
          {Object.values(site.social).filter(s => !s.url).map(s => (
            <span key={s.label} className="text-charcoal/20">{s.label} (pronto)</span>
          ))}
        </div>
      </div>
    </section>
  );
}
