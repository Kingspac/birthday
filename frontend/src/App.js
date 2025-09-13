import MusicPlayer from "./components/MusicPlayer.js";
import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";

const images = [
  "/images/2.jpg", "/images/1.jpg", "/images/3.jpg",
  "/images/4.jpg", "/images/5.jpg", "/images/6.jpg",
  "/images/7.png", "/images/11.jpg", "/images/8.jpg",
  "/images/10.png", "/images/9.jpg", "/images/12.jpg",
  "/images/13.jpg", "/images/14.jpg", "/images/15.png",
  "/images/16.png", "/images/17.png", "/images/18.jpg",
  "/images/19.jpg", "/images/20.jpg", "/images/21.jpg",
  "/images/22.jpg", "/images/23.jpg",
];

const API_URL =
  process.env.REACT_APP_API_URL || "https://birthday-wish-ghd9.onrender.com"

export default function App() {
  const [bgImage, setBgImage] = useState(images[0]);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const voiceRef = useRef(null);
  const musicRef = useRef(null);

  const text =
    "🎁🎊 Happy Birthday, princess 💝 Wishing you endless joy and success! 💐🌹🏵️";

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = images[Math.floor(Math.random() * images.length)];
      setBgImage(random);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startSurprise = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    if (voiceRef.current) {
      voiceRef.current.play();
      voiceRef.current.onended = () => {
        let i = 0;
        const typing = setInterval(() => {
          setTypedText((prev) => prev + text[i]);
          i++;
          if (i === text.length) {
            clearInterval(typing);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            setShowText(true);

            if (musicRef.current) {
              musicRef.current.play().catch((e) =>
                console.log("Music play error", e)
              );
            }
          }
        }, 100);
      };
    }
    setStarted(true);
  };

  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages", err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages([newMsg, ...messages]);
        setName("");
        setMessage("");
        setFeedback("Thank you for celebrating my birthday with me! 💖");
      } else {
        setFeedback("Oops, something went wrong! 😔");
      }
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Error submitting message", err);
    }
  }

return (
  <div className="app" style={{ backgroundImage: `url(${bgImage})` }}>
<Confetti
  width={windowSize.width}
  height={windowSize.height}
  recycle={true} // Set recycle to true for continuous confetti
  numberOfPieces={200}
  gravity={0.1}
  tweenDuration={5000}
  drawShape={(ctx) => {
    // Your star shape drawing code here
    const spikes = 5;
    const outerRadius = 10;
    const innerRadius = 4;
    let rot = Math.PI / 2 * 3;
    let x = 0;
    let y = 0;
    ctx.beginPath();
    for (let i = 0; i < spikes; i++) {
      let cx = x + Math.cos(rot) * outerRadius;
      let cy = y + Math.sin(rot) * outerRadius;
      ctx.lineTo(cx, cy);
      rot += Math.PI / spikes;
      cx = x + Math.cos(rot) * innerRadius;
      cy = y + Math.sin(rot) * innerRadius;
      ctx.lineTo(cx, cy);
      rot += Math.PI / spikes;
    }
    ctx.closePath();
const colors = ['#ff0000', '#fff500', '#1200ff', '#fc00ff', '#e0e1e1'];
                                                
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFFFFF';
  }}
/>

    
    <div className="overlay">
      <h2>💖 Birthday Surprise 💖</h2>
      {!started && (
        <button onClick={startSurprise} className="btn">
          🎁 Start Surprise
        </button>
      )}
      <audio ref={voiceRef} src="/sound.mp3" type="audio/mpeg" preload="auto" />
      <h2 className="typed">{typedText}</h2>
      {showText && (
        <div>
          <h3>🎶 Her Favourite 10 Music 🎶</h3>
          <MusicPlayer />
          <div className="form-section">
            {feedback && (
              <div className="feedback-message">
                {feedback}
              </div>
            )}
            <h3>💌 Leave a Birthday Message 💌</h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} required></textarea>
              <button type="submit">Send</button>
            </form>
            <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? 'Hide Messages' : 'Show Messages'}
            </button>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
              <h2>Posted Messages</h2>
              <div className="messages-container">
                {messages.map((msg, idx) => (
                  <div key={idx} className="message-card">
                    <h2>{msg.name}</h2>
                    <p>{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
