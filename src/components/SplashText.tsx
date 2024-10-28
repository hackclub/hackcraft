'use client';
import { useState } from "react";

export default function SplashText() {
  const splashText = [
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
    'All mods are cool!',
    "Mo plugins, mo problems!",
    'Paid for with emeralds',
    'The modding never ends!',
    'Please stand by...',
    'The end... or the beginning?',
    'Not just a phase!',
    'More like modcraft!',
  ]

  const [currentSplash, setCurrentSplash] = useState(splashText[0]);

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