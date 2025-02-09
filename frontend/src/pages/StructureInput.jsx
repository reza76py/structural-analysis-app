import React, { useState } from 'react';
import '../styles/styles_structure_input.css'; // Import CSS

const StructureInput = () => {
    const [nodeX, setNodeX] = useState('');
    const [nodeY, setNodeY] = useState('');
    const [nodeZ, setNodeZ] = useState('');
    const [nodes, setNodes] = useState([]);

    const handleAddNode = () => {
        if (nodeX !== '' && nodeY !== '') {
            setNodes([...nodes, { x: nodeX, y: nodeY, z: nodeZ || '0' }]);
            setNodeX('');
            setNodeY('');
            setNodeZ('');
        }
    };

    return (
        <div className="structure-container">
            <h2>🔧 Define Structural Nodes</h2>
            <div className="input-group">
                <input 
                    type="number" placeholder="X Coordinate" 
                    value={nodeX} onChange={(e) => setNodeX(e.target.value)}
                />
                <input 
                    type="number" placeholder="Y Coordinate" 
                    value={nodeY} onChange={(e) => setNodeY(e.target.value)}
                />
                <input 
                    type="number" placeholder="Z Coordinate" 
                    value={nodeZ} onChange={(e) => setNodeZ(e.target.value)}
                />
                <button onClick={handleAddNode}>➕ Add Node</button>
            </div>

            <h3>📌 Nodes List</h3>
            <ul>
                {nodes.map((node, index) => (
                    <li key={index}>
                        Node {index + 1}: (X: {node.x}, Y: {node.y}, Z: {node.z})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StructureInput;
