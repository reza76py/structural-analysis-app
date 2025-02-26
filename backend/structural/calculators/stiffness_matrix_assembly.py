import numpy as np
from structural.models import Node, Element
from .stiffness_matrix_global import calculate_global_stiffness_matrices

def assemble_global_stiffness_matrix():
    """
    Assemble the global stiffness matrix S for the entire structure.
    """
    nodes = Node.objects.all()
    elements = Element.objects.all()

    # Total number of DOFs (each node has 3 DOFs)
    num_dof = 3 * nodes.count()

    # Initialize global stiffness matrix S with zeros
    S = np.zeros((num_dof, num_dof))

    # Retrieve the global stiffness matrices
    global_stiffness_matrices = calculate_global_stiffness_matrices()

    # Create a node index mapping (to get the global DOF index)
    node_index = {node.id: i for i, node in enumerate(nodes)}

    for item in global_stiffness_matrices:
        element_id = item["element_id"]
        start_node_id = item["start_node"]
        end_node_id = item["end_node"]
        k_global = np.array(item["k_global"])

        # Get global DOF indices for the start and end nodes
        start_idx = node_index[start_node_id] * 3
        end_idx = node_index[end_node_id] * 3

        # Define the DOF mapping for the element in the global stiffness matrix
        dof_map = [
            start_idx, start_idx + 1, start_idx + 2,  # DOFs for start node (x, y, z)
            end_idx, end_idx + 1, end_idx + 2         # DOFs for end node (x, y, z)
        ]

        # Assemble k_global into S by summing overlapping DOFs
        for i in range(6):
            for j in range(6):
                S[dof_map[i], dof_map[j]] += k_global[i, j]

    return S.tolist()  # Convert to list for JSON response
