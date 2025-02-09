import { useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei'; // Import Line from drei

// Function to generate random colors for each element
const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const TrussVisualizer = ({ nodes = [], elements = [] }) => {
    useEffect(() => {
        console.log("Nodes:", nodes);
        console.log("Elements:", elements);
    }, [nodes, elements]);

    return (
        <div className="truss-visualizer">
            <Canvas camera={{ position: [5, 5, 10] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />

                {/* Render Nodes */}
                {nodes.length > 0 &&
                    nodes.map((node) => (
                        <mesh key={node.id} position={[+node.x, +node.y, +node.z]}>
                            <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
                            <meshStandardMaterial attach="material" color="blue" />
                        </mesh>
                    ))}

                {/* Render Elements (Connections) with Different Colors */}
                {elements.length > 0 &&
                    elements.map((element) => {
                        const startNode = nodes.find((node) => node.id === parseInt(element.start));
                        const endNode = nodes.find((node) => node.id === parseInt(element.end));

                        if (!startNode || !endNode) return null;

                        const start = [parseFloat(startNode.x), parseFloat(startNode.y), parseFloat(startNode.z)];
                        const end = [parseFloat(endNode.x), parseFloat(endNode.y), parseFloat(endNode.z)];

                        return (
                            <Line
                                key={element.id}
                                points={[start, end]} // Start and end points
                                color={getRandomColor()} // Assign a different color for each element
                                lineWidth={2} // Line thickness
                            />
                        );
                    })}
            </Canvas>
        </div>
    );
};

export default TrussVisualizer;
