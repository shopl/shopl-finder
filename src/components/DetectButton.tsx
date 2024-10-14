import React from 'react';

interface DetectButtonProps {
    onClick: () => void;
}

const DetectButton: React.FC<DetectButtonProps> = ({ onClick }) => {
    return <button onClick={onClick}>Detect Components</button>;
};

export default DetectButton;
