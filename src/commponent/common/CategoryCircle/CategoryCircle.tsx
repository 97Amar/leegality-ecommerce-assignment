import React from 'react';
import './CategoryCircle.scss';

interface CategoryCircleProps {
    name: string;
    image: string;
    onClick: () => void;
}

const CategoryCircle = ({ name, image, onClick }: CategoryCircleProps) => {
    return (
        <div className="category-circle-wrapper" onClick={onClick}>
            <div className="circle">
                <img src={image} alt={name} />
            </div>
            <span className="label">{name}</span>
        </div>
    );
};

export default CategoryCircle;
