from django.conf.urls import url, include 
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_auth.registration.views import VerifyEmailView, RegisterView
# from allauth.account.views import confirm_email as allauthemailconfirmation
from allauth.account.views import confirm_email, ConfirmEmailView
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('tribune.urls')),
    # url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^accounts/', include('allauth.urls')),
    # url(r'^account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # url(r"^registration/account-confirm-email/(?P<key>[-:\w]+)/$", ConfirmEmailView.as_view(), name='account_confirm_email'),
    # url(r'^api-auth/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # url(r'^api-auth/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'.*', TemplateView.as_view(template_name='index.html'))
]
