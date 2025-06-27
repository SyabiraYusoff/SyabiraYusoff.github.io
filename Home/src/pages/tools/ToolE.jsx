import FloatingButton from '../../components/FloatingButton';


export default function ToolE() {
    return (
        <div className="px-6 pt-6">
            <h1 className="text-2xl font-bold text-blue-900">Primary Analysis Setup Quick Start Guide</h1>

            <p className="text-sm text-gray-700 max-w-4xl">
                This tool is embedded from the original HTML version. It’s still password-protected via React and loads securely inside this app. <br />To share the external link to customer, copy the link from the link button on the top right corner of the page.
            </p>
            <iframe
                src="https://syabirayusoff.github.io/PrimaryPipelineSetup"
                title="RPM to Gb Calculator"
                className="w-[100%] h-[800px] border rounded shadow"
            ></iframe>

            <FloatingButton
                shareUrl="Cornertone Link"
                title="Tool E - Shareable Link"
            />
        </div>
    );
}
