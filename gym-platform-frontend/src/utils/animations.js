export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 15
        }
    },
};

export const scaleOnHover = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const buttonClick = {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const dumbbellSpin = {
    animate: {
        rotate: [0, 360],
        transition: {
            repeat: Infinity,
            duration: 2,
            ease: "linear"
        }
    }
};

export const float = {
    animate: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const pulseBlob = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};
