from .models import User
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.paginator import Paginator
from .serializers import CreateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import SimpleRateThrottle
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomThrottle(SimpleRateThrottle):
    rate = '5/minutes'


class CreateUserView(APIView):
    # throttle_classes = [CustomThrottle,]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        email = User.objects.filter(email_id=request.data["email_id"])
        if email:
            return JsonResponse({'error': 'User with same email already exists'}, status=400)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'User details saved successfully'})
        return JsonResponse({'error': 'Missing required fields'}, status=400)


class UserListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.order_by('created_date')
        paginator = Paginator(users, 10)
        page = request.GET.get('page')
        user_list = paginator.get_page(page)
        results = [{
            'f_name': user.f_name,
            'l_name': user.l_name,
            'email_id': user.email_id,
            'phone_number': user.phone_number,
            'address': user.address,
            'created_date': user.created_date
        }for user in user_list]

        data = {
            'results': results,
            'next': user_list.next_page_number() if user_list.has_next() else None,
            'previous': user_list.previous_page_number() if user_list.has_previous() else None
        }

        return JsonResponse(data)
