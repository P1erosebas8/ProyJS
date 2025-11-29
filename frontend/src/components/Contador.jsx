import { useEffect, useRef, useState } from "react";

export const Contador = ({ reset }) => {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (reset) {
            localStorage.removeItem("visits");
            setCount(0);
            return;
        }

        const saved = Number(localStorage.getItem("visits") || 0);
        const newValue = saved + 1;

        localStorage.setItem("visits", newValue);
        setCount(newValue);

    }, [reset]);

    return (
        <p className="mt-4 p-3 text-center text-white bg-dark rounded shadow-sm">
            Has ingresado {count} veces al panel.
        </p>
    );
};
