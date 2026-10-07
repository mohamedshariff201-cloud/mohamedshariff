import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Clapperboard,
  Code2,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Mail,
  Menu,
  MonitorPlay,
  Palette,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import portraitAsset from "@/assets/portrait.jpg.asset.json";

const description =
  "Portfolio of Mohamed Shariff M, an emerging e-learning developer, instructional developer, and graphic and motion graphics designer.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Shariff M | E-Learning Portfolio" },
      { name: "description", content: description },
      { property: "og:title", content: "Mohamed Shariff M | E-Learning Portfolio" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["Home", "About", "Education", "Skills", "Services", "Portfolio", "Contact"];

const skillGroups = [
  {
    icon: BookOpen,
    number: "01",
    title: "E-Learning & Instructional",
    description: "Designing learning that feels clear, intentional, and engaging.",
    skills: [
      "E-Learning Development",
      "Instructional Development",
      "Digital Learning",
      "Learning Experience Design",
      "Articulate Storyline",
      "E-Learning Technology",
    ],
  },
  {
    icon: Palette,
    number: "02",
    title: "Creative & Multimedia",
    description: "Building visual systems that help ideas connect and stay memorable.",
    skills: [
      "Graphic Design",
      "Motion Graphics",
      "Multimedia Design",
      "Animation",
      "Visual Communication",
    ],
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "Technology & Innovation",
    description: "Exploring digital tools and AI to improve how learning is created.",
    skills: ["Programming", "Digital Tools", "AI-Assisted Creativity", "Technology-Enhanced Learning"],
  },
];

const services = [
  {
    icon: MonitorPlay,
    title: "E-Learning Developer",
    description:
      "Design engaging and interactive digital learning experiences using e-learning technologies and learner-focused approaches.",
  },
  {
    icon: Target,
    title: "Instructional Developer",
    description:
      "Transform complex information into structured, clear, meaningful, and engaging learning content.",
  },
  {
    icon: Clapperboard,
    title: "Graphic & Motion Designer",
    description:
      "Create visually engaging graphics, animations, motion graphics, and multimedia that support communication and learning.",
  },
];

const values = [
  { icon: BookOpen, title: "Learn", text: "Continuously developing technical and professional knowledge." },
  { icon: Palette, title: "Design", text: "Creating clear and visually engaging learning experiences." },
  { icon: Lightbulb, title: "Innovate", text: "Exploring AI and modern digital technologies." },
  { icon: Rocket, title: "Grow", text: "Building capabilities for a career in digital learning." },
];

const EMAILJS_SERVICE_ID = "service_bq4tudw";
const EMAILJS_TEMPLATE_ID = "template_zh9rspr";
const EMAILJS_PUBLIC_KEY = "EOMOdw1y-oZUt1v8W";

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (!name || name.length > 100) nextErrors["name"] = "Enter your name (up to 100 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      nextErrors["email"] = "Enter a valid email address.";
    if (!message || message.length > 1000)
      nextErrors["message"] = "Enter a message (up to 1,000 characters).";

    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          message,
          from_name: name,
          from_email: email,
          reply_to: email,
          subject: `Portfolio enquiry from ${name}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      formEl.reset();
      setStatus({ ok: true, text: "Thanks! Your message has been sent." });
    } catch {
      setStatus({
        ok: false,
        text: "Sorry, the message could not be sent. Please email mohamedshariff201@gmail.com directly.",
      });
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
          <a href="#home" className="group flex min-w-0 items-center gap-3" aria-label="Mohamed Shariff M, home">
            <span className="grid size-9 shrink-0 place-items-center bg-primary font-display text-sm font-black text-primary-foreground">MS</span>
            <span className="truncate font-display text-sm font-bold text-hero-foreground sm:text-base">Mohamed Shariff M</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
            <Button asChild className="ml-3 h-10 rounded-none px-5 font-bold">
              <a href="#contact">Let&apos;s Connect <ArrowRight /></a>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav lg:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}<ArrowRight className="size-4" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="hero-section scroll-mt-20">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="mx-auto flex min-h-[94svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-12">
            <div className="relative z-10">
              <p className="eyebrow animate-reveal">Emerging E-Learning Professional</p>
              <h1 className="hero-word hero-word--name animate-reveal" style={{ animationDelay: "80ms" }}>
                <span className="block">Mohamed</span>
                <span className="block text-accent">Shariff M</span>
              </h1>
              <div className="hero-rule animate-reveal" style={{ animationDelay: "140ms" }} />
            </div>

            <div className="relative z-10 mt-4 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
              <div className="max-w-3xl animate-reveal" style={{ animationDelay: "200ms" }}>
                <p className="font-display text-base font-semibold text-hero-muted sm:text-lg">
                  E-Learning Developer <span className="text-accent">·</span> Instructional Developer <span className="text-accent">·</span> Graphic & Motion Graphics Designer
                </p>
                <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-hero-foreground sm:text-5xl lg:text-6xl">
                  Designing engaging digital learning experiences.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-hero-muted sm:text-lg">
                  I combine instructional thinking, e-learning technology, visual design, animation, and AI-assisted creativity to turn complex content into clear and memorable digital learning.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="h-12 rounded-none px-6 font-bold">
                    <a href="#portfolio">Explore My Work <ArrowDown /></a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="hero-outline h-12 rounded-none px-6 font-bold">
                    <a href="#contact">Let&apos;s Connect <ArrowRight /></a>
                  </Button>
                </div>
              </div>

              <ProfileArtwork />
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-hero-foreground/15 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-hero-muted">
              <span>Technology · Learning · Creativity</span>
              <span className="hidden sm:inline">Based in India</span>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad scroll-mt-20 bg-background">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12">
            <div className="relative min-h-[390px] overflow-hidden bg-secondary">
              <div className="about-grid" aria-hidden="true" />
              <div className="absolute inset-x-8 bottom-8 border-l-4 border-accent pl-6">
                <span className="font-display text-8xl font-black text-primary/10">MS</span>
                <p className="mt-2 max-w-xs font-display text-2xl font-bold text-secondary-foreground">Learning at the intersection of technology and creativity.</p>
              </div>
              <Code2 className="absolute right-8 top-8 size-14 text-primary" aria-hidden="true" />
            </div>

            <div className="self-center">
              <SectionHeading kicker="About me" title="Curious by nature. Creative by practice." />
              <p className="mt-7 text-lg leading-8 text-muted-foreground">
                I&apos;m a postgraduate student exploring how technology, programming, and thoughtful design can make digital learning more effective. My interests span e-learning technology, Articulate Storyline, instructional development, multimedia design, motion graphics, and AI-assisted creativity.
              </p>
              <p className="mt-5 text-lg leading-8 text-foreground">
                I&apos;m continuously developing my technical, creative, and professional skills with the goal of creating meaningful digital learning experiences.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Technology", "Digital learning", "Visual design", "Animation", "AI creativity", "Career growth"].map((item) => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section-pad scroll-mt-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading kicker="Education" title="Building the foundation." inverse />
            <div className="education-track mt-14">
              <article className="education-item">
                <div className="education-icon"><Code2 /></div>
                <div>
                  <span className="status-chip">Completed</span>
                  <h3>BCA — Bachelor of Computer Applications</h3>
                  <p>The foundation for my interest in computing, programming, and technology.</p>
                </div>
              </article>
              <article className="education-item">
                <div className="education-icon"><GraduationCap /></div>
                <div>
                  <span className="status-chip status-chip--active">Currently pursuing</span>
                  <h3>M.Sc. — E-Learning Technology</h3>
                  <p>Connecting technology with digital learning, instructional development, and multimedia.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad scroll-mt-20 bg-background">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <SectionHeading kicker="Skills & expertise" title="A growing multidisciplinary toolkit." />
              <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
                Combining learner-focused thinking with visual craft and evolving technology.
              </p>
            </div>
            <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
              {skillGroups.map((group) => (
                <article key={group.title} className="skill-card group">
                  <div className="flex items-start justify-between">
                    <span className="service-icon"><group.icon /></span>
                    <span className="font-display text-sm font-bold text-muted-foreground">{group.number}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold">{group.title}</h3>
                  <p className="mt-3 min-h-14 leading-6 text-muted-foreground">{group.description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {group.skills.map((skill) => <span key={skill} className="skill-pill">{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad scroll-mt-20 bg-secondary">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading kicker="What I’m developing" title="Creative learning services." />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {services.map((service, index) => (
                <article key={service.title} className="service-card">
                  <div className="flex items-center justify-between">
                    <span className="service-icon"><service.icon /></span>
                    <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-12 font-display text-2xl font-bold">{service.title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{service.description}</p>
                  <div className="mt-8 h-1 w-12 bg-accent transition-all duration-300 group-hover:w-20" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-pad scroll-mt-20 bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <SectionHeading kicker="Portfolio" title="Learning & Creative Journey" inverse />
                <p className="mt-7 max-w-xl text-lg leading-8 text-portfolio-muted">
                  Currently building meaningful projects and expanding my portfolio through continuous learning, experimentation, and creative exploration.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["E-learning exploration", "Instructional design practice", "Multimedia experimentation", "Motion graphics", "Articulate Storyline", "AI-assisted creativity"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-portfolio-muted"><CheckCircle2 className="size-4 shrink-0 text-accent" />{item}</div>
                  ))}
                </div>
              </div>
              <div className="project-stage">
                <div className="project-stage__chrome"><span /><span /><span /></div>
                <div className="grid min-h-[360px] place-items-center p-8 text-center">
                  <div>
                    <Boxes className="mx-auto size-16 text-accent" strokeWidth={1.25} />
                    <p className="mt-7 font-display text-3xl font-bold text-hero-foreground">Work in progress.</p>
                    <p className="mx-auto mt-3 max-w-sm leading-7 text-portfolio-muted">This space is ready for future learning experiences, design explorations, and case studies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad bg-background" aria-labelledby="journey-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading kicker="Career journey" title="Learning with direction." id="journey-heading" />
            <div className="journey-path mt-14">
              {["BCA", "M.Sc. E-Learning Technology", "E-Learning & Creative Technology"].map((step, index) => (
                <div key={step} className="journey-step">
                  <span>{index + 1}</span>
                  <h3>{step}</h3>
                  {index < 2 && <ArrowRight className="journey-arrow" aria-hidden="true" />}
                </div>
              ))}
            </div>
            <p className="mt-12 text-center font-display text-xl font-semibold text-muted-foreground sm:text-2xl">
              Technology <span className="text-primary">+</span> Instructional Thinking <span className="text-primary">+</span> Design <span className="text-accent">+</span> Multimedia <span className="text-accent">+</span> AI
            </p>
          </div>
        </section>

        <section className="pb-24 sm:pb-32 bg-background" aria-labelledby="approach-heading">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading kicker="My approach" title="Learn. Design. Innovate. Grow." id="approach-heading" />
            <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <article key={value.title} className="value-card">
                  <value.icon className="size-6 text-primary" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad scroll-mt-20 bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
            <div>
              <p className="eyebrow eyebrow--light">Contact</p>
              <h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-tight sm:text-5xl">Let&apos;s create better learning experiences.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-contact-muted">
                Interested in e-learning, instructional development, multimedia, or creative digital learning? Let&apos;s connect.
              </p>
              <div className="mt-10 space-y-5">
                <a className="contact-link" href="mailto:mohamedshariff201@gmail.com"><Mail /> <span><small>Email</small>mohamedshariff201@gmail.com</span></a>
                <a className="contact-link" href="tel:+917904374804"><Phone /> <span><small>Phone</small>7904374804</span></a>
                <div className="contact-link"><ExternalLink /> <span><small>LinkedIn</small>Mohamed Shariff M</span></div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <Input id="name" name="name" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors["name"])} aria-describedby={errors["name"] ? "name-error" : undefined} />
                {errors["name"] && <p id="name-error" className="form-error">{errors["name"]}</p>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={Boolean(errors["email"])} aria-describedby={errors["email"] ? "email-error" : undefined} />
                {errors["email"] && <p id="email-error" className="form-error">{errors["email"]}</p>}
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <Textarea id="message" name="message" rows={6} maxLength={1000} aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "message-error" : undefined} />
                {errors["message"] && <p id="message-error" className="form-error">{errors["message"]}</p>}
              </div>
              <Button type="submit" size="lg" disabled={sending} className="h-12 w-full rounded-none bg-accent font-bold text-accent-foreground hover:bg-accent/90 sm:w-auto">
                {sending ? "Sending..." : "Send Message"} <Send />
              </Button>
              <p aria-live="polite" className={`text-xs leading-5 ${status && !status.ok ? "text-destructive" : "text-contact-muted"}`}>
                {status ? status.text : "Your message is sent straight to my inbox."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-footer px-5 py-10 text-footer-foreground sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 border-b border-footer-border pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-xl font-bold">Mohamed Shariff M</p>
            <p className="mt-2 max-w-2xl text-sm text-footer-muted">E-Learning Developer · Instructional Developer · Graphic & Motion Graphics Designer</p>
          </div>
          <p className="font-display text-xl font-semibold text-accent">Learn. Create. Design. Grow.</p>
        </div>
        <div className="mx-auto mt-7 flex max-w-7xl flex-col gap-3 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Mohamed Shariff M. All rights reserved.</p>
          <div className="flex flex-wrap gap-5"><a href="mailto:mohamedshariff201@gmail.com">Email</a><a href="tel:+917904374804">Phone</a><span>LinkedIn</span></div>
        </div>
      </footer>
    </div>
  );
}

function ProfileArtwork() {
  return (
    <div className="profile-art animate-reveal" style={{ animationDelay: "280ms" }}>
      <div className="profile-art__label"><Sparkles className="size-4" /> Creative learning</div>
      <div className="profile-art__panel">
        <img
          className="profile-art__photo"
          src={portraitAsset.url}
          alt="Mohamed Shariff M, e-learning developer and graphic & motion graphics designer"
          width={618}
          height={825}
        />
      </div>
      <div className="profile-art__node profile-art__node--one"><BookOpen /></div>
      <div className="profile-art__node profile-art__node--two"><Palette /></div>
      <div className="profile-art__node profile-art__node--three"><Code2 /></div>
    </div>
  );
}

function SectionHeading({ kicker, title, inverse = false, id }: { kicker: string; title: string; inverse?: boolean; id?: string }) {
  return (
    <div>
      <p className={`eyebrow ${inverse ? "eyebrow--light" : ""}`}>{kicker}</p>
      <h2 id={id} className={`mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl ${inverse ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
    </div>
  );
}