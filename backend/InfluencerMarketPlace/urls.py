from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_request, name='login_request'),
    path('register/', views.register_request, name='register_request'),
    path('initialSearch/', views.initialSearch, name='initialSearch'),
    path('filter/', views.course_filter, name='course_filter'),
]
