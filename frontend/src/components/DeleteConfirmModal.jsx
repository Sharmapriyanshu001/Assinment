import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6c7b91]/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[420px] flex flex-col shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800">Delete Product</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mb-8">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Are you sure you really want to delete this Product <br />
            " <span className="font-bold text-gray-800">{productName}</span> " ?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <Button 
            onClick={onConfirm} 
            className="w-auto px-6 py-2 text-sm rounded-lg font-semibold bg-[#2539c0] hover:bg-[#1a2b9e]"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
