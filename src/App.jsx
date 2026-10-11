import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Phone, 
  Radio, 
  CheckCircle2, 
  Calendar, 
  Compass, 
  Layers, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  X,
  Menu
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Express Prioritaire');
  
  // Interactive Modal Form State
  const [orderForm, setOrderForm] = useState({
    nom: '',
    telephone: '',
    quartierDepart: 'Centre-ville (Plateau des 15 ans)',
    quartierArrivee: 'Bacongo',
    details: '',
  });

  /* --------------------------------------------------------------------------
     1. GSAP Context & Lifecycle Animations
     -------------------------------------------------------------------------- */
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTimeline
        .from('.hero-badge', { y: 30, opacity: 0, duration: 0.9, delay: 0.2 })
        .from('.hero-title-sans', { y: 40, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero-title-serif', { y: 50, opacity: 0, duration: 1.2 }, '-=0.7')
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.9 }, '-=0.8')
        .from('.hero-cta-group', { y: 30, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.hero-telemetry-bar', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');

      // Features Cards entrance
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '#artefacts',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });

      // Manifesto ScrollTrigger revelation
      gsap.from('.manifesto-text-reveal', {
        scrollTrigger: {
          trigger: '#manifeste',
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Protocol Sticky Stacking Animation
      const cards = gsap.utils.toArray('.protocol-sticky-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cards[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.1,
                opacity: 1 - progress * 0.5,
                filter: `blur(${progress * 18}px)`,
                ease: 'power2.inOut',
                overwrite: 'auto',
              });
            },
          });
        } else {
          // Last card pinned briefly
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: '+=80%',
            pin: true,
            pinSpacing: true,
          });
        }
      });

      // Pricing Cards reveal
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: '#tarifs',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    });

    // Navbar Scroll Listener
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* --------------------------------------------------------------------------
     2. Artefact 1: Mélangeur Diagnostique (Diagnostic Shuffler)
     -------------------------------------------------------------------------- */
  const initialCards = [
    {
      id: 1,
      badge: 'DISPATCH // AUTO-ROUTAGE',
      title: 'Allocation Algorithmique',
      desc: 'Localisation par trilatération du coursier d’élite disponible en moins de 60 secondes.',
      metric: '0.8 min',
      sub: 'Temps de matching moyen',
      color: 'border-mousse/20 bg-creme-surface',
    },
    {
      id: 2,
      badge: 'TRAÇABILITÉ // GÉO-VÉROUILLÉE',
      title: 'Scellé Numérique Confidentiel',
      desc: 'Garantie inviolable avec code OTP dynamique délivré directement à l’expéditeur et destinataire.',
      metric: '100%',
      sub: 'Conformité protocolaire',
      color: 'border-argile/30 bg-[#FFF7F4]',
    },
    {
      id: 3,
      badge: 'VÉLOCITÉ // URBAINE',
      title: 'Acheminement Sans Escale',
      desc: 'Corridor d’évitement des embouteillages brazzavillois (Plateau, Bacongo, Ouenzé, Moungali).',
      metric: '32 min',
      sub: 'Durée record porte-à-porte',
      color: 'border-mousse/20 bg-[#F4F6F5]',
    },
  ];

  const [shufflerList, setShufflerList] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerList((prev) => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleManualShuffle = () => {
    setShufflerList((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      copy.unshift(last);
      return copy;
    });
  };

  /* --------------------------------------------------------------------------
     3. Artefact 2: Machine à Écrire Télémétrie (Live Telemetry Stream)
     -------------------------------------------------------------------------- */
  const telemetryLogs = [
    "[14:02:11] INITIALISATION : Requête d'enlèvement reçue (Centre-ville, Av. Denis Sassou-Nguesso).",
    "[14:03:04] COURSIER ASSIGNÉ : Agent ZUA-07 géolocalisé à 350m. Scellé biométrique activé.",
    "[14:05:42] ENLÈVEMENT CERTIFIÉ : Colis pris en charge. Télémétrie GPS active vers Bacongo.",
    "[14:14:20] COULOIR OPTIMAL : Contournement fluide rond-point Kéba Na Bwanya. Vitesse stabilisée.",
    "[14:26:55] DESTINATION ATTEINTE : Bacongo (Quartier Dahomey). Destinataire notifié.",
    "[14:28:10] REMISE TERMINÉE : Signature cryptographique validée. Temps total de transit : 22 min."
  ];

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullMessage = telemetryLogs[currentLogIndex];
    if (charIndex < fullMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 26);
      return () => clearTimeout(timeout);
    } else {
      const waitTimeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setCurrentLogIndex((prev) => (prev + 1) % telemetryLogs.length);
      }, 2400);
      return () => clearTimeout(waitTimeout);
    }
  }, [charIndex, currentLogIndex]);

  /* --------------------------------------------------------------------------
     4. Artefact 3: Planificateur Protocole Curseur (Cursor Protocol Scheduler)
     -------------------------------------------------------------------------- */
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const fullDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const [activeDay, setActiveDay] = useState(3); // Jeudi default
  const [cursorPhase, setCursorPhase] = useState('idle'); // moving, clicking, saved

  useEffect(() => {
    const interval = setInterval(() => {
      // Step 1: Cursor animates to next day
      setCursorPhase('moving');
      setTimeout(() => {
        setCursorPhase('clicking');
        setActiveDay((prev) => (prev + 1) % 7);
        setTimeout(() => {
          setCursorPhase('saved');
          setTimeout(() => {
            setCursorPhase('idle');
          }, 800);
        }, 600);
      }, 700);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  /* --------------------------------------------------------------------------
     5. WhatsApp Action Handlers
     -------------------------------------------------------------------------- */
  const openOrderModal = (plan = 'Express Prioritaire') => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    const phone = '242065000000'; // Numéro officiel Brazzaville
    const message = encodeURIComponent(
      `*NOUVELLE COMMANDE ZUA EXPRESS*\n` +
      `---------------------------------\n` +
      `Formule : *${selectedPlan}*\n` +
      `Client : ${orderForm.nom || 'Anonyme'}\n` +
      `Téléphone : ${orderForm.telephone || 'Non renseigné'}\n` +
      `Départ : ${orderForm.quartierDepart}\n` +
      `Destination : ${orderForm.quartierArrivee}\n` +
      `Instructions : ${orderForm.details || 'Aucune spécification'}\n` +
      `Date : ${new Date().toLocaleTimeString('fr-FR')} (Brazzaville GMT+1)`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-creme text-charbon selection:bg-argile selection:text-white font-sans">
      
      {/* Global CSS Noise Texture feTurbulence Filter */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ====================================================================
          A. NAVBAR — "L'Île Flottante"
          ==================================================================== */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto relative max-w-4xl w-full">
        <nav
          ref={navRef}
          className={`flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3.5 rounded-full transition-all duration-500 w-full ${
            navScrolled || isMobileMenuOpen
              ? 'bg-creme/85 backdrop-blur-xl border border-mousse/15 shadow-xl shadow-mousse/5 text-charbon'
              : 'bg-charbon/40 backdrop-blur-md border border-white/10 text-white'
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <span className="w-2.5 h-2.5 rounded-full bg-argile animate-pulse-glow" />
            <span className="font-extrabold tracking-tighter text-xl">
              ZUA<span className="font-light opacity-90">EXPRESS</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-mousse/15 text-current border border-current/10 ml-1 hidden sm:inline-block">
              BZV 242
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase font-outfit">
            <a href="#artefacts" className="interactive-lift hover:text-argile transition-colors">
              Artefacts
            </a>
            <a href="#manifeste" className="interactive-lift hover:text-argile transition-colors">
              Manifeste
            </a>
            <a href="#protocole" className="interactive-lift hover:text-argile transition-colors">
              Protocole
            </a>
            <a href="#tarifs" className="interactive-lift hover:text-argile transition-colors">
              Tarifs
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Magnetic CTA Button */}
            <button
              onClick={() => { setIsMobileMenuOpen(false); openOrderModal('Express Prioritaire'); }}
              className="btn-magnetic bg-argile text-white text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 shadow-md shadow-argile/25"
            >
              <span className="btn-slide-bg bg-mousse" />
              <span className="btn-content">
                <span>Commander</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-current/15 hover:text-argile transition-colors"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 mt-3 rounded-3xl overflow-hidden bg-creme/95 backdrop-blur-xl border border-mousse/15 shadow-xl shadow-mousse/10 text-charbon origin-top transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex flex-col p-3 text-sm font-semibold tracking-wider uppercase font-outfit">
            {[
              ['#artefacts', 'Artefacts'],
              ['#manifeste', 'Manifeste'],
              ['#protocole', 'Protocole'],
              ['#tarifs', 'Tarifs'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-mousse/10 hover:text-argile transition-colors"
              >
                <span>{label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </div>
        </div>
        </div>
      </header>

      {/* ====================================================================
          B. SECTION HERO — "Le Plan d'Ouverture"
          ==================================================================== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen lg:min-h-[100dvh] w-full flex flex-col justify-end pt-36 sm:pt-40 md:pt-44 pb-14 md:pb-20 px-6 md:px-16 overflow-hidden bg-charbon"
      >
        {/* Full frame background image with user's background.jpg */}
        <div 
          className="absolute inset-0 bg-cover bg-center md:bg-right scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('./background.jpg')`,
          }}
        />
        {/* Smooth cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charbon/90 via-charbon/65 to-charbon/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charbon via-charbon/40 to-charbon/50" />

        {/* Hero Content pushed safely below the floating navbar */}
        <div className="relative z-10 max-w-4xl pt-6 sm:pt-8 md:pt-10">
          
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-charbon/60 sm:bg-white/10 backdrop-blur-md border border-white/20 text-creme text-xs font-mono tracking-widest uppercase mb-5 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-argile animate-pulse" />
            <span className="font-semibold">INFRASTRUCTURE DE LIVRAISON IMMÉDIATE // BRAZZAVILLE</span>
          </div>

          {/* Typographic Contrast Pattern: Sans Bold + Massive Serif Italic */}
          <h1 className="flex flex-col tracking-tight text-white mb-5">
            <span className="hero-title-sans font-display font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-creme/90">
              ZUA Express est le
            </span>
            <span className="hero-title-serif font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-creme leading-[0.95] text-glow mt-1 font-normal">
              Flux Absolu.
            </span>
          </h1>

          {/* Subtitle / Clinical description */}
          <p className="hero-desc text-creme/80 text-base sm:text-lg md:text-xl font-outfit max-w-2xl font-light leading-relaxed mb-7">
            L'instrument de vélocité urbaine de référence. Acheminement instantané de vos plis, colis 
            précieux et commandes stratégiques en moins de 45 minutes d'un bout à l'autre de Brazzaville.
          </p>

          {/* CTA & Actions */}
          <div className="hero-cta-group flex flex-wrap items-center gap-4">
            <button
              onClick={() => openOrderModal('Express Prioritaire')}
              className="btn-magnetic bg-argile text-white px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-wider shadow-xl shadow-argile/30"
            >
              <span className="btn-slide-bg bg-mousse" />
              <span className="btn-content">
                <span>Commander maintenant</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            <a
              href="#artefacts"
              className="btn-magnetic bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-7 py-4 text-sm uppercase tracking-wider font-semibold"
            >
              <span className="btn-content">
                <span>Explorer les artefacts</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Bottom Telemetry Ticker */}
          <div className="hero-telemetry-bar mt-8 md:mt-10 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs text-creme/70">
            <div>
              <span className="block text-creme/40 uppercase tracking-widest text-[10px]">Zone Active</span>
              <span className="font-semibold text-creme">Périmètre Brazzaville 360°</span>
            </div>
            <div>
              <span className="block text-creme/40 uppercase tracking-widest text-[10px]">Latence Moyenne</span>
              <span className="font-semibold text-argile font-bold">24 min porte-à-porte</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-creme/40 uppercase tracking-widest text-[10px]">Disponibilité</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Opérationnel 24h / 7j
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          C. FONCTIONNALITES — "Artefacts Fonctionnels Interactifs"
          ==================================================================== */}
      <section id="artefacts" className="py-28 md:py-36 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mousse font-bold mb-3">
              <Layers className="w-4 h-4 text-argile" />
              <span>SYSTÈMES INTERACTIFS DÉDIÉS</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-charbon">
              Trois piliers de précision clinique.
            </h2>
          </div>
          <p className="font-outfit text-charbon/70 max-w-md text-sm md:text-base">
            Chaque carte constitue un instrument fonctionnel en temps réel conçu pour éradiquer 
            l’aléa du transport urbain.
          </p>
        </div>

        {/* The 3 Functional Artefact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARTE 1 — "Mélangeur Diagnostique" */}
          <div className="feature-card bg-creme-surface border border-mousse/15 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl shadow-mousse/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-mousse/60">
                ARTEFACT // 01
              </span>
              <button 
                onClick={handleManualShuffle}
                className="text-[11px] font-mono bg-mousse/10 hover:bg-mousse/20 text-mousse px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                title="Déclencher manuellement le cycle"
              >
                <Sparkles className="w-3 h-3 text-argile" />
                <span>Cycler (3s)</span>
              </button>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-2xl text-charbon mb-2">
                Mélangeur Diagnostique
              </h3>
              <p className="font-outfit text-xs text-charbon/70 mb-8">
                Livraison express certifiée : rotation dynamique des états de transit et réallocation instantanée.
              </p>
            </div>

            {/* Stacked cards cycling with elastic cubic-bezier */}
            <div className="relative h-64 w-full flex items-center justify-center my-4">
              {shufflerList.map((card, idx) => {
                const isTop = idx === 0;
                const isMid = idx === 1;
                const isBottom = idx === 2;

                return (
                  <div
                    key={card.id}
                    className={`absolute inset-x-0 p-5 rounded-[2rem] border shadow-md transition-all ${card.color}`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDuration: '800ms',
                      transform: isTop 
                        ? 'translateY(0px) scale(1)' 
                        : isMid 
                        ? 'translateY(22px) scale(0.94)' 
                        : 'translateY(44px) scale(0.88)',
                      opacity: isTop ? 1 : isMid ? 0.75 : 0.45,
                      zIndex: 3 - idx,
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-mousse font-bold mb-2">
                      <span>{card.badge}</span>
                      <span className="text-argile font-bold">{card.metric}</span>
                    </div>
                    <div className="font-display font-bold text-base text-charbon mb-1">
                      {card.title}
                    </div>
                    <p className="font-outfit text-xs text-charbon/70 line-clamp-2 leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono text-charbon/60">
                      <span>{card.sub}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-mousse/10 flex items-center justify-between text-xs font-mono text-mousse/80">
              <span>Statut : Boucle active</span>
              <span className="font-bold text-argile">Livraison Express</span>
            </div>
          </div>

          {/* CARTE 2 — "Machine à Écrire Télémétrie" */}
          <div className="feature-card bg-charbon text-white border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl shadow-black/20 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                  ARTEFACT // 02
                </span>
                {/* Live stream badge with pulsating dot */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Flux en Direct</span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-creme mb-2">
                Télémétrie 24h / 24
              </h3>
              <p className="font-outfit text-xs text-creme/60 mb-6">
                Surveillance ininterrompue jour et nuit. Capture caractère par caractère du journal des courses en cours.
              </p>
            </div>

            {/* Terminal Screen / Live Typewriter */}
            <div className="bg-charbon-deep border border-white/10 rounded-2xl p-5 my-4 min-h-[170px] flex flex-col justify-between font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-white/40">
                <span>CONSOLE-OPS // BZV-SUD-01</span>
                <span>BAUD 115200</span>
              </div>

              <div className="py-4 text-emerald-300 font-mono text-[13px] leading-relaxed">
                <span>{displayedText}</span>
                {/* Flashing accent cursor */}
                <span className="inline-block w-2 h-4 bg-argile ml-1 translate-y-0.5 animate-pulse" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-white/40">
                <span>Latence satellite : 12ms</span>
                <span className="text-argile font-semibold">24H CONTINU</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-creme/60">
              <span>Opérations de nuit incluses</span>
              <span className="text-emerald-400 font-bold">100% Connecté</span>
            </div>
          </div>

          {/* CARTE 3 — "Planificateur Protocole Curseur" */}
          <div className="feature-card bg-creme-surface border border-mousse/15 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl shadow-mousse/5 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-mousse/60">
                  ARTEFACT // 03
                </span>
                <div className="text-[11px] font-mono text-mousse bg-mousse/10 px-3 py-1 rounded-full font-semibold">
                  PROTOCOLE PRO
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-charbon mb-2">
                Planificateur Curseur
              </h3>
              <p className="font-outfit text-xs text-charbon/70 mb-6">
                Réservation et cadencement de vos tournées récurrentes avec un protocole de rigueur professionnelle.
              </p>
            </div>

            {/* Weekly Grid with Animated Simulated Cursor */}
            <div className="relative bg-creme border border-mousse/10 rounded-2xl p-5 my-4">
              <div className="text-[11px] font-mono font-bold text-mousse mb-3 flex items-center justify-between">
                <span>GRILLE HEBDOMADAIRE</span>
                <span className="text-argile font-semibold">{fullDays[activeDay]}</span>
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-2 mb-5">
                {days.map((day, idx) => {
                  const isSelected = activeDay === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDay(idx)}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all ${
                        isSelected 
                          ? 'bg-argile text-white shadow-md shadow-argile/30 scale-105' 
                          : 'bg-white hover:bg-creme-surface text-charbon/80 border border-mousse/10'
                      }`}
                    >
                      <span>{day}</span>
                      <span className="text-[8px] opacity-75">{idx + 10}</span>
                    </button>
                  );
                })}
              </div>

              {/* Simulated Save Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-charbon/50">
                  Créneau : {activeDay === 6 ? 'Week-end Urgence' : 'Plage 08h00 - 18h00'}
                </span>
                <button
                  onClick={() => openOrderModal(`Réservation ${fullDays[activeDay]}`)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                    cursorPhase === 'saved'
                      ? 'bg-emerald-600 text-white scale-95'
                      : 'bg-mousse text-white hover:bg-mousse-dark'
                  }`}
                >
                  {cursorPhase === 'saved' ? 'Validé ✓' : 'Sauvegarder'}
                </button>
              </div>

              {/* Simulated SVG Moving Cursor */}
              <div 
                className={`absolute pointer-events-none transition-all duration-500 ease-out z-20 ${
                  cursorPhase === 'clicking' ? 'scale-90' : 'scale-100'
                }`}
                style={{
                  top: cursorPhase === 'saved' ? '70%' : '35%',
                  left: cursorPhase === 'saved' ? '75%' : `${(activeDay * 13) + 10}%`,
                  opacity: cursorPhase === 'idle' ? 0 : 1,
                }}
              >
                <svg className="w-6 h-6 drop-shadow-md text-charbon fill-current" viewBox="0 0 24 24">
                  <path d="M4 0l16 12-7.5 1.5 4.5 9-3 1.5-4.5-9-5.5 5.5z" />
                </svg>
              </div>
            </div>

            <div className="pt-6 border-t border-mousse/10 flex items-center justify-between text-xs font-mono text-mousse/80">
              <span>Engagement : Zéro retard</span>
              <span className="font-bold text-argile">Service Professionnel</span>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          D. PHILOSOPHIE — "Le Manifeste"
          ==================================================================== */}
      <section 
        id="manifeste"
        ref={manifestoRef}
        className="relative w-full py-32 md:py-44 px-6 md:px-20 bg-charbon text-creme overflow-hidden"
      >
        {/* Parallax organic texture background image with low opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charbon via-transparent to-charbon" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Label */}
          <div className="manifesto-text-reveal inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-argile mb-8">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>MANIFESTE LOGISTIQUE // 02</span>
          </div>

          {/* Statement 1: Neutral, smaller */}
          <p className="manifesto-text-reveal font-display font-medium text-lg sm:text-2xl md:text-3xl text-creme/50 mb-8 max-w-3xl leading-relaxed">
            La plupart des services de livraison se concentrent sur : l’attente passive, 
            l’opacité des trajets et l’incertitude urbaine permanente.
          </p>

          {/* Statement 2: Massive dramatic italic serif with accent keyword */}
          <h2 className="manifesto-text-reveal font-serif italic text-4xl sm:text-6xl md:text-8xl text-creme leading-[1.05] tracking-tight">
            Nous nous concentrons sur : la{' '}
            <span className="text-argile underline decoration-argile/40 underline-offset-8">
              fluidité chirurgicale
            </span>{' '}
            et la{' '}
            <span className="text-argile underline decoration-argile/40 underline-offset-8">
              célérité absolue
            </span>{' '}
            à Brazzaville.
          </h2>

          <div className="manifesto-text-reveal mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-creme/60">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-argile" />
              <span>Chaque kilomètre est pré-calculé et sous contrôle.</span>
            </div>
            <span>CONGO LOGISTICS PROTOCOL // STANDARD CERTIFIÉ</span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          E. PROTOCOLE — "Archive Empilée Sticky"
          ==================================================================== */}
      <section 
        id="protocole" 
        ref={protocolContainerRef}
        className="relative py-24 bg-creme"
      >
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-mousse font-bold mb-2">
            METHODOLOGIE ÉTAPE PAR ÉTAPE
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-charbon">
            L'Archive Empilée Sticky
          </h2>
          <p className="font-outfit text-charbon/70 mt-2 text-sm md:text-base">
            Trois étapes souveraines qui s'empilent naturellement au fur et à mesure du scroll.
          </p>
        </div>

        {/* 3 Fullscreen Sticky Stacked Cards */}
        <div className="max-w-5xl mx-auto px-6 space-y-12 pb-24">
          
          {/* CARTE 1: Motif géométrique en rotation lente */}
          <div className="protocol-sticky-card min-h-[500px] w-full bg-creme-surface border border-mousse/20 rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm tracking-widest text-argile font-bold uppercase block mb-3">
                PROTOCOLE // 01
              </span>
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-charbon mb-4">
                Capture & Indexation Immédiate
              </h3>
              <p className="font-outfit text-charbon/75 leading-relaxed text-base mb-6">
                Saisie instantanée de votre commande en 1 tap. Attribution instantanée par notre algorithme 
                au coursier d'élite le plus proche de votre adresse à Brazzaville.
              </p>
              <div className="font-mono text-xs text-mousse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-mousse" />
                <span>Délai moyen d'assignation : 45 secondes</span>
              </div>
            </div>

            {/* Unique SVG Animation 1: Motif géométrique en rotation lente */}
            <div className="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center relative">
              <svg 
                className="w-full h-full animate-rotate-slow text-mousse" 
                viewBox="0 0 200 200" 
                fill="none" 
                stroke="currentColor"
              >
                <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="6 6" />
                <circle cx="100" cy="100" r="70" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="50" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="30" strokeWidth="2" stroke="var(--color-argile)" />
                <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.8" strokeOpacity="0.4" />
                <polygon points="100,20 170,140 30,140" strokeWidth="1" strokeOpacity="0.6" />
                <polygon points="100,180 30,60 170,60" strokeWidth="1" strokeOpacity="0.6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-argile/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-argile" />
                </div>
              </div>
            </div>
          </div>

          {/* CARTE 2: Ligne laser de balayage sur grille de points */}
          <div className="protocol-sticky-card min-h-[500px] w-full bg-mousse text-white border border-mousse-dark rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm tracking-widest text-argile-light font-bold uppercase block mb-3">
                PROTOCOLE // 02
              </span>
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-creme mb-4">
                Acheminement Balisé & Trajectoire Directe
              </h3>
              <p className="font-outfit text-creme/80 leading-relaxed text-base mb-6">
                Navigation continue sans escale ni groupage parasite. Vos plis sensibles transitent dans un compartiment scellé sous surveillance géolocalisée.
              </p>
              <div className="font-mono text-xs text-creme/70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Régulation de vitesse & respect strict des délais</span>
              </div>
            </div>

            {/* Unique SVG Animation 2: Laser horizontal de balayage sur matrice de points */}
            <div className="w-56 h-56 md:w-72 md:h-72 bg-mousse-dark/60 rounded-3xl p-6 relative overflow-hidden border border-white/10 flex flex-col justify-between">
              {/* Dot Grid */}
              <div className="grid grid-cols-6 gap-4 h-full w-full opacity-60">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-creme/50" />
                  </div>
                ))}
              </div>
              
              {/* Horizontal sweeping laser line */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-argile to-transparent shadow-[0_0_15px_#CC5833] animate-sweep-laser" />

              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-creme/60">
                SCAN MATRICE // BZV-GPS
              </div>
            </div>
          </div>

          {/* CARTE 3: Forme d'onde pulsante ECG */}
          <div className="protocol-sticky-card min-h-[500px] w-full bg-charbon text-white border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm tracking-widest text-argile font-bold uppercase block mb-3">
                PROTOCOLE // 03
              </span>
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-creme mb-4">
                Remise Certifiée & Clôture Sécurisée
              </h3>
              <p className="font-outfit text-creme/80 leading-relaxed text-base mb-6">
                Validation physique et numérique avec confirmation SMS/WhatsApp en temps réel. Rapport de mission horodaté délivré à la seconde exacte.
              </p>
              <div className="font-mono text-xs text-argile flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-argile" />
                <span>Certification conforme 100% sans litige</span>
              </div>
            </div>

            {/* Unique SVG Animation 3: Pulsing ECG waveform path */}
            <div className="w-56 h-56 md:w-72 md:h-72 bg-charbon-deep rounded-3xl p-6 relative border border-white/10 flex items-center justify-center">
              <svg className="w-full h-32" viewBox="0 0 300 120" fill="none">
                {/* Background grid */}
                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                {/* Waveform path */}
                <path
                  d="M0 60 L60 60 L80 60 L95 20 L110 100 L125 40 L135 75 L145 60 L200 60 L215 30 L230 90 L245 60 L300 60"
                  stroke="#CC5833"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_#CC5833]"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: 0,
                    animation: 'pulseGlow 2.5s infinite ease-in-out',
                  }}
                />
              </svg>
              <div className="absolute top-4 left-5 font-mono text-[10px] text-white/40">
                PULSE DE CONFIRMATION
              </div>
              <div className="absolute bottom-4 right-5 font-mono text-[10px] text-emerald-400">
                LIVRAISON ACCOMPLIE
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          F. ADHÉSION / TARIFICATION
          ==================================================================== */}
      <section id="tarifs" className="py-28 md:py-36 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mousse font-bold mb-3">
            <span>BARÈME TRANSPARENT // FORMULES SUR-MESURE</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-charbon mb-4">
            Choisissez votre vitesse d’exécution.
          </h2>
          <p className="font-outfit text-charbon/70 text-base">
            Aucun coût caché. Tous nos tarifs incluent l’assurance traçabilité et le suivi par coursier dédié à Brazzaville.
          </p>
        </div>

        {/* 3 Tier Grid - Center Card Pops with Primary Background #2E4036 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1: Standard / Course Urbaine */}
          <div className="pricing-card bg-creme-surface border border-mousse/15 rounded-[2.5rem] p-9 flex flex-col justify-between shadow-lg">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-mousse/60 mb-2">
                NIVEAU 01 // ESSENTIEL
              </div>
              <h3 className="font-display font-bold text-2xl text-charbon mb-3">
                Course Urbaine
              </h3>
              <p className="font-outfit text-xs text-charbon/70 mb-6">
                Idéal pour les plis, documents légaux, clés et petits colis quotidiens.
              </p>
              <div className="mb-8">
                <span className="font-display font-extrabold text-4xl text-charbon">2 500</span>
                <span className="font-mono text-xs text-charbon/60 ml-2">FCFA / course</span>
              </div>

              <ul className="space-y-3 font-outfit text-xs text-charbon/80 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Délai estimé : 60 à 90 minutes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Suivi de progression par SMS</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Couverture tous arrondissements</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Remise contre signature</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openOrderModal('Course Urbaine')}
              className="btn-magnetic w-full bg-mousse/10 hover:bg-mousse hover:text-white text-mousse py-3.5 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span className="btn-content">
                <span>Commander cette formule</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* TIER 2: Center Card Stands Out: Colored #2E4036, Accent Button #CC5833 */}
          <div className="pricing-card bg-mousse text-white border-2 border-argile rounded-[2.5rem] p-9 flex flex-col justify-between shadow-2xl relative lg:-translate-y-4 scale-100 lg:scale-105 z-10">
            {/* Recommended Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-argile text-white font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-md">
              ★ RECOMMANDÉ & PRIORITAIRE
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-argile-light mb-2">
                NIVEAU 02 // PERFORMANCE
              </div>
              <h3 className="font-display font-extrabold text-2xl text-creme mb-3">
                Express Prioritaire
              </h3>
              <p className="font-outfit text-xs text-creme/75 mb-6">
                Départ immédiat. Coursier dédié affecté exclusivement à votre trajet.
              </p>
              <div className="mb-8">
                <span className="font-display font-extrabold text-4xl text-creme">5 000</span>
                <span className="font-mono text-xs text-creme/60 ml-2">FCFA / course</span>
              </div>

              <ul className="space-y-3 font-outfit text-xs text-creme/90 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-argile" />
                  <span className="font-bold">Livraison garantie &lt; 40 minutes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-argile" />
                  <span>Coursier dédié sans détour ni groupage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-argile" />
                  <span>Suivi GPS en temps réel partagé</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-argile" />
                  <span>Scellé numérique inviolable OTP</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-argile" />
                  <span>Support prioritaire ligne directe</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openOrderModal('Express Prioritaire')}
              className="btn-magnetic w-full bg-argile text-white py-4 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-argile/40"
            >
              <span className="btn-slide-bg bg-charbon" />
              <span className="btn-content">
                <span>Commander maintenant</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* TIER 3: Enterprise / Flotte Pro */}
          <div className="pricing-card bg-creme-surface border border-mousse/15 rounded-[2.5rem] p-9 flex flex-col justify-between shadow-lg">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-mousse/60 mb-2">
                NIVEAU 03 // INSTITUTIONNEL
              </div>
              <h3 className="font-display font-bold text-2xl text-charbon mb-3">
                Flotte Entreprise
              </h3>
              <p className="font-outfit text-xs text-charbon/70 mb-6">
                Pour e-commerces, cabinets, pharmacies et institutions avec flux régulier.
              </p>
              <div className="mb-8">
                <span className="font-display font-extrabold text-4xl text-charbon">Sur-mesure</span>
                <span className="font-mono text-xs text-charbon/60 ml-2">Abonnement / Volume</span>
              </div>

              <ul className="space-y-3 font-outfit text-xs text-charbon/80 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Coursiers réservés à vos heures de pointe</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Facturation mensuelle consolidée</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Tableau de bord et API d'intégration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-mousse" />
                  <span>Gestionnaire de compte dédié</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openOrderModal('Contrat Flotte Entreprise')}
              className="btn-magnetic w-full bg-mousse/10 hover:bg-mousse hover:text-white text-mousse py-3.5 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span className="btn-content">
                <span>Contacter l'équipe Pro</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          G. PIED DE PAGE — "La Clôture Clinique"
          ==================================================================== */}
      <footer className="bg-charbon text-creme rounded-t-[4rem] pt-20 pb-12 px-6 md:px-16 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
            {/* Col 1-2: Brand & Mission */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 font-bold text-2xl tracking-tight text-white mb-4">
                <span className="w-3 h-3 rounded-full bg-argile" />
                <span>ZUA EXPRESS</span>
              </div>
              <p className="font-outfit text-sm text-creme/70 max-w-sm mb-6 leading-relaxed">
                L’instrument technologique de vélocité urbaine à Brazzaville. 
                Acheminement rapide, géo-sécurisé et confidentiel.
              </p>
              
              {/* Operational Indicator with Pulsing Green Dot */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-semibold">SYSTÈME OPÉRATIONNEL</span>
                <span className="text-white/40">|</span>
                <span className="text-white/60">DISPATCH 24/7 BZV</span>
              </div>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-creme/40 mb-4">
                NAVIGATION
              </div>
              <ul className="space-y-3 font-outfit text-sm text-creme/80">
                <li><a href="#artefacts" className="interactive-lift hover:text-argile">Artefacts</a></li>
                <li><a href="#manifeste" className="interactive-lift hover:text-argile">Manifeste</a></li>
                <li><a href="#protocole" className="interactive-lift hover:text-argile">Protocole</a></li>
                <li><a href="#tarifs" className="interactive-lift hover:text-argile">Grille Tarifaire</a></li>
              </ul>
            </div>

            {/* Col 4: Quartiers Servis */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-creme/40 mb-4">
                ZONES COUVERTES
              </div>
              <ul className="space-y-2 font-mono text-xs text-creme/60">
                <li>Centre-ville (Plateau)</li>
                <li>Bacongo & Makélékélé</li>
                <li>Poto-Poto & Moungali</li>
                <li>Ouenzé & Talangaï</li>
                <li>Mfilou & Djiri</li>
              </ul>
            </div>

            {/* Col 5: Contact & Urgences */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-creme/40 mb-4">
                CONTACT DIRECT
              </div>
              <ul className="space-y-3 font-outfit text-sm text-creme/80">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-argile" />
                  <span>+242 06 500 00 00</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-argile" />
                  <span>Brazzaville, République du Congo</span>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => openOrderModal('Urgence WhatsApp')}
                    className="text-xs font-mono text-argile hover:underline flex items-center gap-1.5"
                  >
                    <span>Ligne WhatsApp Directe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-creme/40">
            <div>
              © {new Date().getFullYear()} ZUA Express. Tous droits réservés. Construit selon le design system Tech Organique.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-creme">Conditions d'acheminement</a>
              <a href="#" className="hover:text-creme">Protocole de confidentialité</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          MODALE INTERACTIVE : COMMANDE EXPRESS VIA WHATSAPP
          ==================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charbon/80 backdrop-blur-md">
          <div className="bg-creme-surface border border-mousse/20 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-charbon/10 hover:bg-charbon/20 flex items-center justify-center text-charbon transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-argile font-bold block mb-1">
                DISPATCH IMMÉDIAT BRAZZAVILLE
              </span>
              <h3 className="font-display font-bold text-2xl text-charbon">
                Finaliser votre course
              </h3>
              <p className="font-outfit text-xs text-charbon/70 mt-1">
                Formule sélectionnée : <span className="font-bold text-mousse">{selectedPlan}</span>
              </p>
            </div>

            <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-charbon mb-1">
                  Nom ou Raison Sociale
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jean Malonga ou Société ABC"
                  value={orderForm.nom}
                  onChange={(e) => setOrderForm({ ...orderForm, nom: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-mousse/20 bg-white text-sm focus:outline-none focus:border-argile font-outfit"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-charbon mb-1">
                  Téléphone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+242 06 ... .."
                  value={orderForm.telephone}
                  onChange={(e) => setOrderForm({ ...orderForm, telephone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-mousse/20 bg-white text-sm focus:outline-none focus:border-argile font-outfit"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-charbon mb-1">
                    Quartier Départ
                  </label>
                  <select
                    value={orderForm.quartierDepart}
                    onChange={(e) => setOrderForm({ ...orderForm, quartierDepart: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-mousse/20 bg-white text-xs focus:outline-none focus:border-argile font-outfit"
                  >
                    <option value="Centre-ville (Plateau)">Centre-ville (Plateau)</option>
                    <option value="Bacongo">Bacongo</option>
                    <option value="Makélékélé">Makélékélé</option>
                    <option value="Poto-Poto">Poto-Poto</option>
                    <option value="Moungali">Moungali</option>
                    <option value="Ouenzé">Ouenzé</option>
                    <option value="Talangaï">Talangaï</option>
                    <option value="Maya-Maya (Aéroport)">Maya-Maya</option>
                    <option value="Djiri">Djiri</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-charbon mb-1">
                    Quartier Destination
                  </label>
                  <select
                    value={orderForm.quartierArrivee}
                    onChange={(e) => setOrderForm({ ...orderForm, quartierArrivee: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-mousse/20 bg-white text-xs focus:outline-none focus:border-argile font-outfit"
                  >
                    <option value="Bacongo">Bacongo</option>
                    <option value="Centre-ville (Plateau)">Centre-ville (Plateau)</option>
                    <option value="Poto-Poto">Poto-Poto</option>
                    <option value="Moungali">Moungali</option>
                    <option value="Ouenzé">Ouenzé</option>
                    <option value="Talangaï">Talangaï</option>
                    <option value="Makélékélé">Makélékélé</option>
                    <option value="Maya-Maya (Aéroport)">Maya-Maya</option>
                    <option value="Djiri">Djiri</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-charbon mb-1">
                  Nature du Colis & Remarques (Optionnel)
                </label>
                <textarea
                  rows="2"
                  placeholder="Ex: Enveloppe confidentielle, documents urgents..."
                  value={orderForm.details}
                  onChange={(e) => setOrderForm({ ...orderForm, details: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-mousse/20 bg-white text-xs focus:outline-none focus:border-argile font-outfit"
                />
              </div>

              <button
                type="submit"
                className="btn-magnetic w-full bg-argile text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-argile/30 mt-2"
              >
                <span className="btn-slide-bg bg-mousse" />
                <span className="btn-content">
                  <span>Envoyer la commande au Dispatch (WhatsApp)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
