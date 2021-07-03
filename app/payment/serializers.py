from rest_framework import serializers
from payment.models import Product, Transaction


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'txnid', 'product', 'email', 'amount']
