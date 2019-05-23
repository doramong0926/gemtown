from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission, AllowAny, IsAdminUser, IsAuthenticated
from . import models, serializers
from gemtown.users import models as user_models
from gemtown.musicians import models as musician_models
from gemtown.copyrights import models as copyright_models
from gemtown.gems import models as gem_models
from django.conf import settings

import json
import mutagen
from mutagen.easyid3 import EasyID3

from gemtown.utils.web3_control import registerMusicCopyright, getCopyrightId
from gemtown.utils.hash import calculateHash, string2numeric_hash


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

class Register(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
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
            found_musician = musician_models.Musician.objects.get(creator__id=user_id)
        except musician_models.Musician.DoesNotExist:
            found_musician = musician_models.Musician.objects.create(
                creator = found_user,
                nickname = request.data.get('musician_nickname', None),
            )
            found_musician.save()

        isApiTestMode = isAPITestMode()
        if user.id is not found_user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Fail to find musician',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        else:
            requested_cover_image_id = request.data.get('cover_image', None)
            if requested_cover_image_id != None:
                requested_cover_image_id = int(requested_cover_image_id)
                found_cover_image = models.CoverImage.objects.get(id=requested_cover_image_id)
            else :
                ret_data = {
                    'status': '0',
                    'message': 'fail to get cover_image.',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

            consumtion_amount = 10 + found_cover_image.price
            if found_user.gem_amount < consumtion_amount:
                ret_data = {
                    'status': '0',
                    'message': 'Gem is not enough.',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
            else:
                new_consumption_regisiter_song = gem_models.ConsumptionGem.objects.create(
                    creator = found_user,
                    amount = 10,
                    consumption_type = "register_song"
                )
                if found_cover_image.price != 0:
                    new_consumption_cover_image = gem_models.ConsumptionGem.objects.create(
                        creator = found_user,
                        amount = 10,
                        consumption_type = "buy_song_cover"
                    )

            requested_file = request.data.get('file', None)
            try:
                audio = mutagen.File(requested_file, easy=True)
            except:
                audio = EasyID3(requested_file)
            found_duration = int(audio.info.length)
            try:
                audio.add_tags()
            except:
                pass

            found_copyright_id = 0
            register_block_chain = request.data.get('register_block_chain', None)[0]
            if register_block_chain == '1':
                found_copyright_id = getCopyrightId()

            audio['copyright'] = "GEMTOWN" + ' PUBLISHER['+ found_musician.creator.username + ']' + ' HASHRIGHT ID[' + str(found_copyright_id) + ']'
            audio.save(requested_file)
            requested_file.seek(0)

            found_hash = calculateHash(requested_file.read())
            #parseInt_hash = string2numeric_hash(found_hash)

            try:
                txid = 0
                if register_block_chain == '1':
                    hashright_URI = {
                        "description" : "Hashright metadata of content.",
                        "hash" : str(found_hash),
                        "properties": {
                            "contents_type": "music",
                            "publisher" : found_musician.creator.username,
                            "country" : found_musician.creator.get_country_display(),
                            "vender" : "Gemtown",
                            "vender_homepage": settings.GEMTOWN_URL
                        }
                    }
                    txid = registerMusicCopyright(
                        found_copyright_id,
                        json.dumps(hashright_URI)
                    )

                new_song = models.Song.objects.create(
                    creator = found_user,
                    file = requested_file,
                    cover_image_custom = request.data.get('cover_image_custom', None),
                    cover_image = found_cover_image,
                    album_title = request.data.get('album_title', None),
                    title = request.data.get('title', None),
                    musician = found_musician,
                    description = request.data.get('description', None),
                    career = request.data.get('career', None),
                    genre = request.data.get('genre', None),
                    genre_detail = request.data.get('genre_detail', None),
                    duration = found_duration,
                    blockchain_id=str(found_copyright_id),
                    blockchain_txid=txid,
                    contents_hash=str(found_hash),
                )
                if txid is not 0:
                    new_copyright = copyright_models.MusicCopyright.objects.create(
                        creator = found_user,
                        song = new_song,
                        block_chain_id = str(found_copyright_id),
                        block_chain_txid = txid,
                        confirm_status = 'ready',
                    )
            except:
                ret_data = {
                    'status': '0',
                    'message': 'fail to get cover_image.',
                    'result': '',
                }
                return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

            new_song.save()
            if txid is not 0:
                new_copyright.save()

            new_consumption_regisiter_song.save()

            if (found_cover_image is not None):
                found_cover_image.buyer.add(found_user)
                found_cover_image.save()
                if found_cover_image.price != 0:
                    new_consumption_cover_image.save()

            ret_data = {
                'status': '1',
                'message': 'Succes to register song',
                'result': ''
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Unregister(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        isApiTestMode = isAPITestMode()
        if found_song.creator.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'Authentication fail',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)

        else:
            found_song.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to delete song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class ListAllSongs(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):
        try:
            song_list = models.Song.objects.all()
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get song list',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SongSerializer(song_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get song list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListNewSongs(APIView):
    permission_classes = [AllowAny]
    def post(self, request, num_of_song, format=None):
        json_object=None
        genre_querry = None
        genre_detail_querry = None
        career_querry = None

        try:
            json_object = json.loads(request.body)
        except:
            genre_querry = None
            genre_detail_querry = None
            career_querry = None

        if json_object:
            try:
                genre_querry = json_object['genre']
            except:
                genre_querry = None
            try:
                genre_detail_querry = json_object['genre_detail']
            except:
                genre_detail_querry = None
            try:
                career_querry = json_object['career']
            except:
                career_querry = None

        try:
            song_list = models.Song.objects.select_related('cover_image', 'musician', 'creator').all().prefetch_related('cover_image', 'musician', 'creator')

            if (genre_querry is not None or genre_detail_querry is not None or career_querry is not None) and len(genre_querry):
                song_list = song_list.filter(genre__in=genre_querry, genre_detail__in=genre_detail_querry, career__in=career_querry)
            #if genre_detail_querry is not None and len(genre_detail_querry):
            #    song_list = song_list.filter(genre_detail__in=genre_detail_querry)
            #if career_querry is not None and len(career_querry):
            #    song_list = song_list.filter(career__in=career_querry)
            if num_of_song != 'all':
                song_list = song_list[:int(num_of_song)]
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SongSerializer(song_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get new song list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListPopularSongs(APIView):
    permission_classes = [AllowAny]
    def post(self, request, num_of_song, format=None):
        json_object=None
        genre_querry = None
        genre_detail_querry = None
        career_querry = None

        try:
            json_object = json.loads(request.body)
        except:
            genre_querry = None
            genre_detail_querry = None
            career_querry = None

        if json_object:
            try:
                genre_querry = json_object['genre']
            except:
                genre_querry = None
            try:
                genre_detail_querry = json_object['genre_detail']
            except:
                genre_detail_querry = None
            try:
                career_querry = json_object['career']
            except:
                career_querry = None

        try:
            song_list = models.Song.objects.select_related('cover_image', 'musician', 'creator').all().prefetch_related('cover_image', 'musician', 'creator')
            if (genre_querry is not None or genre_detail_querry is not None or career_querry is not None) and len(genre_querry):
                song_list = song_list.filter(genre__in=genre_querry, genre_detail__in=genre_detail_querry, career__in=career_querry)
            #if genre_detail_querry is not None and len(genre_detail_querry):
             #   song_list = song_list.filter(genre_detail__in=genre_detail_querry)
            #if career_querry is not None and len(career_querry):
            #    song_list = song_list.filter(career__in=career_querry)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)
        if num_of_song == 'all':
            sorted_list = sorted(song_list, key=lambda song: song.play_count, reverse=True)
        else:
            sorted_list = sorted(song_list, key=lambda song: song.play_count, reverse=True)[:int(num_of_song)]

        serializer = serializers.SongSerializer(sorted_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get popular song list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class ListMyPostSongs(APIView):
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
            song_list = models.Song.objects.filter(creator=found_user)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SongSerializer(song_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get mypost song list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class Song(APIView):
    permission_classes = [AllowAny]
    def get(self, request, song_id, format=None):
        try:
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get song detail infomation',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.SongDetailSerializer(found_song)
        ret_data = {
            'status': '1',
            'message': 'Succes to get song detail infomation',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class Like(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.LikeOfSong.objects.get(
                creator=found_user,
                song=found_song
            )
            ret_data = {
                'status': '1',
                'message': 'Already like is registed',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.LikeOfSong.DoesNotExist:
            new_like = models.LikeOfSong.objects.create(
                creator = found_user,
                song = found_song,
            )
            new_like.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to like',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Unlike(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.LikeOfSong.objects.get(
                creator = found_user,
                song = found_song
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
        except models.LikeOfSong.DoesNotExist:
            ret_data = {
                'status': '1',
                'message': 'Already unlike',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Play(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            pre_exisiting_play = models.PlayOfSong.objects.get(
                creator=found_user,
                song=found_song
            )
            ret_data = {
                'status': '1',
                'message': 'Already play is registed',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.PlayOfSong.DoesNotExist:
            new_play = models.PlayOfSong.objects.create(
                creator = found_user,
                song = found_song,
            )
            new_play.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to add play',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Download(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_download = models.DownloadOfSong.objects.get(
                creator=found_user,
                song=found_song
            )
            ret_data = {
                'status': '1',
                'message': 'Already download is registed',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)
        except models.DownloadOfSong.DoesNotExist:
            new_download = models.DownloadOfSong.objects.create(
                creator = found_user,
                song = found_song,
            )
            new_download.save()
            ret_data = {
                'status': '1',
                'message': 'Succes to add download',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class Comment(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id, format=None):
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
            found_song = models.Song.objects.get(id=song_id)
        except models.Song.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find song',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        new_comment = models.CommentOfSong.objects.create(
            creator = found_user,
            song = found_song,
            comment = request.data.get('comment', None),
        )
        new_comment.save()
        ret_data = {
            'status': '1',
            'message': 'Succes to comment',
            'result': '',
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


class Uncomment(APIView):
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
            found_comment = models.CommentOfSong.objects.get(id=comment_id)
        except models.CommentOfSong.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find comment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        isApiTestMode = isAPITestMode()
        if found_comment.creator.id is not user.id and isApiTestMode is False:
            ret_data = {
                'status': '0',
                'message': 'who are you?',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            found_comment.delete()
            ret_data = {
                'status': '1',
                'message': 'Succes to uncomment',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_200_OK)


class CoverImage(APIView):
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
            found_user = user_models.User.objects.get(id=user_id)
        except user_models.User.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to get user',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            cover_image_list = models.CoverImage.objects.all()
        except models.CoverImage.DoesNotExist:
            ret_data = {
                'status': '0',
                'message': 'Fail to find coverimage',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CoverImageSerializer(cover_image_list, many=True)
        ret_data = {
            'status': '1',
            'message': 'Succes to get cover_image list',
            'result': serializer.data,
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)

class VerifySong(APIView):
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
        requested_file.seek(0)
        found_hash = calculateHash(requested_file.read())

        try:
            found_song = models.Song.objects.get(contents_hash=found_hash)
        except models.Song.DoesNotExist:
            pass

        try:
            audio = mutagen.File(requested_file, easy=True)
        except:
            ret_data = {
                'status': '0',
                'message': 'There is no ID3 Tag',
                'result': '',
            }
            return Response(data=ret_data, status=status.HTTP_404_NOT_FOUND)

        try:
            copyright_str = audio['copyright'][0]
        except :
            copyright_str = ''
        try :
            song_data = serializers.SongDetailSerializer(found_song).data
        except :
            song_data = None
        ret_data = {
            'status': '1',
            'message': 'Succes to verify song',
            'result': {
                'copyright': copyright_str,
                'hash': str(found_hash),
                'song': song_data
            }
        }
        return Response(data=ret_data, status=status.HTTP_200_OK)


