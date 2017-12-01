const RippleAPI = require('ripple-lib').RippleAPI;
const assert = require('assert');

const INTERVAL = 1000;

const dest = 'rGWvdudBH1BQ9j8ipRSByg9f4tXku1Ps5b';

const address = 'rppSpx1g4wZCgY54pJmMqCtjpzTY6N79JT';
const secret = 'ssXGC9sCFCPLDEXgrXqorh7MhHNyJ';

var options = {};

var payment;

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // Public rippled server hosted by Ripple, Inc.
});

/* number of ledgers to check for valid transaction before fail */
const ledgerOffset = 5;
const myInstructions = {maxLedgerVersionOffset: ledgerOffset};

function checkHistory(address, options) {
  console.log('Verifying Ledger');
  console.log('minLedgerVersion: ' + options.minLedgerVersion);
  console.log('maxLedgerVersion: ' + options.maxLedgerVersion);
  return api.getTransactions(address, options).then(data => {
    return data[0].outcome.result === 'tesSUCCESS';
  }).catch(error => {
  	console.log(error);
    /* if transaction not in latest validated ledger,
       try again until max ledger hit */
    if (error instanceof api.errors.MissingLedgerHistoryError) {
      return new Promise((resolve, reject) => {
        setTimeout(() => checkHistory(address, options)
        .then(resolve, reject), INTERVAL);
      });
    }
    return error;
  });
}

/* Verify a transaction is in a validated RCL version */
function verifyTransaction(hash, options) {
  console.log('Verifying Transaction');
  return api.getTransaction(hash, options).then(data => {
    console.log('Final Result: ', data.outcome.result);
    console.log('Validated in Ledger: ', data.outcome.ledgerVersion);
    console.log('Sequence: ', data.sequence);
    return data.outcome.result === 'tesSUCCESS';
  }).catch(error => {
  	console.log(error);
    /* if transaction not in latest validated ledger,
       try again until max ledger hit */
    if (error instanceof api.errors.PendingLedgerVersionError) {
      return new Promise((resolve, reject) => {
        setTimeout(() => verifyTransaction(hash, options)
        .then(resolve, reject), INTERVAL);
      });
    }
    return error;
  });
}


/* function to prepare, sign, and submit a transaction to the RCL
success verifies the transaction is being considered for the next ledger.
Still requires vlaidation */
function submitTransaction(lastClosedLedgerVersion, prepared, secret) {
  const signedData = api.sign(prepared.txJSON, secret);
  return api.submit(signedData.signedTransaction).then(data => {
    console.log('Tentative Result: ', data.resultCode);
    console.log('Tentative Message: ', data.resultMessage);
    /* if transaction was not successfully submitted throw error */
    assert.strictEqual(data.resultCode, 'tesSUCCESS');
    /* if successfully submitted fire off validation workflow */
    const options = {
      // minLedgerVersion: lastClosedLedgerVersion,
      maxLedgerVersion: prepared.instructions.maxLedgerVersion
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => verifyTransaction(signedData.id, options)
    .then(resolve, reject), INTERVAL);
    });
  });
}

var initPayment = function(name,amount,recipient,message){
  console.log(name)
  console.log(amount)
  console.log(recipient)
  console.log(message)
	payment = {
  "source": {
    "address": address,
    "maxAmount": {
      "value": "10",
      "currency": "XRP"
    }
  },
  "destination": {
    "address": dest,
    "amount": {
      "value": "1",
      "currency": "XRP"
    }
  },
  "memos": [
    {
      "type": "test",
      "format": "plain/text",
      "data": amount
    },
    {
      "type": "test",
      "format": "plain/text",
      "data": name
    },
    {
      "type": "test",
      "format": "plain/text",
      "data": recipient
    },
    {
      "type": "test",
      "format": "plain/text",
      "data": message
    }
  ]
};
api.connect().then(() => {
  console.log('Connected');
  return api.preparePayment(address, payment, myInstructions);
}).then(prepared => {
  console.log('Payment Prepared');
  return api.getLedger().then(ledger => {
  	options = {
        minLedgerVersion: ledger.ledgerVersion,
    	earliestFirst: true,
    	initiated: true
    };
    console.log('Current Ledger', ledger.ledgerVersion);
    return submitTransaction(ledger.ledgerVersion, prepared, secret);
  }).then(next => {
  	return checkHistory(address, options);
    });
  }).then(() => {
    api.disconnect().then(() => {
      // process.exit();
      return 0;
    });
}).catch(console.error);
}

module.exports = initPayment;