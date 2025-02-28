import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[71vh]">
      <motion.div
        className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Loader;
