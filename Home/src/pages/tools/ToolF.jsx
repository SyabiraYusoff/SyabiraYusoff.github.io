import { useState } from 'react';

export default function ToolF() {
    const [iframeLoading, setIframeLoading] = useState(true);
    return (
        <div className="px-6 pt-6">
            <h1 className="text-2xl font-bold text-blue-900">Project Dashboard</h1>

            <p className="text-sm text-gray-700">
                This tool is embedded from the original Shiny App. It’s still password-protected via React and loads securely inside this app.
            </p>

                {iframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                )}

                <iframe
                    src="https://s6iko8-syabira-yusoff.shinyapps.io/dashboard/"
                    title="Dashboard"
                    className="w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[800px] rounded border shadow"
                    onLoad={() => setIframeLoading(false)}
                ></iframe>
            </div>
    );
}
