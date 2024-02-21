import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ to, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // 指定されたパスにナビゲート
        navigate(to);
    };

    return (
        <button onClick={handleClick} style={{width: '200px', margin: '20px'}}>
            {children}
        </button>
    );
};

export default Button;