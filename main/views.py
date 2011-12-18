import random
import string

from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django import forms

from ratebeer.main.models import Beer


class LoginForm(forms.Form):
    email = forms.EmailField()


class BeerForm(forms.ModelForm):

    class Meta:
        model = Beer
        exclude = ['number',]
        attrs = {'description': {'rows': 3}}

def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            params = {
                'email': email,
                'username': email[0:30],
                'password': ''.join(random.choice(string.letters) for i in xrange(10)),
            }
            user, new = User.objects.get_or_create(email=email, defaults=params)
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            return HttpResponseRedirect("/")
    else:
        form = LoginForm()
    
    return render(request, "login.html", {'form': form})


def add(request):
    if request.method == 'POST':
        form = BeerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/")
    else:
        form = BeerForm()
    return render(request, "form.html", {'form': form})


def home(request):
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/login/')
    return render(request, "index.html", {})
