// src/components/ToolsSection.jsx
import { formMap } from '../data/formsConfig';

export default function FormsSection({ activeRole }) {
    const formsForRole = Object.entries(formMap)
        .filter(([_, config]) => config.roles.includes(activeRole))
        .map(([id, config]) => ({
            id,
            name: config.name,
        }));
    
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {formsForRole.length === 0 ? (
                <p className="text-gray-500">No forms available for this role.</p>
            ) : (formsForRole.map((form) => {
                const fullUrl = `${window.location.origin}/forms/${form.id}`;
                const FormComponent = form.component;
                return (
                    <div key={form.id}
                        className="p-4 border rounded-lg shadow hover:bg-gray-50 space-y-2">
                        <h2 className="text-lg font-semibold">{form.name}</h2>
                        <div className="flex gap-2 mb-2">
                            <a href={`/form/${form.id}`} 
                                className="text-blue-600 underline text-sm" target="_blank" rel="noopener noreferrer">
                                Open
                            </a>
                            <button onClick={() => navigator.clipboard.writeText(fullUrl)}
                                className="text-sm text-gray-500 hover:text-gray-700">
                                Copy External Link
                            </button>
                        </div>
                        {FormComponent && (
                            <div className="mt-2">
                                <FormComponent />
                            </div>
                        )}
                    </div>
                );
            })
            )}
        </div>
    );
}