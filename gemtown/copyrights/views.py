from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers
from gemtown.users import models as user_models
from django.conf import settings

def isAPITestMode():
    if settings.DEBUG is True:
        return True
    else:
        return False

def isStaff(username):
    try:
        found_user = user_models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        elif found_user.is_staff == True:
            return True
        else:
            return False
    except user_models.User.DoesNotExist:
        return False    

def isSuperUser(username):
    try:
        found_user = user_models.User.objects.get(username=username)
        if found_user.is_superuser == True:
            return True
        else:
            return False
    except user_models.User.DoesNotExist:
        return False    

class ListAllMusicCopyrights(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):        
        user = request.user
        if isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            copyright_list = models.MusicCopyright.objects.all()
        except models.MusicCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get music copyright list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.MusicCopyrightSerializer(copyright_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get music copyright list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class ListUserMusicCopyrights(APIView):
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
            copyright_list = models.MusicCopyright.objects.filter(creator__id=user_id)
        except models.MusicCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get music copyright list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)                            

        serializer = serializers.MusicCopyrightSerializer(copyright_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get music copyright list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class MusicCopyright(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, music_id, format=None):
        user = request.user
        if user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_music_copyright = models.MusicCopyright.objects.get(song__id=music_id)
        except models.MusicCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get music copyright detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.MusicCopyrightSerializer(found_music_copyright)
        ret_data = {
            'status': '1',
            'message': 'Succes to get music copyright detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllModelPhotoCopyrights(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        if isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            copyright_list = models.ModelPhotoCopyright.objects.all()
        except models.ModelPhotoCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modelphoto copyright list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelPhotoCopyrightSerializer(copyright_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modelphoto copyright list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListUserModelPhotoCopyrights(APIView):
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
            copyright_list = models.ModelPhotoCopyright.objects.filter(creator__id=user_id)
        except models.ModelPhotoCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modelphoto copyright list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)                  

        serializer = serializers.ModelPhotoCopyrightSerializer(copyright_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modelphoto copyright list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ModelPhotoCopyright(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, modelphoto_id, format=None):
        user = request.user
        if user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            found_modelphoto_copyright = models.ModelPhotoCopyright.objects.get(modelphoto__id=modelphoto_id)
        except models.ModelPhotoCopyright.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get model photo copyright detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelPhotoCopyrightSerializer(found_modelphoto_copyright)
        ret_data = {
            'status': '1',
            'message': 'Succes to get mumodelsic copyright detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)
