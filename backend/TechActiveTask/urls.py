from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserListView, CustomTokenObtainPairView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_user/', CreateUserView.as_view()),
    path('user_list/', UserListView.as_view()),
    path("token/", CustomTokenObtainPairView.as_view()),
    path("refreshtoken/", TokenRefreshView.as_view()),

]
