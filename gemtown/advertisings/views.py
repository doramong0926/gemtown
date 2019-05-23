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

class ListAllAdvertisings(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        try:
            advertising_list = models.Advertising.objects.select_related('creator').all()
        except models.Advertising.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get advertising list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.AdvertisingSerializer(advertising_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get adveritising list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

