import React from 'react';
import styles from "../components/Header.module.css";
import {AiOutlineSearch} from "react-icons/ai";


function Header() {
  return (
    <div className={styles.main}>
        <div className={styles.logo}>
            
        </div>
        <div className={styles.prop}>
            <p>BXH</p>
        </div>
        <div className={styles.prop}>
            <p>Nhạc US-UK</p>
        </div >
        <div className={styles.prop} >
            <p>Nhạc Việt</p>
        </div>
        <div className={styles.prop}>
            <p>Nhạc Quốc tế</p>
        </div>
        <div className={styles.form}>
            <form action="#">
                <input  type='text' 
                        placeholder='Tim kiem' 
                        size='25'
                 />
                <span >
                    <AiOutlineSearch style={{fontSize:'20px'
                                            , lineHeight:'28px'
                                            }}/>
                </span>
            </form>
        </div>
    </div>
  )
}

export default Header