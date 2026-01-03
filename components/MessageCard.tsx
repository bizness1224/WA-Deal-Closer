
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
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all group flex gap-4">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        {index < 2 && <div className="w-0.5 flex-1 bg-green-50 my-2"></div>}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{stepName}</h4>
            <span className="text-[10px] text-gray-400 font-medium">IDEAL FOR MESSAGE {index + 1}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Copy"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
          {text}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all"
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
