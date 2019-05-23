from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers

from django.conf import settings
from gemtown.users import models as user_models


class ListAllMusicians(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        try:
            musician_list = models.Musician.objects.all()
        except models.Musician.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get musician list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.MusicianSerializer(musician_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get musician list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class Musician(APIView):
    permission_classes = [AllowAny]
    def get(self, request, musician_id, format=None):
        try:
            found_musician = models.Musician.objects.get(id=musician_id)
        except models.Musician.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get musician detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.MusicianDetailSerializer(found_musician)
        ret_data = {
            'status': '1',
            'message': 'Succes to get musician detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class MusicianRegister(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
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
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
            
        try:            
            _nickname=request.data.get('nickname', None)
            new_musician = models.Musician.objects.create(
                creator = found_user,
                cover_image = request.data.get('cover_image', None),
                nickname = _nickname,
                description = request.data.get('description', None),
                career = request.data.get('career', None),  
            )
            new_musician.save()
            
            found_user.musician_nickname=_nickname
            found_user.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to register musician',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except :
            ret_data = {
                'status': '0',
                'message': 'Fail to register musician',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)


class MusicianUnregister(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, musician_id, format=None):
        user = request.user
        try:
            found_musician = models.Musician.objects.get(id=musician_id)
        except models.Musician.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find musician',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            found_user = models.User.objects.get(id=found_musician.id)
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
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)        
        else:
            found_musician.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to delete musician',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)

