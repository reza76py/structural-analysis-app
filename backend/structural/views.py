from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Node, Element
from .serializers import NodeSerializer, ElementSerializer  # ✅ Ensure both serializers are imported

# ✅ Node API
class NodeListCreateAPIView(APIView):
    def get(self, request):
        nodes = Node.objects.all()
        serializer = NodeSerializer(nodes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NodeSerializer(data=request.data)
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

    def post(self, request):
        serializer = ElementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # 🔥 New: Delete element function
    def delete(self, request, pk):
        element = get_object_or_404(Element, pk=pk)
        element.delete()
        return Response({"message": "Element deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
