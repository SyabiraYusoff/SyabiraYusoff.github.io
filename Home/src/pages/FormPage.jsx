import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formMap } from '../data/formsConfig';

export default function FormPage() {
  const { formId } = useParams();
  const form = formMap[formId];
  const [inputPassword, setInputPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const saved = localStorage.getItem(`auth-${formId}`);
    if (saved === form?.password) {
      setAuthorized(true);
    }
  }, [formId, form?.password]);

  const handleAuth = () => {
  if (inputPassword === form?.password) {
    localStorage.setItem(`auth-${formId}`, inputPassword);
    setAuthorized(true);
    setError('');
  } else {
    setError('Incorrect password. Please try again.');
  }
};


  if (!form) return <div>Form not found</div>;

  if (!authorized) {
    return (
      <div className="max-w-sm mx-auto mt-12 p-4 border rounded shadow space-y-4">
        <h2 className="text-lg font-bold">Enter password for {form.name}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAuth}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{form.name}</h2>
      {/* Render the tool component if it exists */}
      {form.component && (typeof form.component === 'function' ? <form.component /> : form.component)}
    </div>
  );
}
