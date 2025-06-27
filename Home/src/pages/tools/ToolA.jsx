
export default function ToolA() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">Calculate Reads Needed by Assays and Convert to Gb</h1>

      <p className="text-sm text-gray-700">
        This tool is embedded from the original HTML version. It’s still password-protected via React and loads securely inside this app. <br />This tool is not available for external user.
      </p>

      <iframe
        src="https://syabirayusoff.bitbucket.io/simplifiedSequencingCalculator"
        title="RPM to Gb Calculator"
        className="w-full h-[800px] border rounded shadow"
      ></iframe>
    </div>
  );
}
