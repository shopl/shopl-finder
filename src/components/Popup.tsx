import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

const Popup: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const detectComponents = () => {
    setIsLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const tabId = activeTab?.id;

      if (typeof tabId !== 'number') {
        setResult(null);
        setIsLoading(false);
        return;
      }

      chrome.tabs.sendMessage(tabId, { action: 'detect' }, (response: { result: string } | undefined) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          setResult(null);
        } else if (response) {
          setResult(response.result);
        } else {
          setResult(null);
        }
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    detectComponents();
  }, []);

  return (
    <Container>
      <Title>분석 결과</Title>
      <ResultContainer>
        {isLoading ? <LoadingSpinner /> : <ResultText>{result || '분석 결과가 없어요'}</ResultText>}
      </ResultContainer>
    </Container>
  );
};

export default Popup;

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  background: #333333;
  color: #ffffff;
`;

const LoadingSpinner = styled.div`
  border: 2px solid #ffffff;
  border-top: 2px solid #333333;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 80px;
`;

const ResultText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;
