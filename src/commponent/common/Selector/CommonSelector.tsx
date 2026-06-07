import React from 'react';
import './CommonSelector.scss';

interface Option {
    label: string;
    value: string;
}

interface CommonSelectorProps {
    options: Option[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    className?: string;
}

const CommonSelector: React.FC<CommonSelectorProps> = ({
    options,
    value,
    onChange,
    placeholder,
    className = ""
}) => {
    return (
        <div className={`common-selector-container ${className}`}>
            <select
                className="common-selector"
                value={value}
                onChange={onChange}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <div className="selector-arrow">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
};

export default CommonSelector;
