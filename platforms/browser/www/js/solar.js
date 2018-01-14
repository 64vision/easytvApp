"strict"
  
var $$ = Dom7;

  var _body = $$('body');

  _body.on('click', '.signin', function(e) {
      var param = {};
      $$(this).html('<i class="fa fa-spinner spinner"></i> Verifying user...');
      $$(".remarks").hide()
      param.Username = $$("#MobilePhoneNum").val(); 
      param.Password = md5($$("#password").val() + $$("#password").val());
      param.Version = 1;
       param.Method = 1;
      console.log(param);
      app.methods.login(JSON.stringify(param), function(res) {
        console.log(res);
          $$(".remarks").hide()
          var obj = JSON.parse(res);
          console.log(obj.UserId);
          if(obj.UserId > 0) {
            _User = obj;
            _User.MobilePhoneNum = param.Username;
           app.router.navigate('/dashboard/');
          } else {
            //639178204239
            console.log(obj.remarks);
             $$(".remarks").show();
            $$(".remarks").html(obj.Remarks);
            
          }
            $$(".signin").html('SIGN IN');
      });
      
    return false;
  });

   _body.on('click', '.regBtn', function(e) {
    console.log("regBtn");
    $$(this).html('<i class="fa fa-spinner spinner"></i> Loading....');
      var param = {};
      param.SmartCardId = $$("#SmartCardId").val();
      param.MobilePhoneNum = $$("#regMobilePhoneNum").val();  
      param.Password = md5($$("#regpassword").val() + $$("#regpassword").val());
       param.Lastname = $$("#Lastname").val();  
      param.Firstname = $$("#Firstname").val();
       param.BirthDate = $$("#BirthDate").val();  
       param.Email = $$("#Email").val();
        param.HouseNoStreetNameHome = $$("#address").val();   
       param.Method = 57;
      console.log(param);
      app.methods.register(JSON.stringify(param), function(res) {
           console.log(res);
          $$(".remarks").hide()
          var obj = JSON.parse(res);
          console.log(obj);
          if(obj.UserId > 0) {
            console.log(obj.UserId);
            localStorage.CardId = param.SmartCardId;
           app.dialog.alert('Registration Successful! Please Login!', "EasyTV");
           app.router.navigate('/');
          } else {
            //639178204239
            console.log(obj.Remarks);
             $$(".remarks").show();
            $$(".remarks").html(obj.Remarks);
          }
            $$(".regBtn").html('Register');
      });
      
    return false;
  });


_body.on('click', '.forgot', function(e) {
    console.log("forgot");

    if(sessionStorage.Verification) {
    
         app.router.navigate('/newpassword/');
  } else {
   app.dialog.prompt('Enter your registered mobile #',"EasyTV", function (MobilePhoneNum) {
        var param = {};
        param.MobilePhoneNum = MobilePhoneNum; 
        param.Method = 106;
        console.log(param);
        app.methods.req_code(JSON.stringify(param), function(res) {
             var obj = JSON.parse(res);
             if(obj.Remarks == "SmsUserForgotPasswordWithVfyCodeSuccessful") {
                  sessionStorage.Verification = 1;
                  app.dialog.alert('Verification code will be send to your email!', "EasyTV");
             } else {
                app.dialog.alert('Error: Please user your registered mobile #!', "EasyTV");
             }
            
        });
        
    });
  }
    return false;
  });

_body.on('click', '.changepassbtn', function(e) {
    console.log("changepassbtn");
      //delete sessionStorage.Verification;
     var param = {};
         param.MobilePhoneNum = $$("#MobilePhoneNum").val(); 
         param.VerificationCode =$$("#VerificationCode").val();
          param.NewPassword = md5($$("#newpassword").val() + $$("#newpassword").val());
        param.Method = 107;
          console.log(param);
      app.methods.newpassword(JSON.stringify(param), function(res) {
             var obj = JSON.parse(res);
             console.log(res);
             if(obj.Remarks == "SmsUserPasswordChangeWithVfyCodeSuccessful") {
                  app.dialog.alert('Password changed!', "EasyTV");
                  app.router.navigate('/');
             } else {
                app.dialog.alert("Request failed!", "EasyTV");
             }
            
        });
    return false;
  });


_body.on('click', '.dttbtn', function(e) {
    console.log("dttbtn");
      app.router.navigate('/dttpage/');
    return false;
  });

_body.on('click', '.checkoutbtn', function(e) {
    var thisplan = $$(this).attr("data-plan");
    if(thisplan == "basic")
        Checkout.plan = Plan.Basic;
    else if(thisplan == "boo")
        Checkout.plan = Plan.Boo;
    else if(thisplan == "premium")
        Checkout.plan = Plan.Premium;
    
      app.router.navigate('/checkoutpage/');
    console.log(Checkout);
      //
    return false;
  });

_body.on('click', '.toplayer', function(e) {
     app.dialog.alert('Rediredt to the EasyTV Player App', "EasyTV");
   return false;
  });


_body.on('click', '.ProceedBtn', function(e) {
    
   app.router.navigate('/billingpage/');
   return false;
  });


_body.on('click', '.payBtn', function(e) {
  //create Customer
    var param = {
      "paymentTokenId": PaymentToken.paymentTokenId,
       "amount": Checkout.plan.amount,
      "firsname": $$("#firstname").val(),
      "lastname": $$("#lastname").val(),
      "mobile":  _User.MobilePhoneNum,
      "email": CustomerDetail.Email,
      "street": $$("#street").val(),
      "city": $$("#city").val(),
      "state": $$("#state").val(),
      "code": $$("#zipCode").val(),
    }
     app.dialog.preloader('Checkout on progress...');
      app.methods.makepayment(param, function(res) {
            var pobj = JSON.parse(JSON.parse(res));
            poolingtime();
            PopupCenter(pobj.verificationUrl,'EasyTV','450','450');  
        });
   return false;
  });



function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    verificationWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

}

function poolingtime(){
  var timer = setInterval(function() { 
    if(verificationWindow == null || verificationWindow.closed) {
        clearInterval(timer);
         app.dialog.close();
          app.dialog.preloader('Updating subscription....Please wait!');
         var param = {
            "UserId": _User.UserId,
            "SessionId": _User.SessionId,
            "CardId": localStorage.CardId,
            "CasIds": [Checkout.plan.id],
            "Amount": Checkout.plan.amount,
            "Method": 104
          }
          console.log(param);
         app.methods.updatePackage(JSON.stringify(param), function(res) {
              var obj = JSON.parse(res);
              console.log(obj);
              app.dialog.close();
              if(obj.CasRemarks != "SmsAbvEntitlementUpdatingRequestSuccessful") {
                app.dialog.alert('Updating subscription error! Please call customer support', "EasyTV");
              } else {
                 app.router.navigate('/dashboard/');
              }
         });
    }
}, 1000);
}













   
