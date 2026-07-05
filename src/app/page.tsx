'use client';
import React, { useState } from 'react';

/* ============================= */
/*        MAIN HOME PAGE         */
/* ============================= */
const HomePage: React.FC = () => {
  const topPadding = 'pt-[120px]';

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-start relative overflow-x-hidden font-sans bg-[#120230]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(124,77,255,0.45), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(68,13,92,0.55), transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(18,2,48,0.9), transparent 100%)
          `,
          opacity: 1,
        }}
      />

      {/* Main Content */}
      <main
        className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-20 ${topPadding} pb-20 px-4 sm:px-10`}
      >
          
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 mt-10 relative z-10">
        <p className="text-sm text-white/60">
          Copyright - 2026 Goblin Saga
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
