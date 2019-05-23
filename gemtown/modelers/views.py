from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers


import json
from django.conf import settings
from gemtown.users import models as user_models
from gemtown.modelphotos import models as modelphoto_models
from gemtown.copyrights import models as copyright_models
from gemtown.gems import models as gem_models

from gemtown.utils.web3_control import registerModelCopyright, getCopyrightId
from gemtown.utils.hash import decryptData, encryptData, calculateHash, string2numeric_hash

from PIL import Image
import piexif
import base64
from django.core.files.base import ContentFile
import os
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile

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

class ListNewModelers(APIView):
    permission_classes = [AllowAny]
    def post(self, request, num_of_modeler, format=None):
        json_object=None
        gender_querry = None
        age_range_querry = None
        job_querry = None
        entertainment_querry = None
        style_querry = None
        career_querry = None
        try:
            json_object = json.loads(request.body)
        except:
            gender_querry = None
            age_range_querry = None
            job_querry = None
            entertainment_querry = None
            style_querry = None
            career_querry = None

        if json_object:
            try:
                gender_querry = json_object['gender']
            except:
                gender_querry = None
            try:
                age_range_querry = json_object['age_range']
            except:
                age_range_querry = None
            try:
                job_querry = json_object['job']
            except:
                job_querry = None
            try:
                entertainment_querry = json_object['entertainment']
            except:
                entertainment_querry = None
            try:
                style_querry = json_object['style']
            except:
                style_querry = None
            try:
                career_querry = json_object['career']
            except:
                career_querry = None

        try:
            modeler_list = models.Modeler.objects.select_related('creator').all().prefetch_related('creator')
            if (gender_querry is not None or age_range_querry is not None or job_querry is not None or entertainment_querry is not None or style_querry is not None or career_querry is not None) and len(gender_querry):
                modeler_list = modeler_list.filter(gender__in=gender_querry, age_range__in=age_range_querry, job__in=job_querry, entertainment__in=entertainment_querry, style__in=style_querry, career__in=career_querry)

            #if gender_querry is not None and len(gender_querry):
            #    modeler_list = modeler_list.filter(gender__in=gender_querry)
            #if age_range_querry is not None and len(age_range_querry):
            #    modeler_list = modeler_list.filter(age_range__in=age_range_querry)
            #if job_querry is not None and len(job_querry):
            #    modeler_list = modeler_list.filter(job__in=job_querry)
            #if entertainment_querry is not None and len(entertainment_querry):
            #    modeler_list = modeler_list.filter(entertainment__in=entertainment_querry)
            #if style_querry is not None and len(style_querry):
            #    modeler_list = modeler_list.filter(style__in=style_querry)
            #if career_querry is not None and len(career_querry):
            #    modeler_list = modeler_list.filter(career__in=career_querry)

            if num_of_modeler != 'all':
                modeler_list = modeler_list[:int(num_of_modeler)]
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modeler list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelerSerializer(modeler_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get new modeler list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListPopularModelers(APIView):
    permission_classes = [AllowAny]
    def post(self, request, num_of_modeler, format=None):
        json_object=None
        gender_querry = None
        age_range_querry = None
        job_querry = None
        entertainment_querry = None
        style_querry = None
        career_querry = None
        try:
            json_object = json.loads(request.body)
        except:
            gender_querry = None
            age_range_querry = None
            job_querry = None
            entertainment_querry = None
            style_querry = None
            career_querry = None

        if json_object:
            try:
                gender_querry = json_object['gender']
            except:
                gender_querry = None
            try:
                age_range_querry = json_object['age_range']
            except:
                age_range_querry = None
            try:
                job_querry = json_object['job']
            except:
                job_querry = None
            try:
                entertainment_querry = json_object['entertainment']
            except:
                entertainment_querry = None
            try:
                style_querry = json_object['style']
            except:
                style_querry = None
            try:
                career_querry = json_object['career']
            except:
                career_querry = None


        try:
            modeler_list = models.Modeler.objects.select_related('creator').all().prefetch_related('creator')

            if (gender_querry is not None or age_range_querry is not None or job_querry is not None or entertainment_querry is not None or style_querry is not None or career_querry is not None) and len(gender_querry):
                modeler_list = modeler_list.filter(gender__in=gender_querry, age_range__in=age_range_querry, job__in=job_querry, entertainment__in=entertainment_querry, style__in=style_querry, career__in=career_querry)

            #if gender_querry is not None and len(gender_querry):
            #    modeler_list = modeler_list.filter(gender__in=gender_querry)
            #if age_range_querry is not None and len(age_range_querry):
            #    modeler_list = modeler_list.filter(age_range__in=age_range_querry)
            #if job_querry is not None and len(job_querry):
            #    modeler_list = modeler_list.filter(job__in=job_querry)
            #if entertainment_querry is not None and len(entertainment_querry):
            #    modeler_list = modeler_list.filter(entertainment__in=entertainment_querry)
            #if style_querry is not None and len(style_querry):
            #    modeler_list = modeler_list.filter(style__in=style_querry)
            #if career_querry is not None and len(career_querry):
            #    modeler_list = modeler_list.filter(career__in=career_querry)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        if num_of_modeler == 'all':
            sorted_list = sorted(modeler_list, key=lambda modeler: modeler.like_count, reverse=True)
        else:
            sorted_list = sorted(modeler_list, key=lambda modeler: modeler.like_count, reverse=True)[:int(num_of_modeler)]

        serializer = serializers.ModelerSerializer(sorted_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get popular modeler list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllModelers(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        try:
            modeler_list = models.Modeler.objects.all()
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modeler list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelerSerializer(modeler_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modeler list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class Modeler(APIView):
    permission_classes = [AllowAny]
    def get(self, request, modeler_id, format=None):
        try:
            found_modeler = models.Modeler.objects.get(id=modeler_id)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get modeler detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ModelerDetailSerializer(found_modeler)
        ret_data = {
            'status': '1',
            'message': 'Succes to get modeler detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ModelerRegister(APIView):
    permission_classes = [IsAuthenticated]
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

        isApiTestMode = isAPITestMode()
        if found_user.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_modeler = models.Modeler.objects.create(
                creator = found_user,
                nickname = request.data.get('nickname', None),
            )

            new_modeler.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to register modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except :
            ret_data = {
                'status': '0',
                'message': 'Fail to register modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)


class ModelerUnregister(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, modeler_id, format=None):
        user = request.user
        try:
            found_modeler = models.Modeler.objects.get(id=modeler_id)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            found_user = user_models.User.objects.get(id=found_modeler.creator.id)
        except user_models.User.DoesNotExist:
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
            found_modeler.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to delete modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)

class AddModelerProfile(APIView):
    permission_classes = [IsAuthenticated]
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

        isApiTestMode = isAPITestMode()
        if found_user.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            found_modeler = models.Modeler.objects.get(creator_id=user_id)
            ret_data = {
                'status': '0',
                'message': 'Modeler already registed',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        except models.Modeler.DoesNotExist:
            pass

        consumtion_amount = 10
        if found_user.gem_amount < consumtion_amount:
            ret_data = {
                'status': '0',
                'message': 'Gem is not enough.',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            new_consumption_regisiter_model_photo = gem_models.ConsumptionGem.objects.create(
                creator = found_user,
                amount = 10,
                consumption_type = "register_model_photo"
            )

        try:
            new_modeler = models.Modeler.objects.create(
                creator = found_user,
                nickname = found_user.username,
                description = request.data.get('description', None),
                gender = request.data.get('gender', None),
                age_range = request.data.get('age_range', None),
                job = request.data.get('job', None),
                entertainment = request.data.get('entertainment', None),
                style = request.data.get('style', None),
                career = request.data.get('career', None),
                height = request.data.get('height', None),
                weight = request.data.get('weight', None),
                blood_type = request.data.get('blood_type', None),
                age = request.data.get('age', None),
                bust = request.data.get('bust', None),
                wiast = request.data.get('wiast', None),
                hip = request.data.get('hip', None),
                birth_year = request.data.get('birth_year', None),
                birth_month = request.data.get('birth_month', None),
                birth_day = request.data.get('birth_day', None),
            )
            register_block_chain =  request.data.get('register_block_chain', None)[0]
        except:
            ret_data = {
                'status': '0',
                'message': 'Fail to register modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            cover_file = request.data.get('cover_image', None)
            full_file = request.data.get('full_image', None)
            half_file = request.data.get('half_image', None)

            found_copyright_id = 0
            if register_block_chain == '1':
                found_copyright_id = getCopyrightId()

            requested_image = ContentFile(cover_file.read())
            im = Image.open(requested_image)
            exif_dict = piexif.load(im.info["exif"])
            copyrigt_str = 'GEMTOWN' + ' PUBLISHER['+ new_modeler.creator.username + ']' + ' HASHRIGHT [' + str(found_copyright_id) + ']'
            exif_dict["0th"][piexif.ImageIFD.Copyright] = str(copyrigt_str)
            exif_bytes = piexif.dump(exif_dict)

            buffer = BytesIO()
            im.save(fp=buffer, format='JPEG', exif=exif_bytes)
            found_hash = calculateHash(buffer.getvalue())
            image_file = ContentFile(buffer.getvalue())
            file_name = cover_file.name

            txid = 0
            if register_block_chain == '1':
                hashright_URI = {
                    "description" : "Hashright metadata of content.",
                    "hash" : str(found_hash),
                    "properties": {
                        "contents_type": "photo",
                        "publisher" : new_modeler.creator.username,
                        "country" : new_modeler.creator.get_country_display(),
                        "vender" : "Gemtown",
                        "vender_homepage": settings.GEMTOWN_URL
                    }
                }
                txid = registerModelCopyright(
                    found_copyright_id,
                    json.dumps(hashright_URI)
                )
            try:
                new_model_photo_cover = modelphoto_models.ModelPhoto.objects.create(
                    creator = found_user,
                    modeler = new_modeler,
                    photo_type = 'cover',
                    file = InMemoryUploadedFile(
                        image_file,       # file
                        None,               # field_name
                        file_name,           # file name
                        'image/jpeg',       # content_type
                        image_file.tell,  # size
                        None
                    ),               # content_type_extra
                    contents_hash = str(found_hash),
                    blockchain_id = str(found_copyright_id),
                    blockchain_txid = txid
                )
            except Exception as e:
                print(e)

            if txid is not 0:
                new_model_photo_cover_copyright = copyright_models.ModelPhotoCopyright.objects.create(
                    creator = found_user,
                    modelphoto = new_model_photo_cover,
                    block_chain_id = str(found_copyright_id),
                    block_chain_txid = txid,
                    confirm_status = 'ready',
                )

            # model_full image
            found_copyright_id = 0
            if register_block_chain == '1':
                found_copyright_id = getCopyrightId()

            requested_image = ContentFile(full_file.read())
            im = Image.open(requested_image)
            exif_dict = piexif.load(im.info["exif"])
            copyrigt_str = 'GEMTOWN' + ' PUBLISHER['+ new_modeler.creator.username + ']' + ' HASHRIGHT [' + str(found_copyright_id) + ']'

            exif_dict["0th"][piexif.ImageIFD.Copyright] = str(copyrigt_str)
            exif_bytes = piexif.dump(exif_dict)
            buffer = BytesIO()
            im.save(fp=buffer, format='JPEG', exif=exif_bytes)
            found_hash = calculateHash(buffer.getvalue())
            image_file = ContentFile(buffer.getvalue())
            file_name = full_file.name

            txid = 0
            if register_block_chain == '1':
                hashright_URI = {
                    "description" : "Hashright metadata of content.",
                    "hash" : str(found_hash),
                    "properties": {
                        "contents_type": "photo",
                        "publisher" : new_modeler.creator.username,
                        "country" : new_modeler.creator.country,
                        "vender" : "Gemtown",
                        "vender_homepage": settings.GEMTOWN_URL
                    }
                }
                txid = registerModelCopyright(
                    found_copyright_id,
                    json.dumps(hashright_URI)
                )
            new_model_photo_full = modelphoto_models.ModelPhoto.objects.create(
                creator = found_user,
                modeler = new_modeler,
                photo_type = 'full',
                file = InMemoryUploadedFile(
                    image_file,       # file
                    None,               # field_name
                    file_name,           # file name
                    'image/jpeg',       # content_type
                    image_file.tell,  # size
                    None
                ),               # content_type_extra
                contents_hash = str(found_hash),
                blockchain_id = str(found_copyright_id),
                blockchain_txid = txid
            )
            if txid is not 0:
                new_model_photo_full_copyright = copyright_models.ModelPhotoCopyright.objects.create(
                    creator = found_user,
                    modelphoto = new_model_photo_full,
                    block_chain_id = str(found_copyright_id),
                    block_chain_txid = txid,
                    confirm_status = 'ready',
                )

            # model_half image
            found_copyright_id = 0
            if register_block_chain == '1':
                found_copyright_id = getCopyrightId()

            requested_image = ContentFile(half_file.read())
            im = Image.open(requested_image)
            exif_dict = piexif.load(im.info["exif"])
            copyrigt_str = 'GEMTOWN' + ' PUBLISHER['+ new_modeler.creator.username + ']' + ' HASHRIGHT [' + str(found_copyright_id) + ']'
            exif_dict["0th"][piexif.ImageIFD.Copyright] = str(copyrigt_str)
            exif_bytes = piexif.dump(exif_dict)
            buffer = BytesIO()
            im.save(fp=buffer, format='JPEG', exif=exif_bytes)
            found_hash = calculateHash(buffer.getvalue())
            image_file = ContentFile(buffer.getvalue())
            file_name = half_file.name

            txid = 0
            if register_block_chain == '1':
                hashright_URI = {
                    "description" : "Hashright metadata of content.",
                    "hash" : str(found_hash),
                    "properties": {
                        "contents_type": "photo",
                        "publisher" : new_modeler.creator.username,
                        "country" : new_modeler.creator.country,
                        "vender" : "Gemtown",
                        "vender_homepage": settings.GEMTOWN_URL
                    }
                }
                txid = registerModelCopyright(
                    found_copyright_id,
                    json.dumps(hashright_URI)
                )
            new_model_photo_half = modelphoto_models.ModelPhoto.objects.create(
                creator = found_user,
                modeler = new_modeler,
                photo_type = 'half',
                file = InMemoryUploadedFile(
                    image_file,       # file
                    None,               # field_name
                    file_name,           # file name
                    'image/jpeg',       # content_type
                    image_file.tell,  # size
                    None
                ),               # content_type_extra
                contents_hash = str(found_hash),
                blockchain_id = str(found_copyright_id),
                blockchain_txid = txid
            )

            if txid is not 0:
                new_model_photo_half_copyright = copyright_models.ModelPhotoCopyright.objects.create(
                    creator = found_user,
                    modelphoto = new_model_photo_half,
                    block_chain_id = str(found_copyright_id),
                    block_chain_txid = txid,
                    confirm_status = 'ready',
                )
        except:
            ret_data = {
                'status': '0',
                'message': 'Fail to register modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        new_modeler.save()
        new_model_photo_cover.save()
        new_model_photo_full.save()
        new_model_photo_half.save()
        new_consumption_regisiter_model_photo.save()

        if txid is not 0:
            new_model_photo_cover_copyright.save()
            new_model_photo_full_copyright.save()
            new_model_photo_half_copyright.save()

        ret_data = {
            'status': '1',
            'message': 'Succes to register modeler',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class ModelerLike(APIView):
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
            found_modeler = models.Modeler.objects.get(id=modeler_id)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.LikeOfModeler.objects.get(
                creator=found_user,
                modeler=found_modeler
            )
            ret_data = {
                'status': '1',
                'message': 'Already like is registed',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.LikeOfModeler.DoesNotExist:
            new_like = models.LikeOfModeler.objects.create(
                creator = found_user,
                modeler = found_modeler,
            )
            new_like.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to like',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class ModelerUnlike(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, modeler_id, format=None):
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
            found_modeler = models.Modeler.objects.get(id=modeler_id)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.LikeOfModeler.objects.get(
                creator = found_user,
                modeler = found_modeler
            )

            isApiTestMode = isAPITestMode()
            if preexisiting_like.creator.id is not user.id and isApiTestMode is False:
                ret_data = {
                    'status': '0',
                    'message': 'who are you?',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

            preexisiting_like.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to unlike',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.LikeOfModeler.DoesNotExist:
            ret_data = {
                'status': '1',
                'message': 'Already unlike',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class ModelerComment(APIView):
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
            found_modeler = models.Modeler.objects.get(id=modeler_id)
        except models.Modeler.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find modeler',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            new_comment = models.CommentOfModeler.objects.create(
                creator = found_user,
                modeler = found_modeler,
                comment = request.data.get('comment', None),
            )
            new_comment.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to comment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except:
            ret_data = {
                'status': '0',
                'message': 'Fail to comment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

class ModelerUnComment(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, comment_id, format=None):
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
            preexisiting_comment = models.CommentOfModeler.objects.get(id=comment_id)
            isApiTestMode = isAPITestMode()
            if preexisiting_comment.creator.id is not user.id and isApiTestMode is False:
                ret_data = {
                    'status': '0',
                    'message': 'who are you?',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

            preexisiting_comment.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to uncomment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.CommentOfModeler.DoesNotExist:
            ret_data = {
                'status': '1',
                'message': 'Already uncomment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
