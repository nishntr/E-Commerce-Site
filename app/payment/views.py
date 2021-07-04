from accounts.models import User
# from django.views.decorators.csrf import csrf_exempt
import random
import string
import hashlib
from django.shortcuts import redirect, render
from .models import Transaction, Product
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework import permissions, status
from .serializers import ProductSerializer, TransactionSerializer
from rest_framework.response import Response

# sha512 vd2Y1X|k8WnSppfWj5dO5|10.00|iPhone|PayU User|test@gmail.com|||||||||||Brg97QyF
# test card 5123-4567-8901-2346 4012-0010-3714-1112 123 123456


class ProductView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CheckoutView(CreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        key = 'gtKFFx'
        salt = 'wia56q6O'
        print(request.data)
        name = request.user.name
        email = request.user.email

        product_ids = request.data['product_ids']
        amount = request.data['amount']
        names = request.data['names']
        txnid = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=24))

        try:
            serializer = self.get_serializer(data={
                'txnid': txnid,
                'product': product_ids,
                'user': request.user.id,
                'email': email,
                'amount': amount

            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            strg = key + '|' + txnid + '|' + str(amount) + '|' + \
                names + '|' + name + '|' + email + '|||||||||||' + salt
            hash = hashlib.sha512(strg.encode()).hexdigest()
            print()
            context = {
                'id': serializer.data['id'],
                'key': key,
                'salt': salt,
                'txnid': txnid,
                'amount': str(amount),
                'product': names,
                'name': name,
                'email': email,
                'surl': 'http://localhost:8000/status',
                'furl': 'http://localhost:8000/status',
                'hash': hash

            }
        except Exception as e:
            print(e)
            raise

        headers = self.get_success_headers(serializer.data)
        return Response(context, status=status.HTTP_201_CREATED, headers=headers)


class OrdersList(ListAPIView):
    serializer_class = TransactionSerializer
    permission_class = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.orders.all().order_by('-date')

    # def perform_update(self, serializer):
    #     serializer.save(status=True)


class OrdersDelete(DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_class = [permissions.IsAuthenticated]


class StatusView(APIView):

    def post(self, request, *args, **kwargs):
        status = request.POST.get('status')
        txnid = request.POST.get('txnid')

        t = Transaction.objects.get(txnid=txnid)
        if status == 'success':
            t.status = True
            t.save()
            print("completed for:" + t.user.name)
        return redirect('payment:redirect')

# @login_required(login_url='/login/')
# @csrf_exempt
# def status(request):
#     if request.method == "POST":
#         data = dict(request.POST)
#         status = request.POST.get('status')
#         txnid = request.POST.get('txnid')

#         t = Transaction.objects.get(txnid=txnid)
#         if status == 'success':
#             t.status = True
#             t.save()
#             print("completed for:" + t.user.name)

#         context = {
#             'txnid': txnid,
#             'status': status,
#             'product': t.product.name,

#         }

#         return render(request, 'status.html', context=context)


# class OrdersList(LoginRequiredMixin, ListView):
#     login_url = '/login/'

#     model = Transaction
#     template_name = "orders.html"
#     ordering = ['-date']

    # Array
    # (
    #     [mihpayid] => 13297721729
    #     [mode] => CASH
    #     [status] => success
    #     [unmappedstatus] => captured
    #     [key] => vd2Y1X
    #     [txnid] => k8WnSppfWj5dO7
    #     [amount] => 10.00
    #     [discount] => 0.00
    #     [net_amount_debit] => 10
    #     [addedon] => 2021-06-18 01:14:54
    #     [productinfo] => iPhone
    #     [firstname] => nishant
    #     [lastname] =>
    #     [address1] =>
    #     [address2] =>
    #     [city] =>
    #     [state] =>
    #     [country] =>
    #     [zipcode] =>
    #     [email] => test@gmail.com
    #     [phone] =>
    #     [udf1] =>
    #     [udf2] =>
    #     [udf3] =>
    #     [udf4] =>
    #     [udf5] =>
    #     [udf6] =>
    #     [udf7] =>
    #     [udf8] =>
    #     [udf9] =>
    #     [udf10] =>
    #     [hash] => e478ad7837422810ff482efca9d8f402fccf4342ad38cb03b23d3311884a1b5dccfecdf135f24a29e815672d2681a5df38d5362b18989d94d8b0ff41d01fb37f
    #     [field1] => 2021-06-18 01:15:16.0
    #     [field2] => 20210618111212800110168941914234127
    #     [field3] => 13297721729
    #     [field4] =>
    #     [field5] =>
    #     [field6] =>
    #     [field7] =>
    #     [field8] =>
    #     [field9] => Txn Success
    #     [payment_source] => payu
    #     [meCode] => {"payee_id":"PayUGo96421738082175","clientId":"C11"}
    #     [PG_TYPE] => CASH-PG
    #     [bank_ref_num] => 20210618111212800110168941914234127
    #     [bankcode] => PAYTM
    #     [error] => E000
    #     [error_Message] => No Error
    # )
