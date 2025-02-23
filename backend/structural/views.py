from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Node, Element, Project, Support
from .serializers import NodeSerializer, ElementSerializer, SupportSerializer
from .calculators.lengths import calculate_member_lengths  # ✅ Import the function to calculate member lengths

class NodeListCreateAPIView(APIView):
    def get(self, request): 
        nodes = Node.objects.all()
        serializer = NodeSerializer(nodes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NodeSerializer(data=request.data)
        if serializer.is_valid():
            node = serializer.save()  # ✅ Save the node first

            # ✅ Ensure a corresponding support entry is created for this node
            Support.objects.get_or_create(
                node=node,
                defaults={"restrict_x": False, "restrict_y": False, "restrict_z": False}
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ✅ Element API - No changes required
class ElementListCreateAPIView(APIView):
    def get(self, request):
        elements = Element.objects.all()
        serializer = ElementSerializer(elements, many=True)
        return Response(serializer.data)

    def post(self, request):  #// 🟣 // 🟤 //
        serializer = ElementSerializer(data=request.data)  #// 🟣 // 🟤 //
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔥 New: Delete element function
    def delete(self, request, pk):
        element = get_object_or_404(Element, pk=pk)
        element.delete()
        return Response({"message": "Element deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# ✅ API to Save a Project
class SaveProjectAPIView(APIView):
    def post(self, request):
        project_name = request.data.get("name")
        if not project_name:
            return Response({"error": "Project name is required"}, status=status.HTTP_400_BAD_REQUEST)

        project, created = Project.objects.get_or_create(name=project_name)

        # Assign all nodes and elements to this project
        Node.objects.update(project=project)
        Element.objects.update(project=project)

        return Response({"message": f"Project '{project_name}' saved successfully"}, status=status.HTTP_200_OK)


# ✅ API to Clear Database if No Project is Saved
class ClearDatabaseAPIView(APIView):
    def delete(self, request):
        # Check if any project exists
        if not Project.objects.exists():
            Node.objects.all().delete()
            Element.objects.all().delete()
            return Response({"message": "Database cleared"}, status=status.HTTP_200_OK)

        return Response({"message": "Projects exist, database not cleared"}, status=status.HTTP_400_BAD_REQUEST)


# ✅ API to Fetch Member Lengths
class MemberLengthAPIView(APIView):
    def get(self, request):
        member_lengths = calculate_member_lengths()
        return Response({"member_lengths": member_lengths}, status=status.HTTP_200_OK)


# ✅ Support API - Ensure all nodes have corresponding support entries
class SupportAPIView(APIView):
    def get(self, request):
        supports = Support.objects.all()
        serializer = SupportSerializer(supports, many=True)
        return Response(serializer.data)

    def post(self, request):
        node_id = request.data.get("node")
        restrict_x = request.data.get("restrict_x", False)
        restrict_y = request.data.get("restrict_y", False)
        restrict_z = request.data.get("restrict_z", False)

        node = get_object_or_404(Node, id=node_id)

        # ✅ Ensure support entry for this node is updated or created
        support, created = Support.objects.update_or_create(
            node=node,
            defaults={"restrict_x": restrict_x, "restrict_y": restrict_y, "restrict_z": restrict_z},
        )

        return Response(SupportSerializer(support).data, status=status.HTTP_200_OK)
