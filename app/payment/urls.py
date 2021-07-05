from django.urls import include, path
from .views import CheckoutView, ProductView, StatusView, OrdersList, OrdersDelete
from django.views.generic.base import RedirectView
from rest_framework import routers

app_name = 'payment'

router = routers.DefaultRouter()
router.register('products', ProductView, 'Products')

urlpatterns = [
    path('', include(router.urls)),
    path('checkout', CheckoutView.as_view(), name='checkout'),
    path('status', StatusView.as_view(), name='status'),
    path('orders', OrdersList.as_view(), name='orders'),
    path('orders/<int:pk>/delete', OrdersDelete.as_view(), name='delete'),
    path('redirect', RedirectView.as_view(
        url='https://e-shopp-react.netlify.app/orders'), name='redirect'),
]
