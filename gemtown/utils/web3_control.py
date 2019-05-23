
from django.conf import settings
from web3 import Web3
from gemtown.utils.abi import gemtown_abi

from gemtown.copyrights import models as copyright_models

def getWeb3Provider(network):
    if network == settings.CHAIN_ID_MAINNET:
        return "https://infura.io/"+settings.INFURA_API_KEY
    elif network == settings.CHAIN_ID_ROPSTEN:
        return "https://ropsten.infura.io/"+settings.INFURA_API_KEY

def getWeb3Instance() :
    web3 = Web3(Web3.HTTPProvider(getWeb3Provider(settings.CHAIN_ID_ROPSTEN)))
    return web3

def registerAccount(web3, privatekey) :
    account = web3.eth.account.privateKeyToAccount(privatekey)
    #account.address
    #account.privateKey
    return account

def getGemtownContract(web3):
    contract = web3.eth.contract(address=settings.GEMTOWN_CONTRACT_ADDR, abi=gemtown_abi)
    return contract

def getCopyrightId():
    try :
        found_copyright_id = copyright_models.CopyrightId.objects.get(name='copyright_id')
        new_id = found_copyright_id.copyright_id + 1
        found_copyright_id.copyright_id = new_id
        found_copyright_id.save()
    except:
        new_copyright_id = copyright_models.CopyrightId.objects.create(
            name = 'copyright_id',
            copyright_id = 0,
        )
        new_copyright_id.save()
        new_id = 0
    return new_id

def registerMusicCopyright(id, uri_metadata):
    try:
        web3 = getWeb3Instance()
        account = registerAccount(web3, settings.GEMTOWN_OWNER_PRIVATE_KEY)
        my_contract = getGemtownContract(web3)    
        nonce = web3.eth.getTransactionCount(account.address, 'pending')
        txn = my_contract.functions.mint_token(
            settings.GEMTOWN_MUSIC_COPYRIGHT_ADDR,
            id,
            uri_metadata,
            "",
            "",
            ""  
        ).buildTransaction({
            'gas': 1000000,
            'gasPrice': web3.toWei('1', 'gwei'),
            'nonce': nonce,
        })
        signed_txn = web3.eth.account.signTransaction(txn, private_key=account.privateKey)
        found_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        return str(found_hash.hex()) 
    except Exception as e: 
        print(e)
        return None

def registerModelCopyright(id, uri_metadata):
    try : 
        web3 = getWeb3Instance()
        account = registerAccount(web3, settings.GEMTOWN_OWNER_PRIVATE_KEY)
        my_contract = getGemtownContract(web3)    
        nonce = web3.eth.getTransactionCount(account.address, 'pending')
        txn = my_contract.functions.mint_token(
            settings.GEMTOWN_MODEL_COPYRIGHT_ADDR,
            id,    
            uri_metadata,  
            "",
            "",
            "",
        ).buildTransaction({
            'gas': 1000000,
            'gasPrice': web3.toWei('1', 'gwei'),
            'nonce': nonce,
        })
        signed_txn = web3.eth.account.signTransaction(txn, private_key=account.privateKey)
        hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        return str(hash.hex()) 
    except Exception as e: 
        print(e)
        return None



    