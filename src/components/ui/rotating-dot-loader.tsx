import { motion } from "framer-motion";

export default function RotatingDotsLoader() {
    const rotateVariants = {
        rotate: {
            rotate: 360,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    return (
        <div className="size-4 flex items-center justify-center">
            <motion.div className="relative size-3" variants={rotateVariants} animate="rotate">
                <motion.div
                    className="absolute left-0 top-0 size-1 rounded-full bg-blue-500"
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0 }}
                ></motion.div>
                <motion.div
                    className="absolute right-0 top-0 size-1 rounded-full bg-blue-500"
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.2 }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-0 left-0 size-1 rounded-full bg-blue-500"
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4 }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-0 right-0 size-1 rounded-full bg-blue-500"
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 }}
                ></motion.div>
            </motion.div>
        </div>
    );
}
