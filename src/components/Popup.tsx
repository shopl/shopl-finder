import styled from '@emotion/styled';
import React, { useState } from 'react';

type FeatureType = 'detect-techstack' | 'detect-shoplflow' | 'reset-highlights';

const Popup: React.FC = () => {
  const [actionState, setActionState] = useState<{
    type: FeatureType | null;
    result: string | null;
    isLoading: boolean;
  }>({
    type: null,
    result: null,
    isLoading: false,
  });

  const detectFeature = (action: FeatureType) => {
    setActionState((prev) => ({ ...prev, isLoading: true }));

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const tabId = activeTab?.id;

      if (typeof tabId !== 'number') {
        setActionState({ type: null, result: null, isLoading: false });

        return;
      }

      chrome.tabs.sendMessage(tabId, { action }, (response: { result: string } | undefined) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        try {
          if (!response) {
            return;
          }
          setActionState({ type: action, result: response.result, isLoading: false });
        } catch (error) {
          console.error(error);
          setActionState({ type: null, result: null, isLoading: false });
        }
      });
    });
  };

  return (
    <Container>
      <Title> 🔎 SHOPL Finder</Title>

      <ButtonSection>
        <FeatureButton onClick={() => detectFeature('detect-techstack')}>⚙️ 기술 스택 찾기</FeatureButton>

        <FeatureButton onClick={() => detectFeature('detect-shoplflow')}>🛍️ Shoplflow 찾기</FeatureButton>

        <ResetButton
          onClick={() => detectFeature('reset-highlights')}
          disabled={Boolean(actionState.type === 'reset-highlights' && actionState.isLoading)}
        >
          {actionState.type === 'reset-highlights' && actionState.isLoading ? '초기화 중...' : '🔄 초기화하기'}
        </ResetButton>
      </ButtonSection>

      {/* 기술 스택 결과 */}
      {actionState.type === 'detect-techstack' && (
        <ResultSection>
          <ResultTitle>📋 기술 스택 결과</ResultTitle>
          <ResultContainer>
            {actionState.isLoading ? (
              <LoadingSpinner />
            ) : (
              <ResultText>{actionState.result || '분석 결과가 없어요'}</ResultText>
            )}
          </ResultContainer>
        </ResultSection>
      )}

      {/* Shoplflow 결과 */}
      {actionState.type === 'detect-shoplflow' && (
        <ResultSection>
          <ResultTitle>🛍️ Shoplflow 결과</ResultTitle>
          <ResultContainer>
            {actionState.isLoading ? (
              <LoadingSpinner />
            ) : (
              <ResultText>{actionState.result || '분석 결과가 없어요'}</ResultText>
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
  color: #5c68c9;
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
  color: #ffffff;
  background: #6979f8;

  &:hover:not(:disabled) {
    background: #5c68c9;
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
