import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles_structure_input.css';
import TrussVisualizer from '../components/TrussVisualizer';

const StructureInput = () => {
    const [nodeX, setNodeX] = useState('');
    const [nodeY, setNodeY] = useState('');
    const [nodeZ, setNodeZ] = useState('');
    const [nodes, setNodes] = useState([]);
    const [supports, setSupports] = useState({});
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');
    const [elements, setElements] = useState([]);
    const [memberLengths, setMemberLengths] = useState([]);
    const [directionCosines, setDirectionCosines] = useState([]);
    const [stiffnessMatrices, setStiffnessMatrices] = useState([]);
    const [globalStiffnessMatrices, setGlobalStiffnessMatrices] = useState([]);
    const [structureStiffnessMatrix, setStructureStiffnessMatrix] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/nodes/')
            .then(response => setNodes(response.data))
            .catch(error => console.error('Error fetching nodes:', error));

        axios.get('http://127.0.0.1:8000/api/elements/')
            .then(response => setElements(response.data))
            .catch(error => console.error('Error fetching elements:', error));

        axios.get('http://127.0.0.1:8000/api/direction_cosines/')
            .then(response => setDirectionCosines(response.data.direction_cosines))
            .catch(error => console.error('Error fetching direction cosines:', error));
            
            
        axios.get('http://127.0.0.1:8000/api/local_stiffness_matrices/')
            .then(response => setStiffnessMatrices(response.data.stiffness_matrices))
            .catch(error => console.error('Error fetching local stiffness matrices:', error)); 
            
            
        axios.get('http://127.0.0.1:8000/api/global_stiffness_matrices/')
            .then(response => setGlobalStiffnessMatrices(response.data.stiffness_matrices))
            .catch(error => console.error('Error fetching global stiffness matrices:', error));
            
            const fetchStructureMatrix = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/structure_stiffness_matrix/');
                    console.log("Full API Response:", response);
        
                    if (response.data && Array.isArray(response.data.structure_stiffness_matrix)) {
                        console.log("✅ Setting State: Structure Stiffness Matrix Found!");
                        setStructureStiffnessMatrix(response.data.structure_stiffness_matrix);
                    } else {
                        console.error("❌ Unexpected response structure:", response.data);
                        setStructureStiffnessMatrix([]);  // Ensure it's an empty array on failure
                    }
                } catch (error) {
                    console.error("❌ Error Fetching Structure Stiffness Matrix:", error);
                    setStructureStiffnessMatrix([]);
                }
            };
        
            fetchStructureMatrix();
        
        
        
            


        const fetchSupports = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/supports/');
                const supportsData = response.data.reduce((acc, support) => {
                    acc[support.node] = {
                        restrict_x: !!support.restrict_x,
                        restrict_y: !!support.restrict_y,
                        restrict_z: !!support.restrict_z
                    };
                    return acc;
                }, {});
                setSupports(supportsData);
            } catch (error) {
                console.error('Error fetching supports:', error);
            }
        };

        fetchSupports();
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/member_lengths/')
            .then(response => setMemberLengths(response.data.member_lengths))
            .catch(error => console.error('Error fetching member lengths:', error));
    }, []);

    const handleAddNode = async () => {
        if (nodeX !== '' && nodeY !== '' && nodeZ !== '') {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nodes/', {
                    x: parseFloat(nodeX),
                    y: parseFloat(nodeY),
                    z: parseFloat(nodeZ),
                });

                if (response.status === 201) {
                    setNodes([...nodes, response.data]);
                    setNodeX('');
                    setNodeY('');
                    setNodeZ('');
                } else {
                    console.error("Unexpected response:", response);
                    alert("Failed to add node.");
                }
            } catch (error) {
                console.error("Error adding node:", error);
                alert("Failed to add node.");
            }
        }
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}/`);
            if (response.status === 204) {
                setNodes(nodes.filter(node => node.id !== nodeId));
            } else {
                console.error("Failed to delete node:", response);
                alert("Could not delete node.");
            }
        } catch (error) {
            console.error("Error deleting node:", error);
            alert("Failed to delete node.");
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

    const handleToggleConstraint = (nodeId, constraint) => {
        setSupports((prevSupports) => ({
            ...prevSupports,
            [nodeId]: {
                ...prevSupports[nodeId],
                [constraint]: !prevSupports[nodeId]?.[constraint],
            },
        }));
    };

    const handleApplyConstraints = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/supports/');
            const requests = Object.entries(supports).map(([nodeId, constraints]) =>
                axios.post('http://127.0.0.1:8000/api/supports/', {
                    node: parseInt(nodeId),
                    restrict_x: constraints.restrict_x || 0,
                    restrict_y: constraints.restrict_y || 0,
                    restrict_z: constraints.restrict_z || 0,
                })
            );
            await Promise.all(requests);
            console.log("All constraints applied successfully!");
        } catch (error) {
            console.error("Error applying constraints:", error);
        }
    };

    const getNdofLabel = (nodeId) => {
        const constraints = supports[nodeId] || {};
        const numConstraints = Object.values(constraints).filter(Boolean).length;
        return 3 - numConstraints; // Each constraint reduces NDOF by 1
    };


    const renderMatrix = (matrix) => {
        if (!matrix || matrix.length === 0) return <div>Empty matrix received</div>;
        
        return (
            <div>
                <div className="matrix-info">
                    Dimensions: {matrix.length}x{matrix[0]?.length || 0}
                </div>
                <div className="matrix-container">
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className="matrix-row">
                            {row.map((value, colIndex) => (
                                <span key={colIndex} className="matrix-cell">
                                    {typeof value === 'number' ? value.toFixed(2) : 'NaN'}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
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

                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!supports[node.id]?.restrict_x}
                                            onChange={() => handleToggleConstraint(node.id, "restrict_x")}
                                        />
                                        Rx (Restrict X)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!supports[node.id]?.restrict_y}
                                            onChange={() => handleToggleConstraint(node.id, "restrict_y")}
                                        />
                                        Ry (Restrict Y)
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!supports[node.id]?.restrict_z}
                                            onChange={() => handleToggleConstraint(node.id, "restrict_z")}
                                        />
                                        Rz (Restrict Z)
                                    </label>
                                </div>

                                <span> 🔧 NDOF: {getNdofLabel(node.id)}</span>
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleApplyConstraints}>Apply Constraints</button>

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
                        {elements.map((element) => {
                            const matchingMember = memberLengths.find(
                                (member) => member.element_id === element.id
                            );

                            return (
                                <li key={element.id}>
                                    Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
                                    {matchingMember && (
                                        <strong> (Length: {matchingMember.length} units)</strong>
                                    )}
                                    <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
                                </li>
                            );
                        })}
                    </ul>

                    <h3>📏 Direction Cosines</h3>
                    <ul>
                        {directionCosines.map((cosine) => (
                            <li key={cosine.element_id}>
                                Element {cosine.element_id}: 
                                (cosθx: {cosine.cos_theta_x.toFixed(4)}, 
                                cosθy: {cosine.cos_theta_y.toFixed(4)}, 
                                cosθz: {cosine.cos_theta_z.toFixed(4)})
                            </li>
                        ))}
                    </ul>

                    <h3>🛠️ Local Stiffness Matrices</h3>
                    <ul>
                        {stiffnessMatrices.map((stiffness) => (
                            <li key={stiffness.element_id}>
                                Element {stiffness.element_id}:
                                <pre>
                                    k_local = [
                                        [{stiffness.k_local[0][0].toFixed(2)}, {stiffness.k_local[0][1].toFixed(2)}],
                                        [{stiffness.k_local[1][0].toFixed(2)}, {stiffness.k_local[1][1].toFixed(2)}]
                                    ]
                                </pre>
                            </li>
                        ))}
                    </ul>


                    <h3>🌍 Global Stiffness Matrices</h3>
                    <ul>
                        {globalStiffnessMatrices.map((stiffness) => (
                            <li key={stiffness.element_id}>
                                Element {stiffness.element_id}:
                                <pre>
                                    k_global = [
                                        [{stiffness.k_global[0][0].toFixed(2)}, {stiffness.k_global[0][1].toFixed(2)}, ...],
                                        [{stiffness.k_global[1][0].toFixed(2)}, {stiffness.k_global[1][1].toFixed(2)}, ...],
                                        ...
                                    ]
                                </pre>
                            </li>
                        ))}
                    </ul>

                    
                            

                    <h3>🛠️ Structure Stiffness Matrix</h3>
                    <ul>{structureStiffnessMatrix}</ul>


                    <div className="structure-container">
                    <div className="flex-container">
                        <div className="input-section">
                            {/* ... (keep all existing JSX) */}

                            <h3>🛠️ Structure Stiffness Matrix</h3>
                            {structureStiffnessMatrix.length > 0 ? (
                                renderMatrix(structureStiffnessMatrix)
                            ) : (
                                <div>Loading structure stiffness matrix...</div>
                            )}
                        </div>

                        {/* ... (keep visualization section) */}
                    </div>
                </div>
        


                </div>

                <div className="visualization-section">
                    <h2>🌐 3D Truss Visualization</h2>
                    <div className="fixed-visualization">
                        <TrussVisualizer nodes={nodes} elements={elements} supports={supports} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StructureInput;