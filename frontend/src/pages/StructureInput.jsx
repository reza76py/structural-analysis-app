import React, { useState } from 'react';
import '../styles/styles_structure_input.css';
import TrussVisualizer from '../components/TrussVisualizer';


const StructureInput = () => {
    const [nodeX, setNodeX] = useState('');
    const [nodeY, setNodeY] = useState('');
    const [nodeZ, setNodeZ] = useState('');
    const [nodes, setNodes] = useState([]);
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [elements, setElements] = useState([]);

    // Add a Node
    const handleAddNode = () => {
        if (nodeX !== '' && nodeY !== '' && nodeZ !== '') {
            setNodes([...nodes, { id: nodes.length + 1, x: nodeX, y: nodeY, z: nodeZ }]);
            setNodeX('');
            setNodeY('');
            setNodeZ('');
        }
    };

    // Add a Truss Element (Connection)
    const handleAddElement = () => {
        if (startNode !== '' && endNode !== '' && startNode !== endNode) {
            setElements([...elements, { id: elements.length + 1, start: startNode, end: endNode }]);
            setStartNode('');
            setEndNode('');
        }
    };

    return (
        <div className="structure-container">
            {/* Flex Container */}
            <div className="flex-container">
                {/* Inputs Section */}
                <div className="input-section">
                    <h2>🔧 Define 3D Truss Nodes</h2>
                    <div className="input-group">
                        <input type="number" placeholder="X" value={nodeX} onChange={(e) => setNodeX(e.target.value)} />
                        <input type="number" placeholder="Y" value={nodeY} onChange={(e) => setNodeY(e.target.value)} />
                        <input type="number" placeholder="Z" value={nodeZ} onChange={(e) => setNodeZ(e.target.value)} />
                        <button onClick={handleAddNode}>➕ Add Node</button>
                    </div>

                    <h3>📌 Nodes List</h3>
                    <ul>
                        {nodes.map((node) => (
                            <li key={node.id}>Node {node.id}: (X: {node.x}, Y: {node.y}, Z: {node.z})</li>
                        ))}
                    </ul>

                    <h2>🔗 Define Truss Elements</h2>
                    <div className="input-group">
                        <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
                            <option value="">Select Start Node</option>
                            {nodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    Node {node.id}
                                </option>
                            ))}
                        </select>

                        <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
                            <option value="">Select End Node</option>
                            {nodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    Node {node.id}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleAddElement}>➕ Add Element</button>
                    </div>

                    <h3>📌 Truss Elements</h3>
                    <ul>
                        {elements.map((element) => (
                            <li key={element.id}>
                                Element {element.id}: Node {element.start} ➝ Node {element.end}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3D Visualization Section */}
                <div className="visualization-section">
                    <h2>🌐 3D Truss Visualization</h2>
                    <TrussVisualizer nodes={nodes} elements={elements} />
                </div>
            </div>
        </div>
    );
};

export default StructureInput;














// import React, { useState, useEffect } from 'react';
// import '../styles/styles_structure_input.css';
// import TrussVisualizer from '../components/TrussVisualizer';
// import { fetchNodes, addNode, fetchElements, addElement } from '../api';

// const StructureInput = () => {
//     const [nodeX, setNodeX] = useState('');
//     const [nodeY, setNodeY] = useState('');
//     const [nodeZ, setNodeZ] = useState('');
//     const [nodes, setNodes] = useState([]);
//     const [startNode, setStartNode] = useState('');
//     const [endNode, setEndNode] = useState('');
//     const [elements, setElements] = useState([]);

//     // Load nodes & elements from Django when the component mounts
//     useEffect(() => {
//         fetchNodes().then(setNodes);
//         fetchElements().then(setElements);
//     }, []);

//     // Add a Node
//     const handleAddNode = async () => {
//         if (nodeX !== '' && nodeY !== '' && nodeZ !== '') {
//             try {
//                 const newNode = await addNode({
//                     x: parseFloat(nodeX),
//                     y: parseFloat(nodeY),
//                     z: parseFloat(nodeZ),
//                 });
    
//                 console.log("New node added:", newNode);  // ✅ Debugging log
//                 setNodes([...nodes, newNode]);  // ✅ Add new node to state
//                 setNodeX('');
//                 setNodeY('');
//                 setNodeZ('');
//             } catch (error) {
//                 console.error("Error adding node:", error);  // ✅ Log error
//                 alert("Failed to add node. Check console for details.");
//             }
//         }
//     };
    

//     // Add a Truss Element (Connection)
//     const handleAddElement = async () => {
//         if (startNode !== '' && endNode !== '' && startNode !== endNode) {
//             const newElement = await addElement({ start_node: parseInt(startNode), end_node: parseInt(endNode) });
//             setElements([...elements, newElement]);  // Update state with the new element
//             setStartNode('');
//             setEndNode('');
//         }
//     };

//     return (
//         <div className="structure-container">
//             {/* Flex Container */}
//             <div className="flex-container">
//                 {/* Inputs Section */}
//                 <div className="input-section">
//                     <h2>🔧 Define 3D Truss Nodes</h2>
//                     <div className="input-group">
//                         <input type="number" placeholder="X" value={nodeX} onChange={(e) => setNodeX(e.target.value)} />
//                         <input type="number" placeholder="Y" value={nodeY} onChange={(e) => setNodeY(e.target.value)} />
//                         <input type="number" placeholder="Z" value={nodeZ} onChange={(e) => setNodeZ(e.target.value)} />
//                         <button onClick={handleAddNode}>➕ Add Node</button>
//                     </div>

//                     <h3>📌 Nodes List</h3>
//                     <ul>
//                         {nodes.map((node) => (
//                             <li key={node.id}>Node {node.id}: (X: {node.x}, Y: {node.y}, Z: {node.z})</li>
//                         ))}
//                     </ul>

//                     <h2>🔗 Define Truss Elements</h2>
//                     <div className="input-group">
//                         <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
//                             <option value="">Select Start Node</option>
//                             {nodes.map((node) => (
//                                 <option key={node.id} value={node.id}>
//                                     Node {node.id}
//                                 </option>
//                             ))}
//                         </select>

//                         <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
//                             <option value="">Select End Node</option>
//                             {nodes.map((node) => (
//                                 <option key={node.id} value={node.id}>
//                                     Node {node.id}
//                                 </option>
//                             ))}
//                         </select>

//                         <button onClick={handleAddElement}>➕ Add Element</button>
//                     </div>

//                     <h3>📌 Truss Elements</h3>
//                     <ul>
//                         {elements.map((element) => (
//                             <li key={element.id}>
//                                 Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* 3D Visualization Section */}
//                 <div className="visualization-section">
//                     <h2>🌐 3D Truss Visualization</h2>
//                     <TrussVisualizer nodes={nodes} elements={elements} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StructureInput;
