from rest_framework import serializers
from .models import Node, Element  # ✅ Import only models

class NodeSerializer(serializers.ModelSerializer):  # // 🔴 // 🟡 //  🟢 //
    class Meta:
        model = Node    # // 🔴 // 🟡 //  🟢 //
        fields = '__all__'

class ElementSerializer(serializers.ModelSerializer):   #// 🟣 // 🟤 //
    class Meta:
        model = Element #// 🟣 // 🟤 //
        fields = '__all__'
