from rest_framework import serializers
from board.models import *
    
class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('pk','contents','author','date_of_created','date_of_modified')