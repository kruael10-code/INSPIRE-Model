import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 relative">
      <div className="relative mb-12">
        {/* Liquid Blobs Background */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 blur-xl opacity-40"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 0.9, 1.2, 1.1],
            rotate: [360, 270, 180, 90, 0],
            borderRadius: ["50%", "70% 30% 30% 70% / 60% 40% 60% 40%", "50%", "60% 40% 30% 70% / 50% 50% 40% 60%", "50%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-bl from-purple-400 to-pink-500 blur-xl opacity-40"
        />

        {/* Center Card */}
        <div className="glass-card relative z-10 w-32 h-32 rounded-[2rem] flex items-center justify-center shadow-lg border border-white/60">
           <motion.div
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="text-5xl"
           >
             🔮
           </motion.div>
        </div>
      </div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm"
      >
        AI กำลังปรุงยา...
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 text-lg font-medium"
      >
        {message}
      </motion.p>
      
      {/* Loading Bar */}
      <div className="mt-8 w-64 h-3 bg-white/40 rounded-full overflow-hidden border border-white/50 p-0.5">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;