export default function RoleSidebar({ role, onSelect }) {
    const navItemsByRole = {
    Architect: ['Tools', 'Forms', 'Resources', 'Update'],
    FAS: ['Tools', 'Resources', 'Forms'],
    Bioinformatics: ['Tools', 'Forms', 'Resources', 'Scripts'],
    'Project Management': ['Tools', 'Forms'],
};

{/* if theres no role, return an empty array */}
const items = navItemsByRole[role] || [];

return (
    <aside className="w-48 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Menu</h3>
        {items.map((label) => (
        <button
        key={label} 
        onClick={() => onSelect(label)}
        className="block text-left w-full px-2 py-1 rounded hover:bg-blue-100">{label}
        </button>
    ))}
    </aside>
    );
}