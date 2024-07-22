import { useCallback, useState } from "react";

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = useCallback((event) => {
        setValue(event.target.value)
    }, []);
    return [value, handleChange]
}