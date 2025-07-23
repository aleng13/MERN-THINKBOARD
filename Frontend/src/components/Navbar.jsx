import { Link } from "react-router-dom";
import { PlusIcon, StickyNoteIcon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      className="bg-base-100 border-b border-base-content/10 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 text-primary font-mono font-bold text-2xl">
            <StickyNoteIcon className="size-6" />
            THINKBOARD
          </Link>

          {/* New Note button */}
          <div>
            <Link to="/create" className="btn btn-primary btn-sm gap-2">
              <PlusIcon className="size-4" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
