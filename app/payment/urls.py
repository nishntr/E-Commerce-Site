from django.urls import include, path
from .views import CheckoutView, ProductView
from rest_framework import routers
app_name = 'payment'

router = routers.DefaultRouter()
router.register('products', ProductView, 'Products')

urlpatterns = [
    path('', include(router.urls)),
    path('checkout', CheckoutView.as_view(), name='checkout'),
]
