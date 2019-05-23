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

class PurchaseGem(APIView):
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
            gem_list = models.PurchaseGem.objects.filter(creator__id = user_id)
        except models.PurchaseGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get purchase gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.PurchaseGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get purchase gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = request.user
        if user_id is not user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        
        requested_purchase_amount = request.data.get('amount', None)
        new_purchase_gem = models.PurchaseGem.objects.create(
            creator = found_user,
            amount = requested_purchase_amount,
            purchase_type = request.data.get('purchase_type', None),
        )
        new_purchase_gem.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to save purchase gem',
            'result': ""
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class ConsumptionGem(APIView):
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
            gem_list = models.ConsumptionGem.objects.filter(creator__id = user_id)
        except models.ConsumptionGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get consumption gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.ConsumptionGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get consumption gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = request.user
        if user_id is not user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        request_consumption_amount = request.data.get('amount', None)
        if int(found_user.gem_amount) < int(request_consumption_amount[0]):
            ret_data = {
                'status': '0',
                'message': 'gem is not enough',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
            
        new_consumption_gem = models.ConsumptionGem.objects.create(
            creator = found_user,
            amount = request_consumption_amount,
            consumption_type = request.data.get('consumption_type', None),
        )
        new_consumption_gem.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to save consumption gem',
            'result': ""
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class BonusGem(APIView):
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
            gem_list = models.BonusGem.objects.filter(creator__id = user_id)
        except models.BonusGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get bonus gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.BonusGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get bonus gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = request.user
        if user_id is not user.id and isStaff(username=user.username) is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_user = user_models.User.objects.get(id=user.id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
            
        new_bonus_gem = models.BonusGem.objects.create(
            creator = found_user,
            amount = request.data.get('amount', None),
            bonus_type = request.data.get('bonus_type', None),
        )
        new_bonus_gem.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to save bonus gem',
            'result': "",
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class ListAllPurchaseGem(APIView):
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
            gem_list = models.PurchaseGem.objects.all()
        except models.PurchaseGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get purchase gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.PurchaseGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get purchase gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllConsumptionGem(APIView):
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
            gem_list = models.ConsumptionGem.objects.all()
        except models.ConsumptionGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get consumption gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.ConsumptionGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get consumption gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllBonusGem(APIView):
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
            gem_list = models.BonusGem.objects.all()
        except models.BonusGem.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get bonus gem list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)             

        serializer = serializers.BonusGemSerializer(gem_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get bonus gem list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)



        