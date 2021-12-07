import jwt
from django.conf import settings
from rest_framework import exceptions
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from .util import generate_access_token, generate_refresh_token
from rest_framework.response import Response
from .serializer import UserSerializer
from account.verify import JWTAuthentication
# Create your views here.


@api_view(['POST'])
# @permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return HttpResponse('username and password required')

    User = get_user_model()
    user = User.objects.filter(username=username).first()
    if user is None:
        return HttpResponse('user not found')
    if user.check_password(password) == False:
        return HttpResponse('wrong password')

    serialized_user = UserSerializer(user).data
    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    myResponse = Response(
        {'access_token': access_token, 'user': serialized_user, 'success': True})
    myResponse.set_cookie(key='refreshtoken',
                          value=refresh_token, httponly=True)

    return myResponse


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token_view(request):
    User = get_user_model()
    refresh_token = request.COOKIES.get('refreshtoken')
    if refresh_token is None:
        raise exceptions.AuthenticationFailed(
            'Authentication credentials were not provided.')
    try:
        payload = jwt.decode(
            refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            'expired refresh token, please login again.')

    user = User.objects.filter(id=payload.get('user_id')).first()
    if user is None:
        raise exceptions.AuthenticationFailed('User not found')

    if not user.is_active:
        raise exceptions.AuthenticationFailed('user is inactive')

    access_token = generate_access_token(user)
    return Response({'access_token': access_token})


@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([JWTAuthentication])
def getFile(request):
    print(request.user+'login...')

    return Response({'user': str(request.user)})
