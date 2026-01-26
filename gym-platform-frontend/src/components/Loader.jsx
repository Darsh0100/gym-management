import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <motion.div
                animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-400/30">
                    <Dumbbell className="h-10 w-10 text-white" />
                </div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="mt-6 text-lg font-semibold text-gray-600 dark:text-gray-300 tracking-wide"
            >
                LIFTING WEIGHTS...
            </motion.p>
        </div>
    );
};

export default Loader;
