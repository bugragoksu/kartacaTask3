from rest_framework import serializers
from .models import TravelPost, TravelUser


class TravelPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPost
        fields = ('id', 'title', 'desc', 'date','user')

class TravelMiniPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPost
        fields = ('id', 'title')


