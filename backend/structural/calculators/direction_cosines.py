import math
from structural.models import Node, Element


def calculate_direction_cosines():
    direction_cosines  = []

    elements = Element.objects.all()

    for element in elements:
        start_node = element.start_node
        end_node = element.end_node

        if not start_node or not end_node:
            continue

        length = math.sqrt(
            (start_node.x - end_node.x) ** 2 +
            (start_node.y - end_node.y) ** 2 +
            (start_node.z - end_node.z) ** 2
        )

        if length == 0:
            continue

        cos_theta_x = (end_node.x - start_node.x) / length
        cos_theta_y = (end_node.y - start_node.y) / length
        cos_theta_z = (end_node.z - start_node.z) / length

        direction_cosines.append({
            "element_id": element.id,
            "start_node": start_node.id,
            "end_node": end_node.id,
            "cos_theta_x": cos_theta_x,
            "cos_theta_y": cos_theta_y,
            "cos_theta_z": cos_theta_z,
        })

    return direction_cosines