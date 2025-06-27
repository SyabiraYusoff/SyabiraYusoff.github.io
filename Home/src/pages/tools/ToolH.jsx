import FloatingButton from '../../components/FloatingButton';


export default function ToolH() {
    return (
    <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-blue-900">Self-paced tutorial for Secondary Analysis</h1>
        <p className="text-sm text-gray-700">
        This tool is embedded from the original GitHub version. It’s still password-protected via React and loads securely inside this app. <br />To share the external link to customer, copy the link from the link button on the top right corner of the page.</p>
        
        <iframe src="https://analeigh-gui.github.io/single-cell-boot-camp/00_about.html"
        title="Tutorial 1"
        className="w-full h-[800px] border rounded shadow"></iframe>
        
        <FloatingButton shareUrl="Cornerstone link"
        title="Tool H - Shareable Link"/>
        
    </div> 
);
}
