'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// --- ANIMATION VARIANTS (below-the-fold) ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
};

// --- DATA ---
const divisions = [
  {
    title: 'Get into Zone', desc: 'Pumping inspirational workout tracks for entreprenuers, workout enthusiasts, anime fans.',
    icon: 'https://yt3.googleusercontent.com/NxHb-ikC55U3vNORUECyC2XIao4sWiaqcqtW9EZlw1dFxHDQw4tcQt1Uob5rP5FvCtx9CNef4-I=s160-c-k-c0x00ffffff-no-rj',
    yt_link: 'https://www.youtube.com/@get-into-zone',
    ytm_link: 'https://music.youtube.com/channel/UCJBQYPkuJFWu7lFcGJdREGg',
    spotify_link: 'https://open.spotify.com/artist/0rCArjBKGMTpx9l72NViY9',
    apple_link: 'https://music.apple.com/us/artist/get-into-zone/1843125227'
  }, {
    title: 'Anime Music Zone', desc: 'Sub Branch of Get into Zone, featuring lyric videos & AMVs of aniem based tracks',
    icon: 'https://yt3.googleusercontent.com/4FlrWvQbSdOqYLDcylosENvp_UFRopSw2nKxF45Y_7KwoSHkTdNAs4DlfeiobmA7AfcrAg0TNg=s160-c-k-c0x00ffffff-no-rj',
    yt_link: 'https://www.youtube.com/@anime-music-zone',
  },
  {
    title: 'Super Mel', desc: 'Epic Grand Female Choir songs for peace times.',
    icon: 'https://yt3.googleusercontent.com/Qv6vV9bueYmU5fFUS3AyR450Jr_u6Kynr8u_rkITnvCCPxWfNuaPsMpOJWRXzFccJn5JV34OCWY=s160-c-k-c0x00ffffff-no-rj',
    yt_link: 'https://www.youtube.com/@SuperMel-Music',
    spotify_link: 'https://open.spotify.com/artist/5ixBfGL5RaXY5v31BYCmDZ',
  },
  {
    title: 'Blade & Choir', desc: 'a sonic exploration into the intersection of sacred tradition and modern aggression ( EPic CInematic Chorals with Aggressive Trap & phonk beats).',
    icon: 'https://yt3.googleusercontent.com/0EywQYhnOE65s5k_fjuhaQHMNCcj4TkCqFdZiRxA5fBgtx6Q80cPOnjaMRRO2NlZiFc4rwsvcQ=s160-c-k-c0x00ffffff-no-rj',
    yt_link: 'https://www.youtube.com/@blade_and_choir',
    spotify_link: 'https://open.spotify.com/artist/2d19FtnIwxwqXCxxkRbrDHZ',
    apple_link: 'https://music.apple.com/us/artist/supermel/1862075951'
  },
  {
    title: 'Rakahbus', desc: 'Electronic Funk Rock & Heavy Bass Covers of Anime & Popular tracks.',
    icon: 'https://yt3.googleusercontent.com/vpzjfqaVuTZBIiIs1GfqkRR6DhUu2Zp5h_5B4wtuNlUWvMb_p2jRf0kCrJzoqGsuVORgATrd=s160-c-k-c0x00ffffff-no-rj',
    yt_link: 'https://www.youtube.com/channel/UC3H8uaZ3Ww0JPo0PxI2_hDw',
    spotify_link: 'https://open.spotify.com/artist/2XztDeHIfxBOteN6SpM9Cs',
    apple_link: 'https://music.apple.com/us/artist/rakahbus/1862075951'
  },
  // { title: 'Matreya', desc: 'End‑to‑end music production, mixing and mastering for original works.', icon: '💿' },
];

const LINK_ICONS: Record<string, { src: string; label: string }> = {
  yt_link: { src: '/icons/yt_full.png', label: 'YouTube' },
  ytm_link: { src: '/icons/yt_music.png', label: 'YouTube Music' },
  spotify_link: { src: '/icons/spotify_icon.png', label: 'Spotify' },
  apple_link: { src: '/icons/apple_music.png', label: 'Apple Music' },
  tidal_link: { src: '/icons/tidal.webp', label: 'Tidal' },
};

const personas = [
  { name: 'Think like a King', tags: 'Lyrical | Inspiring | Motivational', img: '/images/king.png' },
  { name: 'Saiyan\'s Warm-up', tags: 'Energetic | Fitness & Workout', img: '/images/brolly.png' },
  { name: 'Ascend', tags: 'Inspiring | Anime Based', img: '/images/ascend.png' },
];

// --- GPU-OPTIMIZED WAVEFORM ---
const AudioVisualizer = () => {
  const bars = useMemo(
    () =>
      [...Array(80)].map(() => ({
        duration: Math.random() * 2 + 3, // Slower, smoother duration (3 to 5 seconds)
        delay: Math.random() * -5,       // Negative delay starts animation immediately at different points
      })),
    []
  );

  return (
    <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-between px-2 gap-1 opacity-20 z-0 overflow-hidden pointer-events-none mix-blend-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
      {bars.map((bar, i) => (
        <div
          key={i}
          className="waveform-bar flex-1 max-w-[8px] bg-[#e50914] rounded-t-sm"
          style={{
            animationDuration: `${bar.duration}s`,
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const GetIntoZoneHomePage: NextPage = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>

      <div className="min-h-screen bg-[#050505] text-[#d1d1d1] font-sans overflow-x-hidden selection:bg-[#e50914] selection:text-white">

        {/* --- HEADER --- */}
        <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]">
          <nav className="header-inner container mx-auto px-6 py-5 flex justify-between items-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToSection('divisions'); }}
              className="text-2xl font-black tracking-widest text-white hover:text-[#e50914] transition-colors duration-300"
            >
              Get<span className="text-[#e50914]">.</span>into<span className="text-[#e50914]">.</span>Zone
            </a>
            <div className="hidden md:flex gap-10 items-center text-sm font-semibold uppercase tracking-wider text-gray-400">
              {[
                { label: 'Artists', id: 'divisions' },
                { label: 'Workflow', id: 'workflow' },
                { label: 'Hit Tracks', id: 'profiles' },
                { label: 'About Us', id: 'about' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className="relative group hover:text-white transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-[#e50914] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
                </a>
              ))}
            </div>
          </nav>
        </header>

        {/* --- HERO --- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[#1a1a1a]">
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <Image
                src="/images/portrait_scholar.png"
                alt="GetInto.Zone Studio"
                fill
                priority
                className="object-cover brightness-[0.80]"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
          </div>

          <AudioVisualizer />

          <div className="container mx-auto px-6 z-10 text-center relative mt-16">
            <div className="hero-content-inner pointer-events-none">
              <p className="block text-xs md:text-sm font-bold text-[#e50914] uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]">
                Zone Music Collective
              </p>
              <h1 className="text-4xl md:text-7xl lg:text-7xl font-black tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase mb-6 leading-[1.1] [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
                {['Making', 'Music', 'That', 'Hits', 'Your', 'Soul'].map((word, i) => (
                  <span key={i} className="hero-title-word inline-block mr-3 md:mr-4 text-white drop-shadow-lg">
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 font-medium">
                We are a music team producing inspirational workout tracks for entreprenuers, workout enthusiasts, anime fans.
              </p>
            </div>

            <div className="hero-content-inner pointer-events-auto" style={{ animationDelay: '1.2s' }}>
              <a
                href="#divisions"
                onClick={(e) => { e.preventDefault(); scrollToSection('divisions'); }}
                className="inline-block px-12 py-4 bg-[#e50914] text-white rounded font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(229,9,20,0.4)] transition-all duration-300"
              >
                Enter the zone
              </a>
            </div>
          </div>
        </section>

        {/* --- DIVISIONS --- */}
        <section id="divisions" className="py-32 bg-[#050505] relative z-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-4" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} viewport={{ once: true }}>Artists & Divisions</motion.h2>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" whileInView="animate" initial="initial" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
              {divisions.map((division) => (
                <motion.div
                  key={division.title}
                  className="cursor-pointer bg-[#0a0a0a] p-10 rounded-xl border border-[#1a1a1a] text-center transition-all duration-300 relative group overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -10, borderColor: "#e50914" }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#e50914] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                  <motion.div
                    className="absolute inset-0 bg-[#e50914]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  />
                  <div className="mb-6 relative z-10 flex justify-center">
                    <img
                      src={division.icon}
                      alt={division.title}
                      className="rounded-full w-20 h-20 object-cover ring-2 ring-[#1a1a1a] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider relative z-10 mb-4">{division.title}</h3>
                  <p className="text-sm text-gray-400 relative z-10 leading-relaxed mb-4">{division.desc}</p>
                  <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
                    {(Object.keys(LINK_ICONS) as (keyof typeof LINK_ICONS)[]).map((key) => {
                      const href = division[key as keyof typeof division];
                      if (typeof href !== 'string') return null;
                      const { src, label } = LINK_ICONS[key];
                      return (
                        <Tooltip key={key}>
                          <TooltipTrigger asChild>
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex rounded-full p-1.5 transition-all duration-200 hover:bg-[#1a1a1a] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img src={src} alt={label} className="w-7 h-7 object-contain rounded-full" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-zinc-900 text-gray-100 border border-zinc-700 shadow-xl">
                            {label}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- WORKFLOW --- */}
        {/* <section id="workflow" className="py-24 md:py-32 bg-[#080808] border-y border-[#1a1a1a]">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="space-y-6 lg:sticky lg:top-32">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
                How The<br /><span className="text-[#e50914] hover:text-white transition-colors duration-300 cursor-default inline-block">Studio Works</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-300 text-base leading-relaxed">
                GETINTO.ZONE is built like a focused lab: one artist, one room, and a pipeline tuned for a modern music production studio. The same environment that writes and mixes the music also powers the AI tools and templates that help generate it.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-500 text-sm leading-relaxed border-l-2 border-[#1a1a1a] hover:border-[#e50914]/60 pl-4 transition-colors duration-300">
                Instead of separating tools from creativity, the studio builds small systems and production utilities around real projects. Those systems are then reused, refined and extended.
              </motion.p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} className="space-y-4">
              {['Brief & Mood', 'Sound Palette', 'Composition', 'Mix & Master'].map((step, index) => (
                <motion.div
                  key={step}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="flex gap-6 items-start bg-[#050505] p-6 rounded-xl border border-[#1a1a1a] hover:border-[#e50914]/50 transition-colors duration-300 group cursor-default"
                >
                  <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-[#111] border border-[#222] text-sm font-bold text-white group-hover:border-[#e50914] group-hover:text-[#e50914] group-hover:bg-[#e50914]/10 transition-all duration-300">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white uppercase tracking-wide mb-2 group-hover:text-[#e50914] transition-colors duration-300">
                      {step}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {index === 0 && 'Clarify the visual, narrative or product mood and define the emotional arc before any AI generation begins.'}
                      {index === 1 && 'Select instruments, synths and textures that support that arc without distraction.'}
                      {index === 2 && 'Write and iterate on motifs, harmony and rhythm until the piece feels inevitable.'}
                      {index === 3 && 'Balance, process and master for clarity across streaming, cinema and devices.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section> */}

        {/* --- PROFILES --- */}
        <section id="profiles" className="py-32 bg-[#080808]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-4" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} viewport={{ once: true }}>Top Hit Tracks</motion.h2>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10" whileInView="animate" initial="initial" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
              {personas.map((persona) => (
                <motion.div
                  key={persona.name}
                  className="bg-[#111] rounded-lg overflow-hidden border border-[#1a1a1a] relative group"
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(229,9,20,0.2)" }}
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image src={persona.img} alt={persona.name} fill className="object-cover brightness-75 transition-all duration-700 group-hover:scale-110 group-hover:brightness-100" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-lg">{persona.name}</h4>
                    <p className="text-xs text-[#e50914] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md inline-block px-3 py-1 rounded">{persona.tags}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- ABOUT --- */}
        <section id="about" className="py-24 md:py-32 bg-[#080808] border-t border-[#1a1a1a]">
          <div className="container mx-auto px-6">

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

              <motion.div
                className="relative rounded-xl border-2 border-[#1a1a1a] overflow-hidden bg-[#050505] group aspect-square md:aspect-auto md:h-full min-h-[400px]"
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -40 }}
                whileHover={{ transition: { duration: 0.3 } }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e50914]/40 rounded-xl z-10 pointer-events-none transition-colors duration-500" />
                <Image
                  src="/images/profile.heic"
                  alt="GETINTO.ZONE studio — Subhakar Tikkireddy"
                  fill
                  className="object-cover object-center grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                  <p className="text-xs uppercase tracking-widest text-[#e50914] font-bold mb-2 drop-shadow-md">Lyricist, Composer & Music Producer</p>
                  <p className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter drop-shadow-lg group-hover:text-[#e50914] transition-colors duration-300">
                    Subhakar Tikkireddy
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col justify-center space-y-8"
                whileInView="animate"
                initial="initial"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <div>
                  <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-4">
                    About Us
                  </motion.h2>
                  <motion.div variants={fadeInUp} className="w-12 h-1 bg-[#e50914]" />
                </div>

                <motion.p className="text-gray-300 leading-relaxed text-lg" variants={fadeInUp}>
                  'Zone Music' is a professional music production studio where original music is created in-house. 'Get into Zone', 'Rakahbus', 'Super Mel', 'Blade & Choir', 'Matreya' are the key artist stage names we use to release & distribute our tracks & scores.
                </motion.p>

                <motion.p className="text-gray-400 leading-relaxed text-base" variants={fadeInUp}>
                  Spearheaded by{' '}<span className="inline-block font-semibold text-white border-b-2 border-transparent hover:border-[#e50914] hover:text-[#e50914] transition-colors duration-300 cursor-default">
                    Subhakar Tikkireddy
                  </span>, our tracks are written, composed, and primarily directed by him, with a little bit help of our other team memebers. The entire studio operation is run and maintained by him.
                  All music, sound design, and adaptive audio under the above artist names is created and released exclusively by him.
                </motion.p>

                <motion.div variants={fadeInUp} className="pt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a href="mailto:contact@getinto.zone" className="inline-block px-8 py-3 border border-[#333] text-white rounded font-bold uppercase tracking-widest text-xs hover:border-[#e50914] hover:bg-[#e50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all duration-300">
                    Contact Studio
                  </a>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-[#1a1a1a] bg-[#020202] py-8 text-xs text-gray-500">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="tracking-widest uppercase font-bold text-gray-400">
              © {new Date().getFullYear()} Zone Music
            </p>
            <p className="text-[11px] text-gray-600 text-center md:text-right max-w-md">
              Music Studio of Subhakar Tikkireddy. All original compositions and sound design generated and produced within this studio.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
};

export default GetIntoZoneHomePage;