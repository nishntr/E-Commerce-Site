from django.urls import include, path
from .views import CheckoutView, ProductView, StatusView, Orders
from django.views.generic.base import RedirectView
from rest_framework import routers

app_name = 'payment'

router = routers.DefaultRouter()
router.register('products', ProductView, 'Products')

urlpatterns = [
    path('', include(router.urls)),
    path('checkout', CheckoutView.as_view(), name='checkout'),
    path('status', StatusView.as_view(), name='status'),
    path('orders', Orders.as_view(), name='orders'),
    path('redirect', RedirectView.as_view(
        url='http://localhost:3000'), name='redirect'),
]
