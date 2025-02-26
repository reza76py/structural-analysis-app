import math
from structural.models import Element

def calculate_local_stiffness_matrices(E=10000, A=8.4):

    local_stiffness_matrices = []

    elements = Element.objects.all()

    for element in elements:
        start_node = element.start_node
        end_node = element.end_node

        if not start_node or not end_node:
            continue

        # Compute member length
        length = math.sqrt(
            (start_node.x - end_node.x) ** 2 +
            (start_node.y - end_node.y) ** 2 +
            (start_node.z - end_node.z) ** 2
        )

        if length == 0:
            continue  # Avoid division by zero

        # Compute local stiffness matrix
        stiffness_value = (E * A) / length
        k_local = [
            [stiffness_value, -stiffness_value],
            [-stiffness_value, stiffness_value]
        ]

        local_stiffness_matrices.append({
            "element_id": element.id,
            "start_node": start_node.id,
            "end_node": end_node.id,
            "length": length,
            "k_local": k_local
        })

    return local_stiffness_matrices