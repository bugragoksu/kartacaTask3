from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import TravelPostSerializer, TravelMiniPostSerializer
from .models import TravelPost, TravelUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .permission import IsLoggedInUser
from django.http import JsonResponse


class TravelPostViewSet(viewsets.ModelViewSet):
    queryset = TravelPost.objects.all()
    serializer_class = TravelPostSerializer

    def list(self, request, *args, **kwargs):
        posts = TravelPost.objects.all()
        serializer = TravelMiniPostSerializer(posts, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        permission_classes = [IsLoggedInUser]
        return [permission() for permission in permission_classes]


def detail(request, id):
    post = TravelPost.objects.get(id=id)
    data = {
        "id": post.id,
        "title": post.title,
        "desc": post.desc,
        "date": post.date,
        "user": post.user.username
    }
    return JsonResponse(data)
