import math
from structural.calculators.lengths import calculate_member_lengths
from structural.models import Node


def stiffness_matrix_reza():
    E = 10000  # Modulus of Elasticity
    A = 8.4  # Cross-sectional Area

    member_lengths = calculate_member_lengths()
    nodes = Node.objects.all()
    
    print("Member Lengths:", member_lengths)  # Debugging output

    stiffness_values = []

    for member in member_lengths:
        length = member["length"]
        
        if length == 0:
            stiffness = None
        else:
            stiffness = (E * A) / (length * 12)  # Compute EA/L
        
        stiffness_values.append({
            "element_id": member["element_id"],
            "stiffness": stiffness
        })

    print("Computed Stiffness Values:", stiffness_values)  # Debugging output
    return stiffness_values
# The function stiffness_matrix_reza() calculates the stiffness values for each truss element in the structure. The stiffness value is computed as E * A / (length * 12), where E is the modulus of elasticity, A is the cross-sectional area, and length is the length of the truss element. The stiffness values are returned as a list of dictionaries containing the element ID and the computed stiffness value.




