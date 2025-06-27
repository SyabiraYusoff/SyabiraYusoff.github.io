import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toolMap } from '../data/toolsConfig';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = toolMap[toolId];
  const [inputPassword, setInputPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const saved = localStorage.getItem(`auth-${toolId}`);
    if (saved === tool?.password) {
      setAuthorized(true);
    }
  }, [toolId, tool?.password]);

  const handleAuth = () => {
  if (inputPassword === tool?.password) {
    localStorage.setItem(`auth-${toolId}`, inputPassword);
    setAuthorized(true);
    setError('');
  } else {
    setError('Incorrect password. Please try again.');
  }
};


  if (!tool) return <div>Tool not found</div>;

  if (!authorized) {
    return (
      <div className="max-w-sm mx-auto mt-12 p-4 border rounded shadow space-y-4">
        <h2 className="text-lg font-bold">Enter password for {tool.name}</h2>
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
      <h2 className="text-xl font-semibold mb-4">{tool.name}</h2>
      {/* Render the tool component if it exists */}
      {tool.component && (typeof tool.component === 'function' ? <tool.component /> : tool.component)}
    </div>
  );
}
