
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
    tone: "professional",
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
      if (result.length === 0) throw new Error("Could not generate messages");
      setMessages(result);
      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("Failed to connect. Please check your internet and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 selection:bg-green-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight sm:text-5xl">
            WhatsApp <span className="text-green-600">Deal Closer</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Professional solutions for every sales problem. Select your situation and get 3 solid, gender-neutral messages instantly.
          </p>
        </div>

        <InputForm 
          inputs={inputs} 
          setInputs={setInputs} 
          onGenerate={handleGenerate} 
          isLoading={loading} 
        />

        {error && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-100 text-red-700 rounded-2xl text-center font-bold animate-bounce">
            ⚠️ {error}
          </div>
        )}

        {messages.length > 0 && !loading && (
          <div className="mt-16 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-6">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                Closing Sequence Ready
              </h3>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
            </div>

            <div className="space-y-8">
              {messages.map((msg, idx) => (
                <MessageCard 
                  key={msg.id} 
                  text={msg.text} 
                  stepName={msg.stepName || `Message ${idx + 1}`}
                  index={idx} 
                />
              ))}
            </div>

            <div className="bg-green-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-green-200 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.77l-6.18 3.25L7 12.14l-5-4.87 6.91-1.01L12 0z"/></svg>
              </div>
              <div className="text-4xl bg-white/20 p-4 rounded-full flex-shrink-0 backdrop-blur-sm">💡</div>
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-2">Strategy Tip</h4>
                <p className="text-green-50 leading-relaxed font-medium">
                  Ye messages gender-neutral aur professional hain. Inka tone authoritative hai. Behtareen results ke liye inhe 24 hours ke interval par ek-ek karke bheje.
                </p>
              </div>
            </div>
          </div>
        )}

        {messages.length === 0 && !loading && (
          <div className="mt-20 flex flex-col items-center">
            <div className="p-8 bg-gray-50 border border-dashed border-gray-300 rounded-[2rem] text-center max-w-sm">
              <div className="text-gray-300 text-6xl mb-4">💬</div>
              <p className="text-gray-400 font-bold text-sm tracking-wide">
                Select your problem above to generate high-converting follow-ups.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-12 text-center text-gray-400 text-xs font-black uppercase tracking-widest">
        Made for Indian Businesses • Professional • Neutral • Solid 🇮🇳
      </footer>
    </div>
  );
};

export default App;
