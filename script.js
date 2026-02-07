function generateInputs() {
  const num = document.getElementById("numPeople").value;
  const container = document.getElementById("peopleInputs");
  container.innerHTML = "";

  for (let i = 0; i < num; i++) {
    container.innerHTML += `
      <label>Person ${i + 1} Paid:</label>
      <input type="number" class="paidAmount" placeholder="Amount paid">
    `;
  }
}

function calculateSplit() {
  const total = parseFloat(document.getElementById("totalAmount").value);
  const paidInputs = document.querySelectorAll(".paidAmount");

  const numPeople = paidInputs.length;
  const equalShare = total / numPeople;

  let balances = [];

  paidInputs.forEach((input, index) => {
    const paid = parseFloat(input.value) || 0;
    balances.push({
      person: "Person " + (index + 1),
      balance: paid - equalShare
    });
  });

  let resultText = `<p>Each should pay: ₹${equalShare.toFixed(2)}</p><br>`;

  let creditors = balances.filter(p => p.balance > 0);
  let debtors = balances.filter(p => p.balance < 0);

  debtors.forEach(debtor => {
    creditors.forEach(creditor => {
      if (debtor.balance < 0 && creditor.balance > 0) {
        let amount = Math.min(
          creditor.balance,
          Math.abs(debtor.balance)
        );

        resultText += `${debtor.person} pays ₹${amount.toFixed(2)} to ${creditor.person}<br>`;

        debtor.balance += amount;
        creditor.balance -= amount;
      }
    });
  });

  document.getElementById("result").innerHTML = resultText;
}
