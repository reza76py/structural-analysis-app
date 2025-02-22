from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Node, Element, Project
from .serializers import NodeSerializer, ElementSerializer  # ✅ Ensure both serializers are imported
from .calculators.lengths import calculate_member_lengths  # ✅ Import the function to calculate member lengths

# ✅ Node API
class NodeListCreateAPIView(APIView):
    def get(self, request): 
        nodes = Node.objects.all()
        serializer = NodeSerializer(nodes, many=True)
        return Response(serializer.data)

    def post(self, request):    # // 🔴 // 🟡 //  🟢 //
        serializer = NodeSerializer(data=request.data)  # // 🔴 // 🟡 //  🟢 //
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # 🔥 New: Delete node function
    def delete(self, request, pk):
        node = get_object_or_404(Node, pk = pk)
        node.delete()
        return Response({"message": "Node deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        


# ✅ Element API (Make sure it exists)
class ElementListCreateAPIView(APIView):
    def get(self, request):
        elements = Element.objects.all()
        serializer = ElementSerializer(elements, many=True)
        return Response(serializer.data)

    def post(self, request):    #// 🟣 // 🟤 //
        serializer = ElementSerializer(data=request.data)   #// 🟣 // 🟤 //
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


class MemberLengthAPIView(APIView):
    def get(self, request):
        member_lengths = calculate_member_lengths()
        return Response({"member_lengths": member_lengths}, status=status.HTTP_200_OK)
