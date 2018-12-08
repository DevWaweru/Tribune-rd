from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('tribune.urls')),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api-auth/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api-auth/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
]
