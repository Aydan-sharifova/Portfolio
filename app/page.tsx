'use client';

import { FormEvent, useEffect, useState } from 'react';
import { BriefcaseBusiness, Code2, Home as HomeIcon, Layers3, Mail, Milestone } from 'lucide-react';
import { MagnificationDock } from '../components/MagnificationDock';
import { Card, CardSwap } from '../components/CardSwap';

const stack: Record<string, string[]> = {
  Frontend: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'Vite', 'HTML / CSS'],
  Backend: ['ASP.NET Core', 'Node.js', 'Express', 'Django', 'Laravel', 'REST API'],
  Data: ['PostgreSQL', 'MySQL', 'Prisma', 'Supabase', 'Redis', 'Python'],
  Tools: ['Git', 'Docker', 'Postman', 'Vercel', 'Figma', 'Power BI'],
};

const projects = [
  { no:'01', name:'NEXACODE', type:'AI / COLLABORATION', copy:'A real-time collaborative coding environment where teams build, talk and ship from one focused workspace.', tech:['React', '.NET', 'SignalR', 'PostgreSQL'], mark:'NX', className:'nexa' },
  { no:'02', name:'HRESTAURANT', type:'HOSPITALITY / OPERATIONS', copy:'A refined restaurant platform connecting reservations, menu operations and an intelligent admin experience.', tech:['ASP.NET Core', 'React', 'EF Core', 'Tailwind'], mark:'HR', className:'restaurant' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [category, setCategory] = useState('Frontend');
  const [sent, setSent] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [theme]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  };
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const dockItems = [
    { icon: <HomeIcon size={18}/>, label: 'Home', onClick: () => goTo('home') },
    { icon: <Code2 size={18}/>, label: 'About', onClick: () => goTo('about') },
    { icon: <Layers3 size={18}/>, label: 'Stack', onClick: () => goTo('stack') },
    { icon: <BriefcaseBusiness size={18}/>, label: 'Projects', onClick: () => goTo('projects') },
    { icon: <Milestone size={18}/>, label: 'Journey', onClick: () => goTo('journey') },
    { icon: <Mail size={18}/>, label: 'Contact', onClick: () => goTo('contact') },
  ];
  return <main>
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="Aydan Şərifova, home">Aydan<sup>®</sup></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
        {['About', 'Stack', 'Projects', 'Journey', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <div className="nav-actions"><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle colour theme">{theme === 'dark' ? '☼' : '☾'}</button><a className="availability" href="#contact">Let&apos;s create <b>↗</b></a></div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>☰</button>
    </header>

    <section className="hero" id="home">
      <video className="cinematic-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src="https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-overlay" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow hero-reveal">Full-stack developer · Baku, Azerbaijan</div>
        <h1 className="hero-reveal"><span>Digital products,</span><em>thoughtfully engineered.</em></h1>
        <p className="hero-intro hero-reveal">I&apos;m Aydan Şərifova. I transform ambitious ideas into refined, scalable experiences—balancing precise engineering with a distinctly human point of view.</p>
        <div className="hero-actions hero-reveal"><a className="primary-button hero-cta" href="#projects">Explore selected work <span>↓</span></a><a className="text-button" href="#contact">Start a conversation ↗</a></div>
      </div>
      <div className="scroll-cue"><span>Scroll to discover</span><i /></div>
    </section>

    <section className="section about" id="about"><div className="section-index">02 / ABOUT</div><div className="about-copy"><p className="kicker">Engineer. Maker. Perpetual learner.</p><h2>I turn complex systems into <em>clear, human</em> experiences.</h2><div className="about-detail"><p>Mən modern və istifadəçi yönümlü rəqəmsal məhsullar hazırlayan Full-Stack Developerəm. Həm interaktiv interfeyslər, həm də miqyaslana bilən backend sistemləri qururam.</p><p>My work lives at the meeting point of design sensitivity, strong architecture and the curiosity to keep improving every detail.</p></div></div><div className="stats"><div><b>12+</b><span>Selected projects</span></div><div><b>25+</b><span>Technologies</span></div><div><b>03</b><span>Years in motion</span></div></div></section>

    <section className="section stack-section" id="stack"><div className="section-head"><div><span className="section-index">03 / CAPABILITIES</span><h2>My working<br/><em>constellation.</em></h2></div><p>Tools change. The ability to choose the right one—and use it with intent—doesn&apos;t.</p></div><div className="stack-layout"><div className="stack-tabs" role="tablist">{Object.keys(stack).map((item,index)=><button role="tab" aria-selected={category===item} className={category===item?'active':''} onClick={()=>setCategory(item)} key={item}><span>0{index+1}</span>{item}<b>↗</b></button>)}</div><div className="stack-map">{stack[category].map((item,index)=><div className={`tech-node node-${index+1}`} key={item}><i>{item.slice(0,2).toUpperCase()}</i><span>{item}</span></div>)}<div className="map-core"><b>{category}</b><small>SELECTED STACK</small></div></div></div></section>

    <section className="section projects" id="projects"><div className="section-head"><div><span className="section-index">04 / SELECTED WORK</span><h2>Products built<br/>to <em>matter.</em></h2></div><p>Two flagship systems that balance difficult engineering with calm, usable interfaces.</p></div>
      <div className="project-swap-layout">
        <div className="swap-intro"><span>INTERACTIVE INDEX</span><h3>Move through<br/>the work.</h3><p>The stack cycles automatically. Hover to pause, or select a card to jump into the project story.</p><div className="swap-status"><i/> Live showcase · 04.2s cycle</div></div>
        <div className="swap-stage"><CardSwap onCardClick={index => goTo(index < 2 ? `project-${index}` : 'journey')}>
          <Card className="showcase-card showcase-nexa"><div className="showcase-top"><span>01 / AI PLATFORM</span><b>NX</b></div><div><h3>NexaCode</h3><p>Real-time collaboration, reimagined.</p></div></Card>
          <Card className="showcase-card showcase-restaurant"><div className="showcase-top"><span>02 / OPERATIONS</span><b>HR</b></div><div><h3>HRestaurant</h3><p>Hospitality systems with a human pulse.</p></div></Card>
          <Card className="showcase-card showcase-journey"><div className="showcase-top"><span>03 / PRACTICE</span><b>AS</b></div><div><h3>Systems in motion</h3><p>Three years of deliberate technical growth.</p></div></Card>
        </CardSwap></div>
      </div>
      <div className="project-list">{projects.map((project,index)=><article className="project-card" id={`project-${index}`} key={project.name}><div className={`project-visual ${project.className}`}><span className="project-mark">{project.mark}</span><div className="window"><div className="window-bar"><i/><i/><i/></div><div className="window-grid">{Array.from({length:9},(_,i)=><span key={i}/>)}</div></div></div><div className="project-info"><div className="project-meta"><span>{project.no}</span><small>{project.type}</small></div><h3>{project.name}</h3><p>{project.copy}</p><div className="chips">{project.tech.map(t=><span key={t}>{t}</span>)}</div><button className="project-link" onClick={()=>document.getElementById('contact')?.scrollIntoView()}>Discuss this kind of project <b>↗</b></button></div></article>)}</div></section>

    <section className="section journey" id="journey"><div className="section-head"><div><span className="section-index">05 / JOURNEY</span><h2>Always in<br/><em>progress.</em></h2></div></div><div className="timeline">{[
      ['2024','THE FOUNDATION','Frontend Development','HTML · CSS · JavaScript · React'],['2025','THE SYSTEMS','Backend & Full-Stack','Node.js · Django · Laravel · Databases'],['2026','THE SCALE','Advanced Full-Stack & AI','.NET · Real-time · AI integration · Cloud']
    ].map((row,index)=><div className="timeline-row" key={row[0]}><span>0{index+1}</span><b>{row[0]}</b><div><small>{row[1]}</small><h3>{row[2]}</h3><p>{row[3]}</p></div></div>)}</div></section>

    <section className="section signal"><div className="signal-copy"><span className="section-index">06 / OPEN SOURCE SIGNAL</span><h2>Code leaves<br/>a <em>trace.</em></h2><p>Clean histories, considered architecture and a habit of documenting the why—not only the what.</p></div><div className="contribution" aria-label="Decorative contribution activity map">{Array.from({length:84},(_,i)=><i key={i} style={{opacity: .12 + ((i*7)%9)/11}}/>)}<div><b>GitHub activity</b><span>Building consistently across product, platform and experiments.</span></div></div></section>

    <section className="contact" id="contact"><div className="contact-orbit" aria-hidden="true"/><div className="contact-copy"><span className="section-index">07 / CONTACT</span><h2>Have an idea?<br/><em>Let&apos;s make it real.</em></h2><p>Tell me about the product, the problem, or the team. I&apos;ll meet you with clear thinking and honest momentum.</p></div><form onSubmit={submit}><label>Your name<input name="name" required minLength={2} placeholder="How should I address you?"/></label><label>Email address<input name="email" type="email" required placeholder="you@company.com"/></label><label>Project brief<textarea name="message" required minLength={10} rows={4} placeholder="A little context goes a long way..."/></label><button className="primary-button" type="submit">Send enquiry <span>↗</span></button>{sent&&<p className="form-success" role="status">Message prepared — thank you. I&apos;ll be in touch.</p>}</form></section>
    <footer><a className="brand" href="#home">A<span>.</span></a><p>© 2026 Aydan Şərifova. Built with intent &amp; code.</p><a href="#home">Back to top ↑</a></footer>
    <div className="dock-shell"><MagnificationDock items={dockItems}/></div>
  </main>;
}
