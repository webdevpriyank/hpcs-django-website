from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    message = 'This is a plain text message'
    # return HttpResponse(message, content_type='text/plain')
    return render(request, 'website/home.html')
