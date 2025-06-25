import { createContext, type HTMLAttributes, useContext } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';

type DraggableContextType = {
  listeners: DraggableSyntheticListeners;
  attributes: HTMLAttributes<Element>;
};

export const DraggableDialogContext = createContext<DraggableContextType | null>(null);

export const useDraggableDialog = () => {
  const context = useContext(DraggableDialogContext);
  if (!context) throw new Error('useDraggableDialog는 DraggableDialogContext.Provider 내에서 사용해야합니다.');

  return context;
};
