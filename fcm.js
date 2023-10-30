	var express=require('express');
    var FCM = require('fcm-node');
    var serverKey = 'AAAA9CBzkDg:APA91bEKZYpsjeUQ0kDt5ALzsGe0fzKtOTs7LTY-j4wJTuA3n-4ORIIcqHZlI1aEHg96IL2rzj0L4cWCLjA-0SXispOegnFTPrdtVgopHYFXzUDWqzpr7Kj4WeDAOm8_uZqFvc5EuevO';
    var fcm = new FCM(serverKey);
	var app=express();
	var port=2500;
	
	app.listen(port,()=>{
		console.log("listening on port", port )
	});
	app.use(express.json());
	app.use(express.urlencoded({extended:false}));
	
	app.post('/test', (req,res,next)=>{
		console.log("good thing");
		res.send("good");
	});
	
	app.post('/fcm', async(req,res,next)=>{
		 try{
				var receivedToken=req.body.fcmToken;
				var message = {
					to:receivedToken,
					notification: {
							title: req.body.title,
							body: req.body.body,
						},

					data: { //you can send only notification or only data(or include both)
							title: 'ok cdfsdsdfsd',
							body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
								}

								};

				fcm.send(message, function(err, response) {
					if (err) {
						console.log("Something has gone wrong!"+err);
						console.log("Respponse:! "+response);
					} else {
						// showToast("Successfully sent with response");
						console.log("Successfully sent with response: ", response);
						res.send(response);
					};

						});

				
			}catch(error){next(error);};
		});
	

    