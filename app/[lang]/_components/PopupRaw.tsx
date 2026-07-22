// components/Popup.tsx
'use client'
import React from 'react';
import { X } from 'lucide-react';
import { usePopup } from '@/hooks/usePopup';
import { useSettingsStore } from '@/stores/settingsStore';

interface PopupProps {
  children: React.ReactNode;
  popup: ReturnType<typeof usePopup>;
  className: string
}

const Popup: React.FC<PopupProps> = ({ children, popup, className }) => {
  const { isRTL } = useSettingsStore()
  
  if (!popup.isOpen) return null;

  return (
    <div
      className={`${className} fixed w-full h-full top-0 flex justify-center items-center bg-[#000000b2]`}
      onClick={popup.handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={popup.config.title ? 'popup-title' : undefined}
    >
      <div
        ref={popup.popupRef}
        className={`
          relative w-full md:max-w-150 h-screen md:max-h-max overflow-y-auto scrollbar- scroll-smooth
          bg-white md:rounded-lg shadow-xl border-2 ${popup.variantClasses}
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        tabIndex={-1}
        onKeyDown={popup.handleKeyDown}
      >
        {/* Header */}
        {(popup.config.title || popup.config.showCloseButton) && (
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""} p-4 border-b border-gray-200`}>
            {popup.config.title && (
              <h2
                id="popup-title"
                className={`md:text-[1rem] text-[0.9rem] ${popup.titleColorClasses}`}
              >
                {popup.config.title}
              </h2>
            )}
            {popup.config.showCloseButton && (
              <button
                onClick={popup.closePopup}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;