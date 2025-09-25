'use client';

import { useSyncExternalStore } from 'react';

export type CollapsibleMode = 'offcanvas' | 'icon' | 'none' | 'sheet';

type CollapsibleState = {
  mode: CollapsibleMode;
};

type CollapsibleAction = {
  setMode: (mode: CollapsibleMode) => void;
  resetMode: () => void;
};

// 초기 상태
const DEFAULT_MODE: CollapsibleMode = 'offcanvas';

let state: CollapsibleState = {
  mode: DEFAULT_MODE,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

function getSnapshot(): CollapsibleState {
  return state;
}

export const useCollapsibleStore = (): CollapsibleState & CollapsibleAction => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    ...snapshot,
    setMode: (mode: CollapsibleMode) => {
      if (state.mode !== mode) {
        state = { mode };
        listeners.forEach((listener) => listener());
      }
    },
    resetMode: () => {
      state = { mode: DEFAULT_MODE };
      listeners.forEach((listener) => listener());
    },
  };
};
