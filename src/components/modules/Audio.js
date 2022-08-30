import React from 'react';
import  {useState} from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import styles from "./Audio.module.css";

function Audio({index, avatar, name, artist, time, isPlay, handlePlay}) {

  const [like, setLike] = useState(false);
  const handleLike = () =>{
    setLike(!like);
  };
  const activeLike = like ? '#c0392b' : '#ecf0f1';

  return (
    <li className={styles.container}>
        <span className={styles.index}>{index}</span>
        <span className={styles.avatar}>
          <img src={avatar} height={50} alt="" />
        </span>
        <span className={styles.name} onClick={handlePlay}>{name}</span>
        <span className={styles.artist}>{artist}</span>
        <span className={styles.time}>{time}</span>
        <span >
          <AiOutlineHeart 
            className={styles.icon} 
            onClick={handleLike} 
            color={activeLike}
          />
        </span>
        
    </li>
  )
}

export default Audio;