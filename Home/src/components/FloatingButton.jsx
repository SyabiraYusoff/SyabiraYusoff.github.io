import { useState } from 'react';

export default function FloatingButton({ shareUrl, title = "Share Tool" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-900 text-white rounded-full w-12 h-12 shadow-lg hover:bg-blue-700 text-xl"
          title="External Link to Share Tool">
            🔗
        </button>
        {/* Tooltip */}
        <div className="absolute top-14 right-1/2 translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          External Link
        </div>
      </div>
      {open && (
        <div className="fixed top-20 right-4 bg-white shadow-lg border rounded p-4 w-72 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-blue-900 font-semibold">{title}</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-500 text-sm font-bold"
              title="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            You can share this tool using the link below for Cornerstone users:
          </p>
          <div className="bg-gray-100 rounded px-2 py-1 text-xs font-mono truncate mb-2">
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="bg-blue-900 text-white px-3 py-1 rounded text-sm"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}