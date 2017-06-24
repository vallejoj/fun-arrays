var dataset = require('./dataset.json');

var hundredThousandairs = dataset.bankBalances.filter(greaterThanThousand);


function greaterThanThousand(account){
  return account.amount>100000
};


var datasetWithRoundedDollar = dataset.bankBalances.map( (account) =>{
    return {'rounded' : Math.round(account.amount)}


});


var datasetWithRoundedDime = dataset.bankBalances.map( (account)=>{
 return { 'amount': account.amount,
   'roundedDime': Math.round(account.amount*10)/10}
});





// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object


// WHYYYYYYYYYYYYYYYYYYYYYYYYYYYY!!!!!!!!!!1
// function combineBankBalances(initialValue,account){
//     return initialValue+ Math.round(account.amount*100)/100
// }
//
// var sumOfBankBalances = dataset.bankBalances.reduce(combineBankBalances, 0);
var sumOfBankBalances = dataset.bankBalances.reduce(bankSum,0)

function bankSum(bankTotals,currentNum){
  return Math.round((bankTotals += parseFloat(currentNum.amount)) * 100) / 100;
};


console.log(sumOfBankBalances)

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */



/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = dataset.bankBalances.reduce(sumUp,{})

 function sumUp(ourState, account){
  if(!ourState.hasOwnProperty(account.state)){
    ourState[account.state]=0
  }

  ourState[account.state]+= Math.round(account.amount*100)/100
  ourState[account.state] = parseFloat(ourState[account.state].toFixed(2))
  return ourState
};




 var sumOfInterests= dataset.bankBalances.filter(filterStates).reduce(addInterest, 0);

 function filterStates(place){
  return ['WI','IL','WY','OH','GA','DE'].indexOf(place.state)!==-1

 }



 function addInterest(initialValue, account){
 var total= initialValue+ parseFloat(account.amount)*.189;
   return Math.round(total*100)/100
 }

  function addHighInterest(account){

  return account.amount*.189
  }

function filterRestOfStates(account){
    return ['WI','IL','WY','OH','GA','DE'].indexOf(account.state)===-1
}
function filterLowInterest(account){
  return account.amount>50,000
}

var sumOfHighInterests = dataset.bankBalances.map(addHighInterest).filter(filterRestOfStates)
// .reduce(bankSum,0);
console.log(sumOfHighInterests)
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it
  only sum values greater than 50,000 and save it to `sumOfInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */


/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
 var lowerSumStates = Object.keys(stateSums).filter( lowStates )

 function lowStates( number ) {
   return stateSums[number] < 1000000
 }

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums= Object.keys(stateSums).filter(highStates).reduce(addHighStateSums,0)

function highStates( number ) {


  return stateSums[number] > 1000000

}

function addHighStateSums(indexPoint, number){
return indexPoint+stateSums[number]

}
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
