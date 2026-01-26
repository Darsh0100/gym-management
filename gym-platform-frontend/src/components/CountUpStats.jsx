import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const CountUpStats = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Extract number from string (e.g. "10k+" -> 10000) for simple cases
    // or just expect raw number `value` and formatting.
    // For this generic component, let's assume `value` is a number or string number.
    // If "10k+" is passed, we might want to animate to 10 and add "k+".
    // Let's keep it simple: Pass raw number as prop `n` and `suffix`.

    // Actually, to support "10k+", let's parse it inside or let user pass raw `n`.
    // Let's rely on passing `n` (number) and `label` (string) from parent? 
    // No, the UI usage is `{ id: 1, value: '10k+', ... }`.
    // So we need to parse '10k+' -> 10.

    const stringValue = String(value);
    const numericValue = parseInt(stringValue.replace(/\D/g, ''));
    const parsedSuffix = stringValue.replace(/[0-9]/g, '');
    const finalSuffix = suffix || parsedSuffix;

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
        duration: 2
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, motionValue, numericValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString() + finalSuffix;
            }
        });
    }, [springValue, finalSuffix]);

    return <span ref={ref} />;
};

export default CountUpStats;
