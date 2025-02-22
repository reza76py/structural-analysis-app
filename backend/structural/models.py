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
    

class Node(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()

    def __str__(self):
        return f"Node {self.id}: ({self.x}, {self.y}, {self.z})"
    
class Element(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)  # Linked to Project
    start_node = models.ForeignKey(Node, related_name="start_elements", on_delete=models.CASCADE)
    end_node = models.ForeignKey(Node, related_name="end_elements", on_delete=models.CASCADE)

    def __str__(self):
        return f"Element {self.id}: {self.start_node} ➝ {self.end_node}"   
    