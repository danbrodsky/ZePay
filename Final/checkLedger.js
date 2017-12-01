var https = require('https');

var latest = '';

// TODO: Convert to while loop that runs this script once every 5-10 seconds.

setInterval(function() {
	https.get('https://api.altnet.rippletest.net:5990/v1/accounts/rGWvdudBH1BQ9j8ipRSByg9f4tXku1Ps5b/payments', (res) => {
	  console.log('statusCode:', res.statusCode);
	  console.log('headers:', res.headers);
	
	
	  let rawData = '';
	  res.on('data', (chunk) => { rawData += chunk; });
	  res.on('end', () => {
	    try {
	    	const parsedData = JSON.parse(rawData);
	    	for (let i=0;i < parsedData.payments.length; i++){
	      			var timeInMillis = Date.parse(parsedData.payments[i].payment.timestamp);
	      			if (timeInMillis == latest)
	      				break;
	      		try {
	      			var amount = parsedData.payments[i].payment.memos[0].MemoData;
	      			var name = parsedData.payments[i].payment.memos[1].MemoData;
	      			var recipient = parsedData.payments[i].payment.memos[2].MemoData;
	      			var message = parsedData.payments[i].payment.memos[3].MemoData;
		
	      			if (amount != undefined && name != undefined && recipient != undefined){
	      				amount = Buffer.from(amount, 'hex').toString('utf8');
	      				name = Buffer.from(name, 'hex').toString('utf8');
	      				recipient = Buffer.from(recipient, 'hex').toString('utf8');
	      				message = Buffer.from(message, 'hex').toString('utf8');
	
	      				console.log(amount);
	      				console.log(name);
	      				console.log(recipient);
	      				console.log(message);
	
	      				// TODO: call purchase.py using subprocess call
	      				var spawn = require("child_process").spawn;
						var process = spawn('python3',["purchase.py", recipient, amount, "This payment is from " + name +
						" through HSBC's ZePay. Payment #: 100001\n Personal message : " + message]);
	      			}
	
	    		} catch(e){}
	    	}
	
	    	latest = Date.parse(parsedData.payments[0].payment.timestamp);
	    } catch (e) {
	      console.log("No new payment found.")
	    }
	  });
	});
}, 6000);