# from rest_framework.routers import DefaultRouter
# from .views import ArticleViewSet

# router = DefaultRouter()
# router.register('', ArticleViewSet, base_name='articles')
# urlpatterns = router.urls

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^(?P<post_id>\d+)/$', views.post, name='post'),
    url(r'^profile/(?P<user_id>\d+)/$', views.user_posts, name='userPosts'),
]