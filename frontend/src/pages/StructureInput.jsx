// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios
// import '../styles/styles_structure_input.css';
// import TrussVisualizer from '../components/TrussVisualizer';

// const StructureInput = () => {
//     const [nodeX, setNodeX] = useState('');
//     const [nodeY, setNodeY] = useState('');
//     const [nodeZ, setNodeZ] = useState('');
//     const [nodes, setNodes] = useState([]);
//     const [startNode, setStartNode] = useState('');
//     const [endNode, setEndNode] = useState('');
//     const [elements, setElements] = useState([]);
//     const [supports, setSupports] = useState({});



//     // Fetch nodes and elements when the component loads
//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/nodes/')
//             .then(response => setNodes(response.data))
//             .catch(error => console.error('Error fetching nodes:', error));

//         axios.get('http://127.0.0.1:8000/api/elements/')
//             .then(response => setElements(response.data))
//             .catch(error => console.error('Error fetching elements:', error));
//     }, []);

    

//     // Add a Node to the Backend
//     const handleAddNode = async () => {
//         if (nodeX !== '' && nodeY !== '' && nodeZ !== '') {
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/api/nodes/', {
//                     x: parseFloat(nodeX),
//                     y: parseFloat(nodeY),
//                     z: parseFloat(nodeZ),
//                 });

//                 setNodes([...nodes, response.data]); // Update UI
//                 setNodeX('');
//                 setNodeY('');
//                 setNodeZ('');
//             } catch (error) {
//                 console.error("Error adding node:", error);
//                 alert("Failed to add node.");
//             }
//         }
//     };

//     // 🔥 New: Delete Node
//     const handleDeleteNode = async (nodeId) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}/`);
//             setNodes(nodes.filter(node => node.id !== nodeId)); // Remove node from UI
//         } catch (error) {
//             console.error("Error deleting node:", error);
//         }
//     };

//     // Add a Truss Element to the Backend
//     const handleAddElement = async () => {
//         if (startNode !== '' && endNode !== '' && startNode !== endNode) {
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/api/elements/', {
//                     start_node: parseInt(startNode),
//                     end_node: parseInt(endNode),
//                 });

//                 setElements([...elements, response.data]); // Update UI
//                 setStartNode('');
//                 setEndNode('');
//             } catch (error) {
//                 console.error("Error adding element:", error);
//                 alert("Failed to add element.");
//             }
//         }
//     };

//     // 🔥 New: Delete Element
//     const handleDeleteElement = async (elementId) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/elements/${elementId}/`);
//             setElements(elements.filter(element => element.id !== elementId)); // Remove element from UI
//         } catch (error) {
//             console.error("Error deleting element:", error);
//         }
//     };

//     return (
//         <div className="structure-container">
//             <div className="flex-container">
//                 {/* Input Section */}
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
//                         {nodes.map((node, index) => (
//                             <li key={node.id}>Node {index + 1}: (X: {node.x}, Y: {node.y}, Z: {node.z})
//                             <button onClick={() => handleDeleteNode(node.id)}>❌ Delete</button>
//                             </li>
//                         ))}
//                     </ul>

//                     <h2>🔗 Define Truss Elements</h2>
//                     <div className="input-group">
//                         <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
//                             <option value="">Select Start Node</option>
//                             {nodes.map((node, index) => (
//                                 <option key={node.id} value={node.id}>
//                                     Node {index + 1}
//                                 </option>
//                             ))}
//                         </select>

//                         <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
//                             <option value="">Select End Node</option>
//                             {nodes.map((node, index) => (
//                                 <option key={node.id} value={node.id}>
//                                     Node {index + 1}
//                                 </option>
//                             ))}
//                         </select>

//                         <button onClick={handleAddElement}>➕ Add Element</button>
//                     </div>

//                     <h3>📌 Truss Elements</h3>
//                     <ul>
//                         {elements.map((element, index) => {
//                             const startNodeIndex = nodes.findIndex(node => node.id === element.start_node);
//                             const endNodeIndex = nodes.findIndex(node => node.id === element.end_node);


//                             <li key={element.id}>
//                                 Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
//                                 <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
//                             </li>


//                             return (
//                                 <li key={element.id}>
//                                     {/* Show consecutive numbering instead of database IDs */}
//                                     Element {index + 1}: 
//                                     Node {startNodeIndex !== -1 ? startNodeIndex + 1 : "?"} ➝ 
//                                     Node {endNodeIndex !== -1 ? endNodeIndex + 1 : "?"}
//                                     <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>

//                 {/* Visualization Section */}
//                 <div className="visualization-section">
//                     <h2>🌐 3D Truss Visualization</h2>
//                     <TrussVisualizer nodes={nodes} elements={elements} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StructureInput;














import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../styles/styles_structure_input.css';
import TrussVisualizer from '../components/TrussVisualizer';

const supportTypes = ['fixed', 'pinned', 'roller', 'guided', 'sliding', 'spring'];

const StructureInput = () => {
    const [nodeX, setNodeX] = useState('');
    const [nodeY, setNodeY] = useState('');
    const [nodeZ, setNodeZ] = useState('');
    const [nodes, setNodes] = useState([]);
    const [supports, setSupports] = useState({});
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [elements, setElements] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/nodes/')
            .then(response => setNodes(response.data))
            .catch(error => console.error('Error fetching nodes:', error));

        axios.get('http://127.0.0.1:8000/api/elements/')
            .then(response => setElements(response.data))
            .catch(error => console.error('Error fetching elements:', error));

        axios.get('http://127.0.0.1:8000/api/supports/')
            .then(response => setSupports(response.data))
            .catch(error => console.error('Error fetching supports:', error));
    }, []);

    const handleAddNode = async () => {
        if (nodeX !== '' && nodeY !== '' && nodeZ !== '') {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nodes/', {
                    x: parseFloat(nodeX),
                    y: parseFloat(nodeY),
                    z: parseFloat(nodeZ),
                });
                setNodes([...nodes, response.data]);
                setNodeX('');
                setNodeY('');
                setNodeZ('');
            } catch (error) {
                console.error("Error adding node:", error);
                alert("Failed to add node.");
            }
        }
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}/`);
            setNodes(nodes.filter(node => node.id !== nodeId));
        } catch (error) {
            console.error("Error deleting node:", error);
        }
    };

    const handleAddElement = async () => {
        if (startNode !== '' && endNode !== '' && startNode !== endNode) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/elements/', {
                    start_node: parseInt(startNode),
                    end_node: parseInt(endNode),
                });
                setElements([...elements, response.data]);
                setStartNode('');
                setEndNode('');
            } catch (error) {
                console.error("Error adding element:", error);
                alert("Failed to add element.");
            }
        }
    };

    const handleDeleteElement = async (elementId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/elements/${elementId}/`);
            setElements(elements.filter(element => element.id !== elementId));
        } catch (error) {
            console.error("Error deleting element:", error);
        }
    };

    const handleAddSupport = async (nodeId, supportType) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/supports/', {
                node: nodeId,
                type: supportType
            });
            setSupports({ ...supports, [nodeId]: supportType });
        } catch (error) {
            console.error("Error adding support:", error);
        }
    };

    return (
        <div className="structure-container">
            <div className="flex-container">
                <div className="input-section">
                    <h2>🔧 Define 3D Truss Nodes</h2>
                    <div className="input-group">
                        <input type="number" placeholder="X" value={nodeX} onChange={(e) => setNodeX(e.target.value)} />
                        <input type="number" placeholder="Y" value={nodeY} onChange={(e) => setNodeY(e.target.value)} />
                        <input type="number" placeholder="Z" value={nodeZ} onChange={(e) => setNodeZ(e.target.value)} />
                        <button onClick={handleAddNode}>➕ Add Node</button>
                    </div>
                    
                    <h3>📌 Nodes List & Supports</h3>
                    <ul>
                        {nodes.map((node) => (
                            <li key={node.id}>
                                Node {node.id}: (X: {node.x}, Y: {node.y}, Z: {node.z}) 
                                <button onClick={() => handleDeleteNode(node.id)}>❌ Delete</button>
                                <select onChange={(e) => handleAddSupport(node.id, e.target.value)}>
                                    <option value="">Select Support</option>
                                    {supportTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {supports[node.id] && <span> 🏗 {supports[node.id]}</span>}
                            </li>
                        ))}
                    </ul>
                    
                    <h2>🔗 Define Truss Elements</h2>
                    <div className="input-group">
                        <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
                            <option value="">Select Start Node</option>
                            {nodes.map((node) => (
                                <option key={node.id} value={node.id}>Node {node.id}</option>
                            ))}
                        </select>

                        <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
                            <option value="">Select End Node</option>
                            {nodes.map((node) => (
                                <option key={node.id} value={node.id}>Node {node.id}</option>
                            ))}
                        </select>

                        <button onClick={handleAddElement}>➕ Add Element</button>
                    </div>

                    <h3>📌 Truss Elements</h3>
                    <ul>
                        {elements.map((element) => (
                            <li key={element.id}>
                                Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
                                <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="visualization-section">
                    <h2>🌐 3D Truss Visualization</h2>
                    <TrussVisualizer nodes={nodes} elements={elements} supports={supports} />
                </div>
            </div>
        </div>
    );
};

export default StructureInput;








