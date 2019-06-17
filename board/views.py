from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import (status,generics,filters)
from board.models import *
from board.serializers import *
from rest_framework.response import Response
from django.core.paginator import (Paginator,EmptyPage,PageNotAnInteger)
from rest_framework.pagination import PageNumberPagination

class PostListView(generics.ListAPIView):
    """ List all posts, or create a new post."""
    pagination_class = PageNumberPagination
    paginated_by = 10
    paginated_by_param = 'page'
    search_fields = ('contents','author')

    def get_queryset(self):
        return Post.objects.all()

    def get_filtered_queryset(self,queryset,request):
        filter_backends = (filters.SearchFilter,)
        for backend in list(filter_backends):
            filterd_queryset = backend().filter_queryset(request,queryset,view=self)
        return filterd_queryset

    def get(self,request):
        next_page_numb = 1
        previous_page_numb = 1
        queryset = self.get_queryset()
        if 'search' in request.query_params.keys():
            queryset = self.get_filtered_queryset(queryset,request)
        paginator = Paginator(queryset,10)
        page = request.query_params.get('page') # request.query_params만 하면 여기서 search시에 <QueryDict: {'search': ['ddd']}>로 들어옴
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        serializer = PostSerializer(data,context={'request': request},many=True)
        if data.has_next():
            next_page_numb = data.next_page_number()
        if data.has_previous():
            previous_page_numb = data.previous_page_number()
        return Response({
            'data': serializer.data,
            'nextLink': self.paginated_by_param + '=' + str(next_page_numb),
            'prevLink': self.paginated_by_param + '=' + str(previous_page_numb)
        })

class PostView(generics.RetrieveUpdateDestroyAPIView,
               generics.CreateAPIView):

    def get_queryset(self,pk):
        return Post.objects.get(pk=pk)

    def put(self,request,pk,format=None):
        post = self.get_queryset(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk, format=None):
        post = self.get_queryset(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self,request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
