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

  if (isLoading) {
    return <div>Detecting components...</div>;
  }

  return (
    <div style={{ padding: '8px', borderRadius: '6px' }}>
      {result ? <h2>{result}</h2> : <h2>No components detected or highlights cleared.</h2>}
    </div>
  );
};

export default Popup;
