import { ModeToggle } from '@/components/mode-toggle';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      className="flex items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-10 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* App Name */}
      <motion.h1
        className="text-2xl font-bold text-primary"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Feedly
      </motion.h1>

      {/* Mode Toggle */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ModeToggle />
      </motion.div>
    </motion.nav>
  );
}
