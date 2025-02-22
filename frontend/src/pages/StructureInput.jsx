import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../styles/styles_structure_input.css';
import TrussVisualizer from '../components/TrussVisualizer';

// 🔴🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜ //

const StructureInput = () => {
    const [nodeX, setNodeX] = useState(''); // 🔴 //
    const [nodeY, setNodeY] = useState(''); // 🟡 //
    const [nodeZ, setNodeZ] = useState(''); // 🟢 //
    const [nodes, setNodes] = useState([]); // 🔵 //
    const [supports, setSupports] = useState({});   // 🟣 //
    const [startNode, setStartNode] = useState(''); // 🟤 // 
    const [endNode, setEndNode] = useState(''); //⚫ // 
    const [elements, setElements] = useState([]);   // ⚪ //
    const [nodeConstraints, setNodeConstraints] = useState({}); // Store constraints for each node
    const [memberLengths, setMemberLengths] = useState([]); // 🟧 //


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/nodes/')   // 🔵 //
            .then(response => setNodes(response.data))  // 🔵 //
            .catch(error => console.error('Error fetching nodes:', error)); // 🔵 //

        axios.get('http://127.0.0.1:8000/api/elements/')    // ⚪ //
            .then(response => setElements(response.data))   // ⚪ //
            .catch(error => console.error('Error fetching elements:', error));  // ⚪ //

        axios.get('http://127.0.0.1:8000/api/supports/')    // 🟣 //
            .then(response => setSupports(response.data))   // 🟣 //
            .catch(error => console.error('Error fetching supports:', error));  // 🟣 //
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/member_lengths/')  // ✅ Fetch member lengths
            .then(response => setMemberLengths(response.data.member_lengths))
            .catch(error => console.error('Error fetching member lengths:', error));
    }, []);
    

    const handleAddNode = async () => {
        if (nodeX !== '' && nodeY !== '' && nodeZ !== '') { // 🔴 // 🟡 //  🟢 //
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nodes/', { // 🔵 //
                    x: parseFloat(nodeX),   // 🔴 //
                    y: parseFloat(nodeY),   // 🟡 //
                    z: parseFloat(nodeZ),   // 🟢 //
                });
                setNodes([...nodes, response.data]); // 🔵 //
                setNodeX('');   // 🔴 //
                setNodeY('');   // 🟡 //
                setNodeZ('');   // 🟢 //
            } catch (error) {
                console.error("Error adding node:", error);
                alert("Failed to add node.");
            }
        }
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}/`);   // 🔵 //
            setNodes(nodes.filter(node => node.id !== nodeId)); // 🔵 //
            setNodeConstraints((prev) => {
                const newConstraints = { ...prev };
                delete newConstraints[nodeId];
                return newConstraints;
            });
        } catch (error) {
            console.error("Error deleting node:", error);
        }
    };

    const handleAddElement = async () => {
        if (startNode !== '' && endNode !== '' && startNode !== endNode) { // 🟤  //⚫ //
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/elements/', {   // ⚪ //
                    start_node: parseInt(startNode),    // 🟤 //
                    end_node: parseInt(endNode),    // ⚫ //
                });
                setElements([...elements, response.data]);  // ⚪ //
                setStartNode('');   // 🟤 //
                setEndNode('');    // ⚫ //
            } catch (error) {
                console.error("Error adding element:", error);
                alert("Failed to add element.");
            }
        }
    };

    const handleDeleteElement = async (elementId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/elements/${elementId}/`);  // ⚪ //
            setElements(elements.filter(element => element.id !== elementId));  // ⚪ //
        } catch (error) {
            console.error("Error deleting element:", error);
        }
    };

    const handleAddSupport = async (nodeId, supportType) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/supports/', {   // 🟣 //
                node: nodeId,
                type: supportType
            });
            setSupports((prev) => ({    // 🟣 //
                ...prev,
                [nodeId]: supportType,
            }));
        } catch (error) {
            console.error("Error adding support:", error);
        }
    };


    

    const handleToggleConstraint = (nodeId, constraint) => {
        setNodeConstraints((prev) => ({
            ...prev,
            [nodeId]: {
                ...prev[nodeId],
                [constraint]: !prev[nodeId]?.[constraint], // Toggle value
            },
        }));
    };

    const getNdofLabel = (nodeId) => {
        const constraints = nodeConstraints[nodeId] || {};
        const numConstraints = Object.values(constraints).filter(Boolean).length;
        return 6 - numConstraints * 2; // Each constraint reduces NDOF by 2
    };

    return (
        <div className="structure-container">
            <div className="flex-container">
                <div className="input-section">
                    <h2>🔧 Define 3D Truss Nodes</h2>   
                    <div className="input-group">
                        <input type="number" placeholder="X" value={nodeX} onChange={(e) => setNodeX(e.target.value)} />    {/* 🔴 */}
                        <input type="number" placeholder="Y" value={nodeY} onChange={(e) => setNodeY(e.target.value)} />   {/* 🟡 */}
                        <input type="number" placeholder="Z" value={nodeZ} onChange={(e) => setNodeZ(e.target.value)} />    {/* 🟢 */}
                        <button onClick={handleAddNode}>➕ Add Node</button>
                    </div>

                    <h3>📌 Nodes List & Supports</h3>
                    <ul>
                        {nodes.map((node) => ( // 🔵 //
                            <li key={node.id}>
                                Node {node.id}: (X: {node.x}, Y: {node.y}, Z: {node.z}) 
                                <button onClick={() => handleDeleteNode(node.id)}>❌ Delete</button>

                                {supports[node.id] && <span> 🏗 {supports[node.id]}</span>} {/*// 🟣 //*/}

                                {/* Checkboxes for Constraints */}
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={nodeConstraints[node.id]?.Rx || false}
                                            onChange={() => handleToggleConstraint(node.id, "Rx")}
                                        /> Rx (Restrict X)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={nodeConstraints[node.id]?.Ry || false}
                                            onChange={() => handleToggleConstraint(node.id, "Ry")}
                                        /> Ry (Restrict Y)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={nodeConstraints[node.id]?.Rz || false}
                                            onChange={() => handleToggleConstraint(node.id, "Rz")}
                                        /> Rz (Restrict Z)
                                    </label>
                                </div>

                                <span> 🔧 NDOF: {getNdofLabel(node.id)}</span>
                            </li>
                        ))}
                    </ul>






                    <h2>🔗 Define Truss Elements</h2>
                    <div className="input-group">
                        <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
                            <option value="">Select Start Node</option>
                            {nodes.map((node) => (  // 🔵 //
                                <option key={node.id} value={node.id}>Node {node.id}</option>
                            ))}
                        </select>

                        <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
                            <option value="">Select End Node</option>
                            {nodes.map((node) => (  // 🔵 //
                                <option key={node.id} value={node.id}>Node {node.id}</option>
                            ))}
                        </select>

                        <button onClick={handleAddElement}>➕ Add Element</button>
                    </div>







                    <h3>📌 Truss Elements</h3>
                    <ul>
                        {elements.map((element) => {
                            // Find the matching length for the element
                            const matchingMember = memberLengths.find(
                                (member) => member.element_id === element.id
                            );

                            return (
                                <li key={element.id}>
                                    Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
                                    
                                    {/* Display Member Length if found */}
                                    {matchingMember && (
                                        <strong> (Length: {matchingMember.length} units)</strong>
                                    )}
                                    
                                    <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
                                </li>
                            );
                        })}
                    </ul> 
                    
                </div>




                {/* Visualization Section (Fixed) */}
                <div className="visualization-section">
                <h2>🌐 3D Truss Visualization</h2>
                <div className="fixed-visualization">
                    <TrussVisualizer nodes={nodes} elements={elements} supports={supports} />   {/* 🔵 */}  {/*// 🟣 //*/}
                </div>
            </div>
            </div>
        </div>
    );
};

export default StructureInput;
