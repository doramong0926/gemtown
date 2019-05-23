from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers

from gemtown.songs import models as songs_models
from gemtown.songs import serializers as songs_serializers
from django.conf import settings

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


def isAPITestMode():
    if settings.DEBUG is True:
        return True
    else:
        return False

def isStaff(username):
    try:
        found_user = models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        elif found_user.is_staff == True:
            return True
        else:
            return False
    except models.User.DoesNotExist:
        return False    

def isSuperUser(username):
    try:
        found_user = models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        else:
            return False
    except models.User.DoesNotExist:
        return False    


class UserFeed(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id, format=None):
        user = request.user
        if user_id is not user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.UserSerializer(found_user)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)
        

class UserList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user

        if isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user_list = models.User.objects.all()
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.UserSerializer(found_user_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get user List',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class FollowUser(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = request.user
        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        user.followings.add(user_to_follow)
        user.save()

        user_to_follow.followers.add(user)
        user_to_follow.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to follow user',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class UnfollowUser(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = request.user
        try:
            user_to_unfollow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user List',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        user.followings.remove(user_to_unfollow)
        user.save()

        user_to_unfollow.followers.remove(user)
        user_to_unfollow.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to unfollow user',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ChangePassword(APIView):    
    # permission_classes = [IsAuthenticated]
    def put(self, request, user_id, format=None):
        user = request.user
        try:
            found_user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        isApiTestMode = isAPITestMode()
        if found_user.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'who are you??',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        current_password = request.data.get('current_password', None)
        if current_password is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to change password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        passwords_match = found_user.check_password(current_password)
        if passwords_match is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to change password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('new_password', None)
        if new_password is None:
            ret_data = {
                'status': '0',
                'message': 'Fail to change password',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        
        found_user.set_password(new_password)
        found_user.save()
        ret_data = {
            'status': '1',
            'message': 'Succes to change password',
            'result': ''
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

