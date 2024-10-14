import React from 'react';

interface ResultDisplayProps {
    result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <div>
            <h2>Detection Result:</h2>
            <p>{result}</p>
        </div>
    );
};

export default ResultDisplay;
