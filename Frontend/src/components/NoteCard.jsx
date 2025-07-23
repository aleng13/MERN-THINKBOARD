import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // prevent navigating to detail

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/note/${note._id}`}
        className="card bg-[#121212]/80 backdrop-blur-sm hover:shadow-xl 
        transition-all duration-300 rounded-2xl border-t-4 border-[#00FF9D] text-white"
      >
        <div className="card-body space-y-2">
          <h3 className="card-title text-xl font-semibold text-white">{note.title}</h3>
          <p className="text-white/70 line-clamp-3">{note.content}</p>

          <div className="card-actions justify-between items-center pt-2">
            <span className="text-sm text-white/50">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-2">
              <PenSquareIcon className="size-4 text-white/60" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NoteCard;
