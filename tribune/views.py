# from django.shortcuts import render
# from rest_framework import viewsets
# from .serializers import ArticleSerializer
# from .models import Article

# # Create your views here.
# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.get_all()
#     serializer_class = ArticleSerializer

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer
from .models import Article

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticatedOrReadOnly, ))
def index(request):
    posts = Article.get_all()
    serialize_posts = ArticleSerializer(posts, many=True)
    # print(request.user)
    if request.method == "POST":
        serializer_form = ArticleSerializer(data=request.data)
        if serializer_form.is_valid():
            serializer = serializer_form.save()
            return Response(data=serializer_form.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data=serialize_posts.data, status=status.HTTP_200_OK)
