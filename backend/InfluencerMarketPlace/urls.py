from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_request, name='login_request'),
    path('register/', views.register_request, name='register_request'),
    path('ran5/', views.ran_filter, name='ran_filter'),
    path('filter/', views.course_filter, name='course_filter'),
]
