import math
import numpy as np
from structural.models import Element
from .direction_cosines import calculate_direction_cosines
from .stiffness_matrix import calculate_local_stiffness_matrices

def calculate_global_stiffness_matrices(E=10000, A=8.4):
    """
    Compute the global stiffness matrix for each truss element.

    k_global = T^T * k_local * T
    where T is the transformation matrix derived from direction cosines.
    """
    global_stiffness_matrices = []
    direction_cosines = {dc["element_id"]: dc for dc in calculate_direction_cosines()}
    local_stiffness_matrices = {ls["element_id"]: ls for ls in calculate_local_stiffness_matrices(E, A)}

    for element in Element.objects.all():
        if element.id not in direction_cosines or element.id not in local_stiffness_matrices:
            continue

        # Get direction cosines
        cos_x = direction_cosines[element.id]["cos_theta_x"]
        cos_y = direction_cosines[element.id]["cos_theta_y"]
        cos_z = direction_cosines[element.id]["cos_theta_z"]

        # Construct a **6x6** transformation matrix T
        T = np.array([
            [cos_x, cos_y, cos_z, 0, 0, 0],
            [0, 0, 0, cos_x, cos_y, cos_z]
        ])

        # Expand to a 6x6 by inserting zero rows and columns
        T_expanded = np.zeros((6, 6))
        T_expanded[0, 0] = cos_x
        T_expanded[0, 1] = cos_y
        T_expanded[0, 2] = cos_z
        T_expanded[3, 3] = cos_x
        T_expanded[3, 4] = cos_y
        T_expanded[3, 5] = cos_z

        # Get the 2x2 local stiffness matrix
        k_local = np.array(local_stiffness_matrices[element.id]["k_local"])

        # Expand local stiffness matrix to 6x6 (diagonal blocks)
        k_local_6x6 = np.zeros((6, 6))
        k_local_6x6[:3, :3] = k_local[0, 0]  # Top-left block
        k_local_6x6[3:, 3:] = k_local[1, 1]  # Bottom-right block
        k_local_6x6[:3, 3:] = k_local[0, 1]  # Top-right block
        k_local_6x6[3:, :3] = k_local[1, 0]  # Bottom-left block

        # Compute global stiffness matrix
        k_global = np.dot(T_expanded.T, np.dot(k_local_6x6, T_expanded))

        global_stiffness_matrices.append({
            "element_id": element.id,
            "start_node": element.start_node.id,
            "end_node": element.end_node.id,
            "k_global": k_global.tolist()
        })

    return global_stiffness_matrices
