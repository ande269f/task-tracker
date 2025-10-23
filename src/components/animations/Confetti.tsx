import { useWindowSize } from 'react-use'
import ConfettiComponent from 'react-confetti'
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAnimation } from '../../store/slices/animationSlice/animationSlice';

export const Confetti = () => {
  const animation = useSelector((state: RootState) => state.animationState.animation);
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] =  useState(false);
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (animation === "confetti") {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [animation])

  if (!showConfetti) return null;

  return (
    <ConfettiComponent
      width={width}
      height={height}
      confettiSource={{x:0,y:height/4, w: width, h: height}}
      gravity={0.2}
      numberOfPieces={40}
      initialVelocityY={{min: -5, max: -10}}
      recycle={false}
      onConfettiComplete={() => dispatch(setAnimation("none"))}
      tweenDuration={500}
      />
  )
}