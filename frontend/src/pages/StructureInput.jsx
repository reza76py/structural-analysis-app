// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios
// import '../styles/styles_structure_input.css';
// import TrussVisualizer from '../components/TrussVisualizer';

// // 🔴🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜ //

// const StructureInput = () => {
//     const [nodeX, setNodeX] = useState(''); // 🔴 //
//     const [nodeY, setNodeY] = useState(''); // 🟡 //
//     const [nodeZ, setNodeZ] = useState(''); // 🟢 //
//     const [nodes, setNodes] = useState([]); // 🔵 //
//     const [supports, setSupports] = useState({});   // 🟣 //
//     const [startNode, setStartNode] = useState(''); // 🟤 // 
//     const [endNode, setEndNode] = useState(''); //⚫ // 
//     const [elements, setElements] = useState([]);   // ⚪ //
//     const [nodeConstraints, setNodeConstraints] = useState({}); // Store constraints for each node
//     const [memberLengths, setMemberLengths] = useState([]); // 🟧 //


//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/nodes/')   // 🔵 //
//             .then(response => setNodes(response.data))  // 🔵 //
//             .catch(error => console.error('Error fetching nodes:', error)); // 🔵 //

//         axios.get('http://127.0.0.1:8000/api/elements/')    // ⚪ //
//             .then(response => setElements(response.data))   // ⚪ //
//             .catch(error => console.error('Error fetching elements:', error));  // ⚪ //
            
//             let isMounted = true;

//             const fetchSupports = async () => {
//                 try {
//                     const response = await axios.get('http://127.0.0.1:8000/api/supports/');
//                     if (!response || !response.data) {
//                         console.error("❌ API Response is invalid:", response);
//                         return;
//                     }
//                     console.log("🔄 API Response for Supports:", response.data);
        
//                     const supportsData = response.data.reduce((acc, support) => {
//                         acc[support.node] = {
//                             restrict_x: !!support.restrict_x,
//                             restrict_y: !!support.restrict_y,
//                             restrict_z: !!support.restrict_z
//                         };
//                         return acc;
//                     }, {});
        
//                     if (isMounted) {
//                         console.log("✅ Storing Supports in State:", supportsData);
//                         setSupports(supportsData);
//                     }
//                 } catch (error) {
//                     console.error('❌ Error fetching supports:', error);
//                 }
//             };
        
//             fetchSupports();
        
//             return () => {
//                 isMounted = false; // ✅ Cleanup function to prevent multiple calls
//             };
//     }, []);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/member_lengths/')  // ✅ Fetch member lengths
//             .then(response => setMemberLengths(response.data.member_lengths))
//             .catch(error => console.error('Error fetching member lengths:', error));
//     }, []);
    

//     const handleAddNode = async () => {
//         if (nodeX !== '' && nodeY !== '' && nodeZ !== '') { // 🔴 // 🟡 //  🟢 //
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/api/nodes/', { // 🔵 //
//                     x: parseFloat(nodeX),   // 🔴 //
//                     y: parseFloat(nodeY),   // 🟡 //
//                     z: parseFloat(nodeZ),   // 🟢 //
//                 });

//                 if (response.status === 201) { // ✅ Only update if request is successful
//                     setNodes([...nodes, response.data]); 
//                     setNodeX('');
//                     setNodeY('');
//                     setNodeZ('');
//                 } else {
//                     console.error("Unexpected response:", response);
//                     alert("Failed to add node.");
//                 }
//                 setNodes([...nodes, response.data]); // 🔵 //
//                 setNodeX('');   // 🔴 //
//                 setNodeY('');   // 🟡 //
//                 setNodeZ('');   // 🟢 //
//             } catch (error) {
//                 console.error("Error adding node:", error);
//                 alert("Failed to add node.");
//             }
//         }
//     };

//     const handleDeleteNode = async (nodeId) => {
//         try {
//             const response = await axios.delete(`http://127.0.0.1:8000/api/nodes/${nodeId}/`);
//             if (response.status === 204) { // ✅ Ensure deletion was successful
//                 setNodes(nodes.filter(node => node.id !== nodeId));
//             } else {
//                 console.error("Failed to delete node:", response);
//                 alert("Could not delete node.");
//             }
//         } catch (error) {
//             console.error("Error deleting node:", error);
//         }
//     };

//     const handleAddElement = async () => {
//         if (startNode !== '' && endNode !== '' && startNode !== endNode) { // 🟤  //⚫ //
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/api/elements/', {   // ⚪ //
//                     start_node: parseInt(startNode),    // 🟤 //
//                     end_node: parseInt(endNode),    // ⚫ //
//                 });
//                 setElements([...elements, response.data]);  // ⚪ //
//                 setStartNode('');   // 🟤 //
//                 setEndNode('');    // ⚫ //
//             } catch (error) {
//                 console.error("Error adding element:", error);
//                 alert("Failed to add element.");
//             }
//         }
//     };

//     const handleDeleteElement = async (elementId) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/elements/${elementId}/`);  // ⚪ //
//             setElements(elements.filter(element => element.id !== elementId));  // ⚪ //
//         } catch (error) {
//             console.error("Error deleting element:", error);
//         }
//     };

//     const handleAddSupport = async (nodeId, supportType) => {
//         try {
//             await axios.post('http://127.0.0.1:8000/api/supports/', {   // 🟣 //
//                 node: nodeId,
//                 type: supportType
//             });
//             setSupports((prev) => ({    // 🟣 //
//                 ...prev,
//                 [nodeId]: supportType,
//             }));
//         } catch (error) {
//             console.error("Error adding support:", error);
//         }
//     };


    

//     const handleToggleConstraint = (nodeId, constraint) => {
//         setSupports((prevSupports) => {
//             // Ensure previous state exists
//             const updatedSupports = {
//                 ...prevSupports,
//                 [nodeId]: {
//                     ...prevSupports[nodeId],
//                     [constraint]: !prevSupports[nodeId]?.[constraint], // ✅ Toggle true/false
//                 },
//             };
    
//             console.log("🔄 Updating constraint:", nodeId, constraint, "➡", updatedSupports[nodeId][constraint]);
//             return updatedSupports; // ✅ This should trigger a UI re-render
//         });
//     };
    
    
    
    
    
    
//     const handleApplyConstraints = async () => {
//         console.log("🚀 Applying Constraints to MySQL:", supports);
    
//         try {
//             // ✅ First, DELETE all existing supports from MySQL
//             await axios.delete('http://127.0.0.1:8000/api/supports/');
    
//             // ✅ Then, send the new constraints for each node
//             const requests = Object.entries(supports).map(([nodeId, constraints]) =>
//                 axios.post('http://127.0.0.1:8000/api/supports/', {
//                     node: parseInt(nodeId),
//                     restrict_x: constraints.restrict_x || 0,
//                     restrict_y: constraints.restrict_y || 0,
//                     restrict_z: constraints.restrict_z || 0,
//                 })
//             );
    
//             await Promise.all(requests); // ✅ Send all at once
    
//             console.log("✅ All constraints applied successfully!");
//         } catch (error) {
//             console.error("❌ Error applying constraints:", error);
//         }
//     };
    
    


    

//     const getNdofLabel = (nodeId) => {
//         const constraints = nodeConstraints[nodeId] || {};
//         const numConstraints = Object.values(constraints).filter(Boolean).length;
//         return 3 - numConstraints; // Each constraint reduces NDOF by 2
//     };

//     return (
//         <div className="structure-container">
//             <div className="flex-container">
//                 <div className="input-section">
//                     <h2>🔧 Define 3D Truss Nodes</h2>   
//                     <div className="input-group">
//                         <input type="number" placeholder="X" value={nodeX} onChange={(e) => setNodeX(e.target.value)} />    {/* 🔴 */}
//                         <input type="number" placeholder="Y" value={nodeY} onChange={(e) => setNodeY(e.target.value)} />   {/* 🟡 */}
//                         <input type="number" placeholder="Z" value={nodeZ} onChange={(e) => setNodeZ(e.target.value)} />    {/* 🟢 */}
//                         <button onClick={handleAddNode}>➕ Add Node</button>
//                     </div>

//                     <h3>📌 Nodes List & Supports</h3>
//                     <ul>
//                         {nodes.map((node) => ( // 🔵 //
//                             <li key={node.id}>
//                                 Node {node.id}: (X: {node.x}, Y: {node.y}, Z: {node.z}) 
//                                 <button onClick={() => handleDeleteNode(node.id)}>❌ Delete</button>

//                                 {supports[node.id] && <span> 🏗 (supports[node.id])</span>}
//  {/*// 🟣 //*/}

//                                 {/* Checkboxes for Constraints */}
//                                 <div>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         key={`Rx-${node.id}`}  // ✅ Ensure React detects changes
//                                         checked={!!supports[node.id]?.restrict_x} // ✅ Convert undefined to false
//                                         onChange={() => handleToggleConstraint(node.id, "restrict_x")}
//                                     />
//                                     Rx (Restrict X)
//                                 </label>

//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         key={`Ry-${node.id}`} 
//                                         checked={!!supports[node.id]?.restrict_y} 
//                                         onChange={() => handleToggleConstraint(node.id, "restrict_y")}
//                                     />
//                                     Ry (Restrict Y)
//                                 </label>

//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         key={`Rz-${node.id}`} 
//                                         checked={!!supports[node.id]?.restrict_z} 
//                                         onChange={() => handleToggleConstraint(node.id, "restrict_z")}
//                                     />
//                                     Rz (Restrict Z)
//                                 </label>



//                                 </div>

//                                 <span> 🔧 NDOF: {getNdofLabel(node.id)}</span>
//                             </li>
//                         ))}
//                     </ul>

//                     <button onClick={handleApplyConstraints}>Apply</button>






//                     <h2>🔗 Define Truss Elements</h2>
//                     <div className="input-group">
//                         <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
//                             <option value="">Select Start Node</option>
//                             {nodes.map((node) => (  // 🔵 //
//                                 <option key={node.id} value={node.id}>Node {node.id}</option>
//                             ))}
//                         </select>

//                         <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
//                             <option value="">Select End Node</option>
//                             {nodes.map((node) => (  // 🔵 //
//                                 <option key={node.id} value={node.id}>Node {node.id}</option>
//                             ))}
//                         </select>

//                         <button onClick={handleAddElement}>➕ Add Element</button>
//                     </div>







//                     <h3>📌 Truss Elements</h3>
//                     <ul>
//                         {elements.map((element) => {
//                             // Find the matching length for the element
//                             const matchingMember = memberLengths.find(
//                                 (member) => member.element_id === element.id
//                             );

//                             return (
//                                 <li key={element.id}>
//                                     Element {element.id}: Node {element.start_node} ➝ Node {element.end_node}
                                    
//                                     {/* Display Member Length if found */}
//                                     {matchingMember && (
//                                         <strong> (Length: {matchingMember.length} units)</strong>
//                                     )}
                                    
//                                     <button onClick={() => handleDeleteElement(element.id)}>❌ Delete</button>
//                                 </li>
//                             );
//                         })}
//                     </ul> 
                    
//                 </div>




//                 {/* Visualization Section (Fixed) */}
//                 <div className="visualization-section">
//                 <h2>🌐 3D Truss Visualization</h2>
//                 <div className="fixed-visualization">
//                     <TrussVisualizer nodes={nodes} elements={elements} supports={supports} />   {/* 🔵 */}  {/*// 🟣 //*/}
//                 </div>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default StructureInput;















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

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/nodes/')
            .then(response => setNodes(response.data))
            .catch(error => console.error('Error fetching nodes:', error));

        axios.get('http://127.0.0.1:8000/api/elements/')
            .then(response => setElements(response.data))
            .catch(error => console.error('Error fetching elements:', error));

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