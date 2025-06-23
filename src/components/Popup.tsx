import styled from '@emotion/styled';
import React, { useState } from 'react';

type FeatureType = 'techstack' | 'shoplflow';

interface FeatureState {
  result: string | null;
  isLoading: boolean;
}

const Popup: React.FC = () => {
  const [techstackState, setTechstackState] = useState<FeatureState>({
    result: null,
    isLoading: false,
  });

  const [shoplflowState, setShoplflowState] = useState<FeatureState>({
    result: null,
    isLoading: false,
  });

  const [isResetting, setIsResetting] = useState(false);

  const detectFeature = (featureType: FeatureType) => {
    const setState = featureType === 'techstack' ? setTechstackState : setShoplflowState;
    const action = featureType === 'techstack' ? 'detect-techstack' : 'detect-shoplflow';

    setState((prev) => ({ ...prev, isLoading: true }));

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const tabId = activeTab?.id;

      if (typeof tabId !== 'number') {
        setState({ result: null, isLoading: false });
        return;
      }

      chrome.tabs.sendMessage(tabId, { action }, (response: { result: string } | undefined) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          setState({ result: null, isLoading: false });
        } else if (response) {
          setState({ result: response.result, isLoading: false });
        } else {
          setState({ result: null, isLoading: false });
        }
      });
    });
  };

  const resetHighlights = () => {
    setIsResetting(true);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const tabId = activeTab?.id;

      if (typeof tabId !== 'number') {
        setIsResetting(false);
        return;
      }
      chrome.tabs.sendMessage(tabId, { action: 'reset-highlights' });
      // Popup 상태 초기화
      setTechstackState({ result: null, isLoading: false });
      setShoplflowState({ result: null, isLoading: false });
      setIsResetting(false);
    });
  };

  return (
    <Container>
      <Title> 🔎 SHOPL Finder</Title>

      <ButtonSection>
        <FeatureButton onClick={() => detectFeature('techstack')}>⚙️ 기술 스택 찾기</FeatureButton>

        <FeatureButton onClick={() => detectFeature('shoplflow')}>🛍️ Shoplflow 찾기</FeatureButton>

        <ResetButton onClick={resetHighlights} disabled={isResetting}>
          {isResetting ? '초기화 중...' : '🔄 초기화하기'}
        </ResetButton>
      </ButtonSection>

      {/* 기술 스택 결과 */}
      {(techstackState.isLoading || techstackState.result) && (
        <ResultSection>
          <ResultTitle>📋 기술 스택 결과</ResultTitle>
          <ResultContainer>
            {techstackState.isLoading ? (
              <LoadingSpinner />
            ) : (
              <ResultText>{techstackState.result || '분석 결과가 없어요'}</ResultText>
            )}
          </ResultContainer>
        </ResultSection>
      )}

      {/* Shoplflow 결과 */}
      {(shoplflowState.isLoading || shoplflowState.result) && (
        <ResultSection>
          <ResultTitle>🛍️ Shoplflow 결과</ResultTitle>
          <ResultContainer>
            {shoplflowState.isLoading ? (
              <LoadingSpinner />
            ) : (
              <ResultText>{shoplflowState.result || '분석 결과가 없어요'}</ResultText>
            )}
          </ResultContainer>
        </ResultSection>
      )}
    </Container>
  );
};

export default Popup;

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const Title = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 32px;
  color: #333333;
  border-bottom: 1px solid #e5e5e5;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #f8f9fa;
`;

const FeatureButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
  color: #333333;
  border: 1px solid #e5e5e5;

  &:hover {
    background: #f1f3f4;
    border-color: #d1d5db;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ResetButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #ffffff;
  color: #6979f8;
  border: 1px solid #6979f8;

  &:hover:not(:disabled) {
    background: #6979f8;
    color: #ffffff;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultSection = styled.div`
  border-top: 1px solid #e5e5e5;
`;

const ResultTitle = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 600;
  background: #f8f9fa;
  color: #555555;
  border-bottom: 1px solid #e5e5e5;
`;

const LoadingSpinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
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
  min-height: 30px;
  padding: 12px;
`;

const ResultText = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 1.4;
  color: #333333;
`;
