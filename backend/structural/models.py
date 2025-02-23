from django.db import models

class Node(models.Model):   # // 🔴 // 🟡 //  🟢 //
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()

    def __str__(self):
        return f"Node {self.id}: ({self.x}, {self.y}, {self.z})"


class Element(models.Model):    #// 🟣 // 🟤 //
    start_node = models.ForeignKey(Node, related_name="start_elements", on_delete=models.CASCADE)
    end_node = models.ForeignKey(Node, related_name="end_elements", on_delete=models.CASCADE)

    def __str__(self):
        return f"Element {self.id}: Node {self.start_node.id} ➝ Node {self.end_node.id}"

class Project(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Support(models.Model):
    node = models.OneToOneField(Node, on_delete=models.CASCADE, primary_key=True)
    restrict_x = models.BooleanField(default=False)
    restrict_y = models.BooleanField(default=False)
    restrict_z = models.BooleanField(default=False)

    def __str__(self):
        return f"Support for Node {self.node.id}: Rx={self.restrict_x}, Ry={self.restrict_y}, Rz={self.restrict_z}"