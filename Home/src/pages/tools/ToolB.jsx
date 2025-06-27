import FloatingButton from '../../components/FloatingButton';


export default function ToolB() {
  return (
    <div className="px-6 pt-6">
      <h1 className="text-2xl font-bold text-blue-900">Pool Indexed libraries and Pooling for Sequencing</h1>

      <p className="text-sm text-gray-700">
        This tool is embedded from the original HTML version. It’s still password-protected via React and loads securely inside this app. <br />To share the external link to customer, copy the link from the link button on the top right corner of the page.
      </p>

      <iframe
        src="https://syabirayusoff.github.io/sequencingCalculator"
        title="RPM to Gb Calculator"
        className="w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[800px] border rounded shadow"
      ></iframe>

      <FloatingButton
        shareUrl="cornerstone Link"
        title="Seq Calculator - Shareable Link"
      />
    </div>
  );
}
