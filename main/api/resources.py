from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from ratebeer.main.models import Beer, Rating
from tastypie.authorization import Authorization
from tastypie import fields

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['email']
        allowed_methods = ['get']


class BeerResource(ModelResource):
    #rating = fields.ToManyField('ratebeer.main.api.resources.RatingResource', 'ratings')

    class Meta:
        queryset = Beer.objects.all()
        authorization= Authorization()
        allowed_methods = ['get','post','put', 'delete']
        always_return_data = True

    def dehydrate(self, bundle):
        # add more to bundle? 
        bundle.data['user'] = bundle.request.user.pk
        try:
            current_rating = Rating.objects.get(beer=bundle.obj.pk, user=bundle.request.user.pk)
        except Rating.DoesNotExist:
            current_rating = None
        if current_rating:
            bundle.data['current_rating'] = current_rating.pk
        return bundle

class RatingResource(ModelResource):
    #user = fields.ForeignKey(UserResource, 'user')
    #beer = fields.ForeignKey(BeerResource, 'beer')
    
    def obj_create(self, bundle, request=None,  **kwargs):
        bundle.obj = self._meta.object_class()
        
        for key, value in kwargs.items():
            setattr(bundle.obj, key, value)
        
    
        
        bundle = self.full_hydrate(bundle)
        self.save_related(bundle)
        print "test"

        # Save the main object.
        bundle.obj.__dict__['user_id'] = request.user.pk
        bundle.obj.__dict__['beer_id'] = bundle.data['beer']
        bundle.obj.save()

        # Now pick up the M2M bits.
        m2m_bundle = self.hydrate_m2m(bundle)
        self.save_m2m(m2m_bundle)
        return bundle
        
        #print "came here"
        #rating = Rating.objects.create(user_id=bundle.data["user_id"], beer_id=bundle.data["beer"])
        #return rating
    
    def dehydrate(self, bundle):
        bundle.data['total'] = Rating.objects.filter(beer=bundle.obj.beer).count()
        return bundle


    def hydrate(self, bundle):
        return bundle

    class Meta:
        queryset = Rating.objects.all()
        authorization= Authorization()
        resource_name = 'rating'
        allowed_methods = ['get','post','delete']
        always_return_data = True
