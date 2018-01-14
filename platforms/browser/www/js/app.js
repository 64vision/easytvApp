// Dom7
var $ = Dom7;
var _User = null;
var Customer = null;
var CustomerDetail = null;
var CustomerAddress = null;
var Card = {};
var PaymentToken = null;

var verificationWindow;
// Theme
var theme = 'md';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}
console.log(theme)
var server = "http://9397da7c.ngrok.io/";
var paymentserver = "http://set2.inventiv.ph:8081/";
var app = new Framework7({
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    login: function(param, callback) {
     app.request.post(server+'req_login', param, function (data) {
        callback(data);
      });
    },
    register: function(param, callback) {
     app.request.post(server+'req_sms_registration_full_abv', param, function (data) {
         callback(data);
      });
    },
    req_code: function(param, callback) {
     app.request.post(server+'req_sms_user_forgot_password_with_vfy_code', param, function (data) {
         callback(data);
      });
    },
     newpassword: function(param, callback) {
     app.request.post(server+'req_sms_user_password_change_with_vfy_code', param, function (data) {
         callback(data);
      });
    },
    accountinfo: function(param, callback) {
     app.request.post(server+'req_sms_power_search_by_card_id_get_v2', param, function (data) {
         callback(data);
      });
    },
    getpaymenttoken: function(param, callback) {
     app.request.post(paymentserver+'payment/token', param, function (data) {
         callback(data);
      });
    },
    makepayment: function(param, callback) {
     app.request.post(paymentserver+'payment/make', param, function (data) {
         callback(data);
      });
    },
     updatePackage: function(param, callback) {
     app.request.post(server+'req_sms_test_activate', param, function (data) {
         callback(data);
      });
    }
  },
  
  routes: routes,
});

/*Subscription Plans*/
var Plan = {
      Basic: {
         "id": 1,
        "name": "Basic",
        "amount": 50.00,
        "currency": "PHP",
        "description": "Basic Plan Details Here",
        "requestReferenceNumber": "SOLAREASYTV1234"
      },
      Boo: {
         "id": 2,
        "name": "Boo",
        "amount": 15.00,
        "currency": "PHP",
        "description": "Boo Plan Details Here",
        "requestReferenceNumber": "SOLAREASYTV1234"
      },
      Premium: {
         "id": 3,
        "name": "NBA Premium",
        "amount": 55.00,
        "currency": "PHP",
        "description": "Premium Plan Details Here",
        "requestReferenceNumber": "SOLAREASYTV1234"
      }
}

var Checkout = { /**/}

var Month = ["01","02","03","04","05","06","07","08","09","10","11","12"];