import React, { useState, useEffect, useRef } from 'react';

/**
 * CoinAnimation Component - Epic 01 Story 06
 * Animates a coin flying from center screen to Title Bar when coins are earned
 * Animation sequence: spawn (scale + rotate) → flight (arc path) → merge → pulse
 */
export default function CoinAnimation({ coinsEarned, onAnimationComplete }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const coinRef = useRef(null);

  useEffect(() => {
    if (coinsEarned > 0) {
      startAnimation();
    }
  }, [coinsEarned]);

  const startAnimation = async () => {
    setIsAnimating(true);

    // Phase 1: Spawn animation (0-300ms)
    // Coin appears at center and scales up with rotation
    await wait(300);

    // Phase 2: Flight animation (300-1500ms)
    // Coin flies along arc path to Title Bar
    await wait(1200);

    // Phase 3: Merge animation (1500ms)
    // Coin disappears into balance, show +X amount
    setShowAmount(true);
    setIsAnimating(false);

    // Phase 4: Amount display fades out (1500-2000ms)
    await wait(500);
    setShowAmount(false);

    // Trigger pulse effect in parent (Title Bar balance)
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  if (!isAnimating && !showAmount) return null;

  return (
    <>
      {/* Flying Coin */}
      {isAnimating && (
        <div
          ref={coinRef}
          className="fixed coin-animation"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            fontSize: '64px',
            animation: 'coinFly 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
          }}
        >
          💰
        </div>
      )}

      {/* Amount Display (shows briefly above balance) */}
      {showAmount && (
        <div
          className="fixed"
          style={{
            top: '10px',
            right: '200px',
            zIndex: 9999,
            animation: 'amountFade 500ms ease-out forwards',
          }}
        >
          <span className="font-bold text-2xl text-green-600">
            +{coinsEarned}
          </span>
        </div>
      )}

      {/* CSS Animation Styles */}
      <style>{`
        @keyframes coinFly {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translate(400px, -400px) scale(1.0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes amountFade {
          0% {
            opacity: 0;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
}
