from rest_framework import serializers
from .models import Node, Element, Support

class NodeSerializer(serializers.ModelSerializer):  # // 🔴 // 🟡 //  🟢 //
    class Meta:
        model = Node    # // 🔴 // 🟡 //  🟢 //
        fields = '__all__'

class ElementSerializer(serializers.ModelSerializer):   #// 🟣 // 🟤 //
    class Meta:
        model = Element #// 🟣 // 🟤 //
        fields = '__all__'


class SupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Support
        fields = '__all__'