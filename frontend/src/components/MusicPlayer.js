import React, { useRef, useState } from 'react';

const songs = [
  {
    id:1,
    url:"/music/vicoka-ft-wizard-chan-spirit.mp3",                        
    title: 'Spirit',
    artist: 'Vicoka Ft Wizard Chan'
  },
  {
    id:2,
    url: "/music/Diamond-Jimma-Awuyewuye.mp3",
    title: 'Awuyewuye',
    artist: 'Diamond Jimma'
  },
  {
    id:3,
    url:"/music/ed-sheran-i-found-love.mp3",                         
    title: 'I Found Love',
    artist: 'Ed sheran'
  },
    {
    id:4,
    url:"/music/johnny-drile-wait-for-me.mp3",                         
    title: 'Wait For Me',
    artist: 'Johnny Drile'
  },
    {
    id:5,
    url:"/music/Dean Lewis - With You (Official Video)(MP3_160K).mp3",                         
    title: 'With You',
    artist: 'Dean Lewis'
  },
    {
    id:6,
    url:"/music/Justin_Bieber_-_Baby_(Official_Music_Video)_ft._Ludacris(480p).mp3",                         
    title: 'Baby',
    artist: 'Justin Bieber Ft Ludacris'
  },
    {
    id:7,
    url:"/music/gyakie_omah_lay_forever_remix_official_music_video_mp3_33764.mp3",                         
    title: 'Gyakie Ft Omah Lay',
    artist: 'Forever Remix'
  },
    {
    id:8,
    url:"/music/Umar_M_Shareef_-_Na_Yarda_Dake(Official_Video)_2022(360p)_high_quality.mp3",                         
    title: 'Na Yarda Dake',
    artist: 'Umar M Shareef'
  },
    {
    id:9,
    url:"/music/Joeboy_-_Baby_.mp3",                         
    title: 'Baby',
    artist: 'Joeboy'
  },
      {
    id:10,
    url:"/music/John-Legend-Love-Me-Now.mp3",                         
    title: 'Love Me Now',
    artist: 'John Legend'
  },
];

function MusicPlayer() {
  const musicRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const currentSong = songs[currentSongIndex];

  const togglePlayPause = () => {
    if (musicRef.current) {
      if (isPlaying) {
        musicRef.current.pause();
      } else {
        musicRef.current.play().catch(e => console.log('Play error', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.src = songs[nextIndex].url;
      musicRef.current.load();
      setTimeout(() => {
        if (isPlaying) {
          musicRef.current.play().catch(e => console.log('Play error', e));
        }
      }, 100);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: "-10px",
      padding: '5px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <audio ref={musicRef} src={currentSong.url} />
      <h2 style={{ fontFamily: 'Arial', margin: '0px' }}>Now Playing...</h2>
      <p style={{ fontFamily: 'Arial', fontSize: '16px', margin: '5px 0' }}>
        <strong>No:{currentSong.id} {currentSong.title} by <em>{currentSong.artist}</em></strong>
      </p>
      <div style={{ margin: '10px 0' }}>
        <button onClick={togglePlayPause} style={{
          padding: '6px 12px',
          fontSize: '14px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          margin: '0 5px',
          transition: 'transform 0.1s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={playNext} style={{
          padding: '6px 12px',
          fontSize: '14px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          margin: '0 5px',
          transition: 'transform 0.1s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
 