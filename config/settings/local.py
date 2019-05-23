from .base import *  # noqa
from .base import env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env('DJANGO_SECRET_KEY', default='6gLzw84NKoH0EP6GogdG4AJsR4yMMUq0jPeAHPgUAgh74qGc1LGVIc4IMeg3z9Lm')
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    "localhost",
    "0.0.0.0",
    "127.0.0.1",
]

# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': ''
    }
}

# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG  # noqa F405

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
#EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
# https://docs.djangoproject.com/en/dev/ref/settings/#email-host
#EMAIL_HOST = 'localhost'
# https://docs.djangoproject.com/en/dev/ref/settings/#email-port
#EMAIL_PORT = 1025
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
EMAIL_USE_TLS = True
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_HOST_USER = env('EAMIL_ADDRESS')
EMAIL_HOST_PASSWORD = env('EMAIL_PASSWORD')
SERVER_EMAIL = env('EAMIL_ADDRESS')
DEFAULT_FORM_MAIL = env('EAMIL_ID')

# django-debug-toolbar
# ------------------------------------------------------------------------------
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites
INSTALLED_APPS += ['debug_toolbar']  # noqa F405
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']  # noqa F405
# https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#debug-toolbar-config
DEBUG_TOOLBAR_CONFIG = {
    'DISABLE_PANELS': [
        'debug_toolbar.panels.redirects.RedirectsPanel',
    ],
    'SHOW_TEMPLATE_CONTEXT': True,
}
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ['127.0.0.1', '10.0.2.2']


# django-extensions
# ------------------------------------------------------------------------------
# https://django-extensions.readthedocs.io/en/latest/installation_instructions.html#configuration
INSTALLED_APPS += ['django_extensions']  # noqa F405

# Your stuff...
# ------------------------------------------------------------------------------
SECRET_KEY_FOR_FILE_HASH = env('SECRET_KEY_FOR_FILE_HASH')
ENCRYPT_SEPERATOR_STR = env('ENCRYPT_SEPERATOR_STR')

ETHERSCAN_API_KEY=env('ETHERSCAN_API_KEY')
INFURA_API_KEY=env('INFURA_API_KEY')

GEMTOWN_MUSIC_COPYRIGHT_ADDR = env('GEMTOWN_MUSIC_COPYRIGHT_ADDR')
GEMTOWN_MUSIC_COPYRIGHT_PRIVATE_KEY = env('GEMTOWN_MUSIC_COPYRIGHT_PRIVATE_KEY')
GEMTOWN_MODEL_COPYRIGHT_ADDR = env('GEMTOWN_MODEL_COPYRIGHT_ADDR')
GEMTOWN_MODEL_COPYRIGHT_PRIVATE_KEY = env('GEMTOWN_MODEL_COPYRIGHT_PRIVATE_KEY')

GEMTOWN_CONTRACT_ADDR = env('GEMTOWN_CONTRACT_ADDR')
GEMTOWN_OWNER_ADDR = env('GEMTOWN_OWNER_ADDR')
GEMTOWN_OWNER_PRIVATE_KEY = env('GEMTOWN_OWNER_PRIVATE_KEY')

CHAIN_ID_MAINNET=1
CHAIN_ID_ROPSTEN=3
GEMTOWN_COPYRIGHT_TEXT = '2019 GEMTOWN CORP. ALL RIGHTS RESERVED.'
GEMTOWN_URL = "https://www.gemtown.co.kr"
