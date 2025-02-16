import math
from structural.models import Node, Element

def calculate_member_lengths():
    member_lengths = []

    elements  = Element.objects.all()

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

        member_lengths.append({
            "element_id": element.id,
            "start_node": start_node.id,
            "end_node": end_node.id,
            "length": length
        })

    return member_lengths