
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import MessageCard from './components/MessageCard';
import { FollowUpInputs, CustomerType, ProblemType, ProductCategory, GeneratedMessage } from './types';
import { generateWebinarFollowUps } from './services/geminiService';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<FollowUpInputs>({
    productCategory: ProductCategory.ONLINE_COURSE,
    problem: ProblemType.NO_REPLY,
    customerType: CustomerType.WORKING_PROFESSIONAL,
    tone: "friendly",
    language: "Hinglish"
  });

  const [messages, setMessages] = useState<GeneratedMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateWebinarFollowUps(inputs);
      setMessages(result);
    } catch (err) {
      setError("Server connection failed. Please check your internet and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            WhatsApp <span className="text-green-600">Deal Closer</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Ab koi lead waste nahi hogi. Select problem, and get 3 solid messages to help you close your clients.
          </p>
        </div>

        <InputForm 
          inputs={inputs} 
          setInputs={setInputs} 
          onGenerate={handleGenerate} 
          isLoading={loading} 
        />

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {messages.length > 0 && !loading && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200"></div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Your 3-Step Closing Sequence
              </h3>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <MessageCard 
                  key={msg.id} 
                  text={msg.text} 
                  stepName={msg.stepName || `Message ${idx + 1}`}
                  index={idx} 
                />
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-green-50 shadow-sm flex items-start gap-4">
              <div className="text-2xl bg-green-100 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">🚀</div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1 text-lg">Closing Tip</h4>
                <p className="text-gray-600 leading-relaxed">
                  Ye messages solid results ke liye design kiye gaye hain. First message send karke 12-24 hours ka gap rakhen messages ke beech me better results ke liye.
                </p>
              </div>
            </div>
          </div>
        )}

        {messages.length === 0 && !loading && (
          <div className="mt-16 text-center space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 text-green-700 rounded-full text-sm font-bold shadow-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
              All Scenarios Ready to Close
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-10 text-center text-gray-400 text-sm font-medium">
        Empowering Desi Businesses to Close More Deals 🇮🇳
      </footer>
    </div>
  );
};

export default App;
