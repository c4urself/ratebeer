from django.conf import settings
from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin

from tastypie.api import Api
from ratebeer.main.api.resources import (BeerResource, RatingResource,
                                         UserResource)

v1_api = Api(api_name='v1')
v1_api.register(BeerResource())
v1_api.register(RatingResource())
v1_api.register(UserResource())

admin.autodiscover()


urlpatterns = patterns('',
    url(r'^$', 'ratebeer.main.views.home', name='home'),
    url(r'^login/?$', 'ratebeer.main.views.login_view', name='login'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
    url(r'^add/$', 'ratebeer.main.views.add', name='add'),
    url(r'^logout/$', 'ratebeer.main.views.logout_view', name='logout'),
)

urlpatterns += patterns('',
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT,
    }),
)


