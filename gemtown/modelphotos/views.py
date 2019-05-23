from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers
from gemtown.users import models as user_models
from gemtown.modelers import models as modeler_models
from gemtown.modelphotos import models as modelphoto_models
from django.conf import settings

from gemtown.utils.hash import calculateHash
from PIL import Image
import piexif
import base64
from django.core.files.base import ContentFile
import os
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


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


class ListMyPostModelPhotos(APIView):
    permission_classes = [AllowAny]
    def post(self, request, user_id, format=None):
        user = request.user
        try:
            found_user = user_models.User.objects.get(id=user_id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
            
        try:
            photo_list = models.ModelPhoto.objects.filter(creator=found_user)
        except models.ModelPhoto.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modelphoto',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelPhotoSerializer(photo_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get mypost modelphoto list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class Register(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, modeler_id, format=None):
        user = request.user
        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            found_modeler = modeler_models.Modeler.objects.get(id=modeler_id)
        except modeler_models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        isApiTestMode = isAPITestMode()
        if found_modeler.creator.id is not found_user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        else:    
            new_modelphoto = models.ModelPhoto.objects.create(
                creator = found_user,
                file = request.data.get('file', None),
                photo_type = request.data.get('photo_type', None),
                modeler = found_modeler,
                confirm_status = 'ready',
            )
            new_modelphoto.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to register modelphoto',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Unregister(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, modelphoto_id, format=None):
        user = request.user
        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            found_modelphoto = models.ModelPhoto.objects.get(id=modelphoto_id)
        except models.ModelPhoto.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modelphoto',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        isApiTestMode = isAPITestMode()
        if found_modelphoto.creator.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        else:
            found_modelphoto.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to delete modelphoto',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllModelPhotos(APIView):
    permission_classes = [AllowAny]
    def get(self, request, modeler_id, format=None):
        try:
            found_modeler = modeler_models.Modeler.objects.get(id=modeler_id)
        except modeler_models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            modelphoto_list = models.ModelPhoto.objects.filter(modeler=found_modeler)
        except models.ModelPhoto.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modelphoto list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelPhotoSerializer(modelphoto_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modelphoto list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ModelPhoto(APIView):
    permission_classes = [AllowAny]
    def get(self, request, modelphoto_id, format=None):
        try:
            found_modelphoto = models.ModelPhoto.objects.get(id=modelphoto_id)
        except models.ModelPhoto.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modelphoto detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelPhotoDetailSerializer(found_modelphoto)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modelphoto detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class VerifyModelPhoto(APIView):
    permission_classes = [IsAuthenticated]    
    def post(self, request, format=None):
        user = request.user
        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        requested_file = request.data.get('file', None)
        requested_image = ContentFile(requested_file.read())
        im = Image.open(requested_image)
        exif_dict = piexif.load(im.info["exif"])

        requested_file.seek(0)
        found_hash = calculateHash(requested_file.read())

        try:
            found_modelphoto= models.ModelPhoto.objects.get(contents_hash=found_hash)
        except models.ModelPhoto.DoesNotExist:
            pass

        try:
            copyright_str = exif_dict["0th"][piexif.ImageIFD.Copyright]
        except :
            copyright_str = ''
        try :
            modelphoto_data = serializers.ModelPhotoDetailSerializer(found_modelphoto).data
        except : 
            modelphoto_data = None
        ret_data = {
            'status': '1',
            'message': 'Succes to verify song',
            'result': {
                'copyright': copyright_str,
                'hash': str(found_hash),
                'modelphoto': modelphoto_data
            }
        }
        return Response(data=ret_data, status=status.HTTP_200_OK) 
