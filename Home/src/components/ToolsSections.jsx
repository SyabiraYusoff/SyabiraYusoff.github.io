// src/components/ToolsSection.jsx
import { toolMap } from '../data/toolsConfig';

export default function ToolsSection({ activeRole }) {
    const toolsForRole = Object.entries(toolMap)
        .filter(([_, config]) => config.roles.includes(activeRole))
        .map(([id, config]) => ({
            id,
            name: config.name,
        }));
    
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {toolsForRole.length === 0 ? (
                <p className="text-gray-500">No tools available for this role.</p>
            ) : (toolsForRole.map((tool) => {
                const fullUrl = `${window.location.origin}/tool/${tool.id}`;
                const ToolComponent = tool.component;
                return (
                    <div key={tool.id}
                        className="p-4 border rounded-lg shadow hover:bg-gray-50 space-y-2">
                        <h2 className="text-lg font-semibold">{tool.name}</h2>
                        <div className="flex gap-2 mb-2">
                            <a href={`/tool/${tool.id}`} 
                                className="text-blue-600 underline text-sm" target="_blank" rel="noopener noreferrer">
                                Open
                            </a>
                            <button onClick={() => navigator.clipboard.writeText(fullUrl)}
                                className="text-sm text-gray-500 hover:text-gray-700">
                                Copy External Link
                            </button>
                        </div>
                        {ToolComponent && (
                            <div className="mt-2">
                                <ToolComponent />
                            </div>
                        )}
                    </div>
                );
            })
            )}
        </div>
    );
}