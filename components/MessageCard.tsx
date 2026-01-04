
import React, { useState } from 'react';

interface MessageCardProps {
  text: string;
  stepName: string;
  index: number;
}

const MessageCard: React.FC<MessageCardProps> = ({ text, stepName, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleShare = () => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full">
              STEP {index + 1}
            </span>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stepName}</h4>
          </div>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-400 hover:text-green-600'}`}
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            )}
          </button>
        </div>

        <div className="bg-[#E7FEDE] p-5 rounded-2xl relative shadow-inner border border-green-100/50">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base font-medium">
            {text}
          </p>
          <div className="flex justify-end mt-2">
            <span className="text-[10px] text-green-700/60 font-bold uppercase">Ready to send • 09:41 PM ✓✓</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold border transition-all ${
              copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-600'
            }`}
          >
            {copied ? "Copied to Clipboard" : "Copy Message"}
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
