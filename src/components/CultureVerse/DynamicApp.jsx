"use client";

import dynamic from 'next/dynamic';

const App = dynamic(() => import('./App'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center text-white font-mono text-xl">
      Initializing 3D Engine...
    </div>
  )
});

export default function DynamicApp() {
  return <App />;
}
