# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Deleting field 'Beer.rating'
        db.delete_column('main_beer', 'rating_id')

        # Adding field 'Beer.number'
        db.add_column('main_beer', 'number', self.gf('django.db.models.fields.IntegerField')(default=0), keep_default=False)

        # Deleting field 'Rating.number'
        db.delete_column('main_rating', 'number')

        # Adding field 'Rating.user'
        db.add_column('main_rating', 'user', self.gf('django.db.models.fields.related.ForeignKey')(default=0, to=orm['auth.User']), keep_default=False)

        # Adding field 'Rating.beer'
        db.add_column('main_rating', 'beer', self.gf('django.db.models.fields.related.ForeignKey')(default=0, related_name='ratings', to=orm['main.Beer']), keep_default=False)

        # Removing M2M table for field users on 'Rating'
        db.delete_table('main_rating_users')


    def backwards(self, orm):
        
        # Adding field 'Beer.rating'
        db.add_column('main_beer', 'rating', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['main.Rating'], null=True), keep_default=False)

        # Deleting field 'Beer.number'
        db.delete_column('main_beer', 'number')

        # Adding field 'Rating.number'
        db.add_column('main_rating', 'number', self.gf('django.db.models.fields.IntegerField')(default=0), keep_default=False)

        # Deleting field 'Rating.user'
        db.delete_column('main_rating', 'user_id')

        # Deleting field 'Rating.beer'
        db.delete_column('main_rating', 'beer_id')

        # Adding M2M table for field users on 'Rating'
        db.create_table('main_rating_users', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('rating', models.ForeignKey(orm['main.rating'], null=False)),
            ('user', models.ForeignKey(orm['auth.user'], null=False))
        ))
        db.create_unique('main_rating_users', ['rating_id', 'user_id'])


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'main.beer': {
            'Meta': {'object_name': 'Beer'},
            'description': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'number': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'picture': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'})
        },
        'main.rating': {
            'Meta': {'object_name': 'Rating'},
            'beer': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'ratings'", 'to': "orm['main.Beer']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"})
        }
    }

    complete_apps = ['main']
