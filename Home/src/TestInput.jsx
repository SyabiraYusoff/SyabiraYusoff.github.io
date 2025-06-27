import { useState } from 'react';

export default function TestInput() {
  const [data, setData] = useState({
    cellNumber: '',
    abseqplexity: '',
    phixPercentage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const cellNum = parseFloat(data.cellNumber) || 0;
    const abseq = parseFloat(data.abseqplexity) || 0;
    const phix = parseFloat(data.phixPercentage) || 0;

    console.log("Calculating with:", { cellNum, abseq, phix });
  };

  return (
    <div className="p-8 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-blue-900">Test: SeqCalculator Inputs</h1>

      <InputField
        label="Total Cell Number"
        name="cellNumber"
        value={data.cellNumber}
        onChange={handleChange}
      />
      <InputField
        label="AbSeq Plexity"
        name="abseqplexity"
        value={data.abseqplexity}
        onChange={handleChange}
      />
      <InputField
        label="PhiX Percentage"
        name="phixPercentage"
        value={data.phixPercentage}
        onChange={handleChange}
      />

      <button
        onClick={handleCalculate}
        className="bg-blue-900 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-blue-800">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        inputMode="numeric"
        className="w-full border border-blue-900 px-2 py-1 rounded"
      />
    </div>
  );
}
