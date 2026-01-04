
import React from 'react';
import { FollowUpInputs, CustomerType, ProblemType, ProductCategory } from '../types';

interface InputFormProps {
  inputs: FollowUpInputs;
  setInputs: React.Dispatch<React.SetStateAction<FollowUpInputs>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, setInputs, onGenerate, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const selectClasses = "w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all cursor-pointer text-gray-700 font-medium shadow-sm appearance-none";
  const labelClasses = "block text-sm font-bold text-gray-600 mb-2 ml-1";

  const customSelectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '1.2em'
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
      <div className="space-y-4">
        <label className="block text-xl font-extrabold text-gray-800">
          What is the main problem?
        </label>
        <select 
          name="problem"
          value={inputs.problem}
          onChange={handleChange}
          className="w-full px-5 py-5 bg-green-50 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all text-green-900 font-bold appearance-none cursor-pointer shadow-sm"
          style={customSelectStyle}
        >
          {Object.values(ProblemType).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Business Category</label>
          <select name="productCategory" value={inputs.productCategory} onChange={handleChange} className={selectClasses} style={customSelectStyle}>
            {Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Target Audience</label>
          <select name="customerType" value={inputs.customerType} onChange={handleChange} className={selectClasses} style={customSelectStyle}>
            {Object.values(CustomerType).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Preferred Language</label>
          <select name="language" value={inputs.language} onChange={handleChange} className={selectClasses} style={customSelectStyle}>
            <option value="Hinglish">Hinglish (Mixed)</option>
            <option value="English">English</option>
            <option value="Hindi">Pure Hindi</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Message Tone</label>
          <select name="tone" value={inputs.tone} onChange={handleChange} className={selectClasses} style={customSelectStyle}>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="confident">Confident</option>
            <option value="calm">Calm</option>
          </select>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-200 text-xl active:scale-[0.98] transform"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Scenario...
          </>
        ) : "Generate 3 Ready Messages"}
      </button>
    </div>
  );
};

export default InputForm;
