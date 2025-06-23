import { LabelConfig } from '@/types/highlighter';

/**
 * 요소에 상대적 포지셔닝을 적용합니다.
 */
export const applyRelativePosition = (element: HTMLElement): void => {
  if (element.style.position === '' || element.style.position === 'static') {
    element.style.position = 'relative';
  }
};

/**
 * 라벨 요소를 생성합니다.
 */
export const createLabel = (config: LabelConfig): HTMLElement => {
  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'absolute',
    top: '6px',
    left: '6px',
    background: config.color,
    color: '#ffffff',
    padding: '8px',
    fontSize: '16px',
    zIndex: '10000',
    borderRadius: '6px',
  });
  label.textContent = config.text;
  label.classList.add(config.type);
  return label;
};

/**
 * 요소에 라벨을 추가합니다.
 */
export const addLabelToElement = (element: HTMLElement, label: HTMLElement): void => {
  element.appendChild(label);
};

/**
 * 요소의 첫 번째 자식으로 라벨을 삽입합니다.
 */
export const insertLabelAsFirstChild = (element: HTMLElement, label: HTMLElement): void => {
  element.insertBefore(label, element.firstChild);
};

/**
 * 요소에 테두리를 적용합니다.
 */
export const applyBorder = (element: HTMLElement, color: string, width: string = '2px'): void => {
  element.style.border = `${width} solid ${color}`;
  element.dataset.setHighlight = 'true';
};

/**
 * hover시에만 보이는 라벨을 생성합니다.
 */
export const createHoverLabel = (config: LabelConfig): HTMLElement => {
  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    background: config.color,
    color: '#fff',
    padding: '4px 8px',
    fontSize: '14px',
    fontWeight: '600',
    zIndex: '20000',
    borderRadius: '6px',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  });
  label.textContent = config.text;
  label.classList.add('hover-label');
  return label;
};

/**
 * 요소에 hover 이벤트와 함께 라벨을 추가합니다.
 */
export const addHoverLabelToElement = (element: HTMLElement, label: HTMLElement): void => {
  element.appendChild(label);

  // hover 이벤트 추가
  element.addEventListener('mouseenter', () => {
    label.style.opacity = '1';
    label.style.visibility = 'visible';
  });

  element.addEventListener('mouseleave', () => {
    label.style.opacity = '0';
    label.style.visibility = 'hidden';
  });
};

/**
 * Portal 방식으로 document.body에 hover label을 생성합니다.
 */
export const createPortalHoverLabel = (config: LabelConfig): HTMLElement => {
  const label = document.createElement('div');
  Object.assign(label.style, {
    position: 'fixed', // viewport 기준 고정 위치
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: config.color,
    color: '#fff',
    padding: '4px 8px',
    fontSize: '14px',
    fontWeight: '600',
    zIndex: '999999', // 최상위 레이어
    borderRadius: '6px',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  });
  label.textContent = config.text;
  label.classList.add('portal-label');
  return label;
};

const hoverLabelControllerWeakMap = new WeakMap<HTMLElement, AbortController>();

/**
 * Portal 방식으로 요소에 hover 라벨을 추가합니다.
 * 라벨은 document.body에 렌더링되어 부모 요소의 제약을 받지 않습니다.
 */
export const addHoverLabelToPortal = (element: HTMLElement, config: LabelConfig): void => {
  let portalLabel: HTMLElement | null = null;

  const abortController = new AbortController();
  const signal = abortController.signal;

  const showLabel = () => {
    // 기존 라벨이 있으면 제거
    if (portalLabel) {
      document.body.removeChild(portalLabel);
    }

    // 새 라벨 생성
    portalLabel = createPortalHoverLabel(config);
    document.body.appendChild(portalLabel);

    // 요소의 위치 계산
    const rect = element.getBoundingClientRect();
    const labelWidth = 120; // 대략적인 라벨 너비
    const labelHeight = 32; // 대략적인 라벨 높이

    // 화면 경계를 고려한 위치 계산
    let left = rect.left + rect.width / 2 - labelWidth / 2; // 중앙 정렬
    let top = rect.top - labelHeight - 4; // 요소 위쪽에 배치

    // 화면 왼쪽 경계 체크
    if (left < 8) left = 4;
    // 화면 오른쪽 경계 체크
    if (left + labelWidth > window.innerWidth - 4) {
      left = window.innerWidth - labelWidth - 4;
    }
    // 화면 위쪽 경계 체크 (위에 공간이 없으면 아래쪽에 배치)
    if (top < 8) {
      top = rect.bottom + 4;
    }

    portalLabel.style.left = `${left}px`;
    portalLabel.style.top = `${top}px`;

    // 표시
    requestAnimationFrame(() => {
      if (portalLabel) {
        portalLabel.style.opacity = '1';
        portalLabel.style.visibility = 'visible';
      }
    });
  };

  const hideLabel = () => {
    if (portalLabel) {
      portalLabel.style.opacity = '0';
      portalLabel.style.visibility = 'hidden';

      // 애니메이션 완료 후 DOM에서 제거
      setTimeout(() => {
        if (portalLabel && document.body.contains(portalLabel)) {
          document.body.removeChild(portalLabel);
        }
        portalLabel = null;
      }, 200);
    }
  };

  // hover 이벤트 추가
  element.addEventListener('mouseenter', showLabel, { signal });
  element.addEventListener('mouseleave', hideLabel, { signal });

  hoverLabelControllerWeakMap.set(element, abortController);
};

export const removePortalHoverLabel = (element: HTMLElement): void => {
  const controller = hoverLabelControllerWeakMap.get(element);
  // 저장된 controller로 모든 이벤트 한번에 제거
  if (controller) {
    controller.abort();
    hoverLabelControllerWeakMap.delete(element);
  }

  // 현재 떠있는 라벨도 제거
  const portalLabels = document.querySelectorAll('.portal-label');
  portalLabels.forEach((label) => label.remove());
};
