'use client';
import { useState } from "react";

export default function SplashText() {
  const [currentSplash, setCurrentSplash] = useState('YSWS edition!');

  const splashText = [
    'YSWS edition!',
    'Plug-ins everywhere!',
    'by HCers, for HCers!',
    'As seen on Slack!',
    'Coming soon to a screen in front of you!',
    'More than 1 plugins sold!',
    'A modder is you!',
    'Please pardon our dust!',
    'Better than bedrock!',
    'Player of games? Maker of mods!',
    'BEWARE THE FROGPAD...',
    'Unlimited Modabilities!',
    'Hack to the Future!',
    'All mods are cool!'
  ]

  function cycleSplash() {
    const randomSplash =  splashText[Math.floor(Math.random() * splashText.length)]
    setCurrentSplash(randomSplash)
  }

    // little easter egg for the player
    console.log("https://hack.club/sy0x8")
  return (
    <div className="splash" onClick={() => cycleSplash()}>{currentSplash}</div>
  );
}