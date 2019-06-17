from django.db import models

class Post(models.Model):
    """Model representing a post"""
    author = models.CharField(max_length=20)
    contents = models.TextField()
    date_of_created = models.DateTimeField(auto_now_add=True)
    date_of_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_of_created']

    def __str__(self):
        return self.contents

