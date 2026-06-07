import React from 'react';
import './NoData.scss';

interface NoDataProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    onReset?: () => void;
    resetLabel?: string;
}

const NoData = ({
    title = "No search results found",
    message = "Try adjusting your search or filters to find what you're looking for.",
    icon = "🔍",
    onReset,
    resetLabel = "Clear All Filters"
}: NoDataProps) => {
    return (
        <div className="no-data-container">
            <div className="no-data-content">
                <div className="no-data-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{message}</p>
               
            </div>
        </div>
    );
};

export default NoData;
