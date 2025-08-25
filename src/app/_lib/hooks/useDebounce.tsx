import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const interval = setInterval(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearInterval(interval)
    }, [value, delay])

    return debouncedValue;
}