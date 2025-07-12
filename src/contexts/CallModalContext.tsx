import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CallModalContextType {
  isOpen: boolean;
  formType: string;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const CallModalContext = createContext<CallModalContextType | undefined>(undefined);

export const useCallModal = () => {
  const context = useContext(CallModalContext);
  if (!context) {
    throw new Error('useCallModal must be used within a CallModalProvider');
  }
  return context;
};

interface CallModalProviderProps {
  children: ReactNode;
}

export const CallModalProvider: React.FC<CallModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState('');

  const openModal = (type: string) => {
    setFormType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormType('');
  };

  return (
    <CallModalContext.Provider value={{ isOpen, formType, openModal, closeModal }}>
      {children}
    </CallModalContext.Provider>
  );
};