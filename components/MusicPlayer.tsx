"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";
import { useState } from "react";

export default function MusicPlayer() {
  const { isMuted, isPlaying, hasInteracted, toggleMute } = useMusic();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip "Ketuk untuk memutar" */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="bg-black/60 backdrop-blur-md border border-pink-500/30 text-pink-300 text-xs px-4 py-2 rounded-full pointer-events-none"
          >
            🎵 Ketuk untuk memutar musik
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main player button */}
      <div className="flex items-center gap-2">
        {/* Expanded label */}
        <AnimatePresence>
          {expanded && hasInteracted && (
            <motion.div
              initial={{ opacity: 0, x: 10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: 10, width: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-black/50 backdrop-blur-md border border-pink-500/20 rounded-full px-4 py-2 flex items-center gap-2 whitespace-nowrap">
                {/* Visualizer bars animation */}
                {isPlaying && !isMuted ? (
                  <div className="flex items-end gap-[2px] h-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] bg-primary rounded-full"
                        animate={{ height: ["6px", "16px", "4px", "12px", "6px"] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Music className="w-3 h-3 text-pink-400" />
                )}
                <span className="text-pink-200 text-xs font-medium">heaven.mp3</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute/unmute circle button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (hasInteracted) {
              toggleMute();
              setExpanded((v) => !v);
            }
          }}
          onMouseEnter={() => hasInteracted && setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          whileTap={{ scale: 0.92 }}
          className="relative w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-pink-500/30 flex items-center justify-center text-pink-300 hover:border-pink-500/60 hover:text-pink-200 transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
        >
          {/* Pulse ring when playing */}
          {isPlaying && !isMuted && (
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
