import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes");
      toast.error("Failed to load notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-black via-[#001F1D] to-[#0a0a0a] text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#00FF9D] drop-shadow-lg">
            ThinkBoard
          </h1>
          <Link
            to="/create"
            className="btn btn-success text-black hover:scale-105 transition-transform duration-300 shadow-md"
          >
            + New Note
          </Link>
        </motion.div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <p className="text-white/60 text-center mt-20">No notes yet. Create one!</p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {notes.map((note) => (
              <motion.div
                key={note._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <NoteCard note={note} setNotes={setNotes} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
