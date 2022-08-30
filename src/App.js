import Slider from 'react-input-slider';
import Audio from "./components/modules/Audio";
import list from "./components/List";
import Header from './components/Header';

import { 
  AiFillPlayCircle, 
  AiFillPauseCircle,
  AiOutlineReload, 
  AiOutlineFastBackward,
  AiOutlineFastForward,
  AiOutlineRetweet,
      } from "react-icons/ai";
import { useState, useRef } from "react";

import './App.css';

function App() {
  const [isPlay, setPlay] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  // const currentRef = useRef().current;

  const handleLoadedData = ()=> {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  }

  const autoNext = () => {
    setAudioIndex((audioIndex+1) % list.length);
    setPlay(true);
  }

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  const handlePrevious = () => {
    if (audioIndex === 0) {
    setAudioIndex((audioIndex + list.length -1) % list.length);
    } else {
    setAudioIndex((audioIndex - 1) % list.length);
    }
  };
  const handleNext = () => {
    setAudioIndex((audioIndex + 1) % list.length);
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const listIteam = list.map((row, index) => (
    <Audio 
      isPlay={isPlay && audioIndex === index}
      key={index.toString()}
      index={index + 1}
      avatar={row.avatar}
      src={row.src}
      name={row.name}
      artist={row.artist}
      time={row.time}
      handlePlay={() => {
        setAudioIndex(index)
        setPlay(true)
      }}
    />
  ));

  return (
    <main className="container">
      {/* <div style={{display:'block'}}>ha</div> */}
      <Header />
      <div>

      </div>
      <div className="app">
        {/* layout left  */}
        <div className='wrapper_left'>
          <h2 className="title-h2">TOP SONGS OF THE MONTH</h2>
          <ul>{listIteam} </ul>
        </div>

        {/* layout right */}
        <div className='wrapper_right'>

          {/* title of layout right */}
          <div className="layout_playing-title">
            <h2 className="title-h2"> NOW PLAYING </h2>
          </div>

          {/* dashboard of layout right */}
          <div className="layout_playing  layout-both">
            <div 
                className={
                  isPlay ? "playing-avatar rorate" : "playing-avatar"
                }
                style={{
                  backgroundImage: `url(${list[audioIndex].avatar})`
                }}
            >
              <span className="playing-disc"></span>
            </div>

            <div className="playing_info">
                <h4 >{list[audioIndex].name}</h4>
                <span>{list[audioIndex].artist}</span>
            </div>
            
            {/* Slider bar */}
            <div className="playing_audio">
                <audio 
                  ref={audioRef}
                  src={list[audioIndex].src}
                  onLoadedData={handleLoadedData}
                  onTimeUpdate={()=>{
                    setCurrentTime(audioRef.current.currentTime);
                  }}
                  onEnded={autoNext}
                ></audio>
                <Slider
                      axis="x"
                      xmax={duration}
                      x={currentTime}
                      onChange={handleTimeSliderChange}
                      styles={{
                        track: {
                          backgroundColor: "#e3e3e3",
                          height: "3px",
                          width: "100%"
                        },
                        active: {
                          backgroundColor: "#4834d4",
                          height: "3px"
                        },
                        thumb: {
                          marginLeft: 5,
                          marginTop: -1,
                          width: 12,
                          height: 12,
                          backgroundColor: "#4834d4",
                          borderRadius: 12,
                        }
                      }}
                    />
                
                {/* start time */}
                <span style={{
                        float:'left', 
                        fontSize:'14px', 
                        color:'rgba(99, 110, 114,1.0)'
                      }}>
                    {(currentTime/60).toFixed(2)}
                </span>
                <span style={{
                        float:'right', 
                        fontSize:'14px', 
                        color:'rgba(99, 110, 114,1.0)'
                      }}>
                    {list[audioIndex].time}
                </span>
                {/* end time */}
            </div>

          </div>
          <div className="layout_controls  layout-both">
            <div className="layout_controls-icon">
              <AiOutlineReload />
            </div>
            <div className="layout_controls-icon" onClick={handlePrevious}>
              <AiOutlineFastBackward />
            </div>
            <div className="layout_controls-icon" onClick={handlePausePlayClick}>
            {isPlay ? (
                      <AiFillPauseCircle color="#3498db" />
                    ) : (
                      <AiFillPlayCircle color="#3498db" />
                    )}
            </div>
            <div className="layout_controls-icon" onClick={handleNext}>
              <AiOutlineFastForward/>
            </div>
            <div className="layout_controls-icon">
              <AiOutlineRetweet/>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default App;
