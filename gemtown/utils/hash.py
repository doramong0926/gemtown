
from django.conf import settings
import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

def encryptData(data): 
    data = data + settings.ENCRYPT_SEPERATOR_STR
    BLOCK_SIZE=64
    secretkey = hashlib.sha256(settings.SECRET_KEY_FOR_FILE_HASH.encode('utf-8')).digest()
    cipher = AES.new(secretkey, AES.MODE_ECB)
    return base64.b64encode(cipher.encrypt(pad(data.encode("utf-8"), BLOCK_SIZE))).decode("utf-8")

def decryptData(data):
    secretkey = hashlib.sha256(settings.SECRET_KEY_FOR_FILE_HASH.encode('utf-8')).digest()
    cipher = AES.new(secretkey, AES.MODE_ECB)
    return cipher.decrypt(base64.b64decode(data)).decode("utf-8").split(settings.ENCRYPT_SEPERATOR_STR)[0]


def string2numeric_hash(data):    
    return int(data[:], 16)
    
def calculateHash(data) :
    return hashlib.md5(data).hexdigest()