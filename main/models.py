import re
import os

from django.db import models

file_regex_pattern = \
     r'''(?P<path_to>^.*/)''' \
     r'''(?P<file_name>.*\.(JPG|PNG|GIF|JPEG|BMP|jpg|jpeg|png|gif|bmp))$'''


class Beer(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    picture = models.ImageField(upload_to="beers")
    number = models.IntegerField(default=0)

    def save(self, *args, **kwargs):

        def resize_image(self, img):
            """
            Resize image
            """
            try:
                try:
                    from PIL import Image
                except:
                    import Image

                file_name = str(img.field.get_filename(img.path))
                path_string = str(img.path)
                reval = re.search(file_regex_pattern, str(img.path))

                path_to = reval.group('path_to')
                file_name = reval.group('file_name')
                thumb_img = Image.open(path_string)
                thumb_img.thumbnail((250, 250), Image.ANTIALIAS)
                thumb_img.save(path_to + file_name)

            except Exception, e:
                raise(e)

        self.number = self.ratings.count()
        firsttime = not self.pk

        super(Beer, self).save(*args, **kwargs)
        
        if firsttime:
            for field in self._meta._fields():
                if field.__class__ is models.ImageField and \
                                field.value_from_object(self):
                    resize_image(self, field.value_from_object(self))        
        
    def __unicode__(self):
        return self.title


class Rating(models.Model):
    user = models.ForeignKey('auth.User')
    beer = models.ForeignKey('main.Beer', related_name="ratings")
    
    def save(self, *args, **kwargs):
        return super(Rating, self).save(*args, **kwargs)

    class Meta:
        unique_together = ('user', 'beer')



