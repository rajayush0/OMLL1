import { useState, useEffect } from 'react';

// --- Background Particles ---
const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 20,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      op: 0.2 + Math.random() * 0.4,
      symbol: ['❤️', '💕', '✨', '🌸', '🌹'][Math.floor(Math.random() * 5)]
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="bg-particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.left}%`,
          fontSize: `${p.size}px`,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          '--op': p.op
        }}>
          {p.symbol}
        </div>
      ))}
    </div>
  );
};

// --- Typewriter Hook ---
const useTypewriter = (text, speed = 100, delay = 0) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let timeoutId;
    const start = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, speed);
      timeoutId = interval;
    }, delay);
    
    return () => {
      clearTimeout(start);
      clearInterval(timeoutId);
    };
  }, [text, speed, delay]);
  
  return displayed;
};

// --- App Component ---
function App() {
  const totalSlides = 6;

  const nextSlide = () => setSlide(s => Math.min(totalSlides - 1, s + 1));
  const prevSlide = () => setSlide(s => Math.max(0, s - 1));

  // Render different slides based on state
  const renderSlide = () => {
    switch (slide) {
      case 0:
        return <Landing onNext={nextSlide} />;
      case 1:
        return <Sorry />;
      case 2:
        return <Memories />;
      case 3:
        return <Vibes />;
      case 4:
        return <Special />;
      case 5:
        return <Promise />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Particles />
      
      {/* Current Slide Content */}
      <div className="slide-content" key={slide}>
        {renderSlide()}
      </div>

      {/* Navigation Bar (hidden on slide 0) */}
      {slide > 0 && (
        <div className="nav-bar">
          <button className="btn" onClick={prevSlide} disabled={slide === 1}>
            ← Back
          </button>
          
          <div className="dots">
            {Array.from({ length: totalSlides - 1 }).map((_, i) => (
              <div key={i} className={`dot ${i + 1 === slide ? 'active' : ''}`} />
            ))}
          </div>

          <button className="btn" onClick={nextSlide} disabled={slide === totalSlides - 1}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// --- Slide Components ---

import heroImg from './assets/hero.png';

function Landing({ onNext }) {
  const text = useTypewriter("Hey Priiti (my Sonpapdi)...", 80, 500);
  
  return (
    <>
      <div className="landing-rose">🌹</div>
      <h1 className="title" style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
        {text}<span className="cursor">|</span>
      </h1>
      <img src={heroImg} alt="Our photo" style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '50%', margin: '1rem 0', opacity: text.length > 5 ? 1 : 0, transition: 'opacity 1s', border: '3px solid var(--rose-400)', boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)' }} />
      <p className="subtitle" style={{ opacity: text.length > 5 ? 1 : 0, transition: 'opacity 1s' }}>
        I made something for you 💝
      </p>
      {text.length === "Hey Priiti (my Sonpapdi)...".length && (
        <button className="btn btn-primary" onClick={onNext} style={{ marginTop: '1rem', fontSize: '1.2rem', padding: '1rem 2rem' }}>
          Come Inside ✨
        </button>
      )}
    </>
  );
}

function Sorry() {
  return (
    <>
      <h1 className="title gradient-text">I'm Sorry 🥺</h1>
      
      <div className="polaroid" style={{ margin: '1rem auto', transform: 'rotate(-2deg)' }}>
        <video src="/assets/vid3.mp4" autoPlay muted loop playsInline />
        <div className="polaroid-caption">Please forgive me?</div>
      </div>

      <div className="glass-card" style={{ marginTop: '1rem', textAlign: 'left', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1rem' }}>
          I know I messed up. I'm not perfect, and sometimes I do stupid things that hurt you.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          But every time I see you upset because of me, it breaks my heart. You're the last person I'd ever want to hurt.
        </p>
        <p style={{ color: 'var(--rose-400)', fontStyle: 'italic' }}>
          Will you forgive this idiot who can't even say "groceries" properly? 😅
        </p>
      </div>
    </>
  );
}

function Memories() {
  const memories = [
    { emoji: '🍽️', title: 'Vatika Restaurant', desc: 'Our first meet, our first everything. The butterflies were real.', media: 'img1.jpeg' },
    { emoji: '🌊', title: 'Marine Drive, Patna', desc: 'You fell asleep on my shoulder... the most peaceful moment of my life.', media: 'img2.jpeg' },
    { emoji: '💫', title: 'Special Moments', desc: 'Anshu ka ghar and Prosopyare... our little secrets locked in my heart.', media: 'vid1.mp4' },
    { emoji: '🌹', title: 'The Rose Ritual', desc: 'I always bring you roses (mostly). You are more beautiful than any of them.', media: 'img3.jpeg' }
  ];

  return (
    <>
      <h1 className="title"><span className="gradient-text">Our Memories</span> 📖</h1>
      <p className="subtitle">Written in my heart forever</p>
      <div className="grid-container">
        {memories.map((m, i) => (
          <div key={i} className="glass-card" style={{ textAlign: 'left' }}>
            <div className="memory-card-header">
              {m.media.endsWith('.mp4') 
                ? <video src={`/assets/${m.media}`} className="memory-media" autoPlay muted loop playsInline />
                : <img src={`/assets/${m.media}`} alt="" className="memory-media" />
              }
              <div>
                <div className="memory-emoji" style={{ fontSize: '1.5rem', marginBottom: 0 }}>{m.emoji}</div>
                <h3 className="memory-title" style={{ margin: 0 }}>{m.title}</h3>
              </div>
            </div>
            <p className="memory-desc">{m.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}



function Vibes() {
  const vibes = [
    { wrong: 'Bhadwa', right: 'Bharwa', desc: 'Karele ka Bharwa 🍆' },
    { wrong: 'Grogurs', right: 'Groceries', desc: 'My brain just stops working 🛒' },
    { wrong: 'Khos ke', right: 'Tuck in', desc: 'Bhojpuri vibes only! 👔' },
    { wrong: 'My "Stunning"', right: 'stunning ✨', desc: 'I mess up the word but you ARE stunning.' },
    { wrong: 'Your "taste"', right: 'taste 😋', desc: 'The way you say it is the cutest thing ever.' }
  ];

  return (
    <>
      <h1 className="title" style={{ marginBottom: '0.5rem' }}><span className="gradient-text">Our Vibes</span> 😂</h1>
      <div className="polaroid-container" style={{ margin: '0 0 1rem 0' }}>
        <div className="polaroid" style={{ transform: 'rotate(2deg)' }}>
          <img src="/assets/img4.jpeg" alt="Us" />
          <div className="polaroid-caption">So goofy</div>
        </div>
        <div className="polaroid" style={{ transform: 'rotate(-3deg)' }}>
          <video src="/assets/vid2.mp4" autoPlay muted loop playsInline />
          <div className="polaroid-caption">Vibing!</div>
        </div>
      </div>
      
      <div className="grid-container">
        {vibes.map((v, i) => (
          <div key={i} className="glass-card">
            <p className="vibe-wrong">"{v.wrong}"</p>
            <p style={{ margin: '0.5rem 0', opacity: 0.5 }}>↓</p>
            <p className="vibe-right">"{v.right}"</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Special() {
  return (
    <>
      <h1 className="title" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}><span className="gradient-text">Why You're Special</span></h1>
      
      <div className="polaroid-container">
        <div className="polaroid">
          <img src="/assets/img5.jpeg" alt="Us" />
          <div className="polaroid-caption">My Baby 💕</div>
        </div>
        <div className="polaroid">
          <img src="/assets/img6.jpeg" alt="Us" />
          <div className="polaroid-caption">My World 🌍</div>
        </div>
      </div>

      <div className="glass-card letter" style={{ marginTop: '1rem' }}>
        <p>To my sweet Priiti 🍬,</p>
        <p>You're always there for me, even when I don't deserve it.</p>
        <p>I treat you like my baby because you ARE my baby. When I'm with you, everything just makes sense.</p>
        <p>I don't need the whole world, I just need you.</p>
        <div className="letter-sign">Forever yours, Your Idiot ❤️</div>
      </div>
    </>
  );
}

function Promise() {
  const promises = [
    "I'll always bring you roses 🌹",
    "I'll try to say groceries properly 😅",
    "I'll be the reason you smile",
    "I'll never let you go"
  ];

  return (
    <>
      <div className="polaroid" style={{ transform: 'rotate(2deg)', margin: '0 auto 1.5rem auto' }}>
        <img src="/assets/img7.jpeg" alt="Forever" />
        <div className="polaroid-caption">Forever ♾️</div>
      </div>
      
      <h1 className="title gradient-text">I Promise...</h1>
      <div className="glass-card promise-list" style={{ margin: '1rem 0' }}>
        {promises.map((p, i) => (
          <div key={i} className="promise-item">
            <span style={{ color: 'var(--rose-400)' }}>✓</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2.5rem', color: 'var(--rose-300)', marginTop: '0.5rem' }}>
        I love you, Priiti (my Sonpapdi) 💖
      </h2>
    </>
  );
}

export default App;
