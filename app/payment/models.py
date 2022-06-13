from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.models import User
# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    img_url = models.CharField(max_length=300)
    stock = models.IntegerField()

    def get_name(self):
        return self.name

    def get_stock(self):
        return self.stock

    def __str__(self):
        return self.name


class Transaction(models.Model):
    user = models.ForeignKey(
        User, related_name="orders", on_delete=models.CASCADE)
    txnid = models.CharField(max_length=40, unique=True)
    product = models.ManyToManyField(Product)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    email = models.EmailField(max_length=40)
    date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

    # def get_username(self):
    #     return self.user.get_name()

    # def get_product_name(self):
    #     return self.product.get_name()

    def __str__(self):
        return self.txnid
