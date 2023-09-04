let debts = [];

function addDebt() {
    let debtType = document.getElementById('debtType').value;
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    let payment = parseFloat(document.getElementById('payment').value);
    
    debts.push({
        type: debtType,
        principal: principal,
        rate: rate,
        payment: payment
    });

    displayDebts();
    clearInputs();
    calculateTotalRepayment();
}

function displayDebts() {
    const list = document.getElementById('debtList');
    list.innerHTML = "";

    debts.forEach((debt, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${debt.type}: $${debt.principal.toFixed(2)} at ${(debt.rate * 12 * 100).toFixed(2)}% APR with monthly payment of $${debt.payment.toFixed(2)}`;
        list.appendChild(listItem);
    });
}

function clearInputs() {
    document.getElementById('debtType').value = "";
    document.getElementById('principal').value = "";
    document.getElementById('rate').value = "";
    document.getElementById('payment').value = "";
}

function calculateTotalRepayment() {
    let totalMonths = 0;
    let totalInterestPaid = 0;
     var myPrincipal=[];
     var i = 0
    debts.forEach(debt => {
        let principal = debt.principal;
         myPrincipal[i++] = principal;
        let rate = debt.rate;
        let payment = debt.payment;
        let months = 0;

        while (principal > 0) {
            let interest = principal * rate;
            let principalPaid = payment - interest;

            if (principalPaid <= 0) {
                alert(`Monthly payment for ${debt.type} is too low to cover the interest. Increase the monthly payment.`);
                return;
            }

            totalInterestPaid += interest;
            principal -= principalPaid;
            months++;
        }

        totalMonths = Math.max(totalMonths, months);
    });


   var sum = 0;
    myPrincipal.forEach( num => {
        sum += num;
      });

function calYear (month){
    if(month >= 12){
       var year = Math.floor(totalMonths / 12);
       var months = totalMonths % 12;
       return `${year} Year & ${months} Months`;
    }
    else{
        return month;
    }
}
  
    document.getElementById('totalMonths').textContent = calYear(totalMonths) ;
    document.getElementById('totalInterestPaid').textContent = Math.ceil(totalInterestPaid);
    document.getElementById('totalPaid').textContent =sum+Math.ceil(totalInterestPaid);
}