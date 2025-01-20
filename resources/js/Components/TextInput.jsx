import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, onChange, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handleChange = (e) => {
        if (type === 'file') {
            // Handle file input change
            if (onChange) {
                onChange(e.target.files[0] || null); // Return the first file or null
            }
        } else {
            // Handle other input types
            if (onChange) {
                onChange(e);
            }
        }
    };

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
            onChange={handleChange}
        />
    );
});
