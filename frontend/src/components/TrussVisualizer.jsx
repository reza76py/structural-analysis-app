import { useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei'; // Import Text for labels

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
                <pointLight position={[10, 10, 30]} />
                <OrbitControls />

                {/* Render Nodes */}
                {nodes.length > 0 &&
                    nodes.map((node) => (
                        <mesh key={node.id} position={[+node.x, +node.y, +node.z]}>
                            <sphereGeometry attach="geometry" args={[0.1, 16, 16]} />
                            <meshStandardMaterial attach="material" color="blue" />
                        </mesh>
                    ))}

                {/* Render Elements (Connections) with Labels */}
                {elements.length > 0 &&
                    elements.map((element, index) => {
                        const startNode = nodes.find((node) => node.id === parseInt(element.start_node || element.start));
                        const endNode = nodes.find((node) => node.id === parseInt(element.end_node || element.end));

                        if (!startNode || !endNode) return null;

                        const start = [parseFloat(startNode.x), parseFloat(startNode.y), parseFloat(startNode.z)];
                        const end = [parseFloat(endNode.x), parseFloat(endNode.y), parseFloat(endNode.z)];

                        // Compute midpoint for label placement
                        const midPoint = [
                            (start[0] + end[0]) / 2,
                            (start[1] + end[1]) / 2 + 0.2, // Slightly above the element
                            (start[2] + end[2]) / 2,
                        ];

                        return (
                            <group key={element.id}>
                                {/* Render Truss Line */}
                                <Line points={[start, end]} color={getRandomColor()} lineWidth={2} />
                                
                                {/* Render Element Number */}
                                <Text position={midPoint} fontSize={0.3} color="black">
                                    {`E${index + 1}`} {/* Show Element Number */}
                                </Text>
                            </group>
                        );
                    })}
            </Canvas>
        </div>
    );
};

export default TrussVisualizer;


