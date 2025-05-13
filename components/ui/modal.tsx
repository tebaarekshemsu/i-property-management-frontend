import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
};

export const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;

export const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-xl font-bold mb-4">{children}</h2>;

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="mb-4">{children}</div>;

export const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="flex justify-end space-x-2">{children}</div>;

export const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    return { isOpen, onOpen, onClose };
}; 