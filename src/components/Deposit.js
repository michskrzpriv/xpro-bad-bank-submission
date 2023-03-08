import React from "react";
import { useState } from "react";
import * as Yup from "yup";

import { UserContext, loadAllUserData, saveAllUserData } from "./Context";
import { Card } from "./Card";
import CashierForm from "./CashierForm";

// Includes a Bootstrap card with a form that has:
// OK Deposit input field
// OK Deposit button
// OK Balance information displays above deposit form on the card

// Deposit page should include the following functionality:
// OK,TODO Success Message: When a user completes the deposit form, they receive a success message confirming their deposit was received.
// OK Not A Number Alert: User receives an alert if they add something that is not a number.
// OK Negative Deposit Alert: User receives an alert if they try to deposit a negative number.
// OK Disable deposit button if nothing is input

export default function Deposit() {
  const ctx = React.useContext(UserContext);
  console.log("Deposit context:", ctx.user);
  const [balance, setBalance] = useState(() => ctx.user.balance);

  // Each balance change:
  // - updates the list of users and saves
  // - yields updated user for Context
  React.useEffect(() => {
    const userList = loadAllUserData();
    const theUser = userList.find((u) => u.id === ctx.user.id);
    theUser.balance = balance;
    ctx.user = theUser;
    saveAllUserData(userList);
  }, [balance]);


  const handleMoneyAccepted = ( amount ) => {
    const newBalance = balance + Number(amount)
    setBalance( newBalance )

    //alert with microtimeout, for apropiate on-screen result
    setTimeout( () => alert( `A deposit of ${amount} has been accepted. Your balance is: ${newBalance}`), 50);
  }


  return (
    <Card
      header={`${ctx.user.name}, deposit:`}
      title={`Current balance: ${balance}`}
    >
      <CashierForm
        actionText="Deposit"
        balance={balance}
        handleMoneyAccepted={handleMoneyAccepted}
        amountValidationSchema={
          Yup.number()
            .required("This field is required")
            .min(0.01, "You have to deposit at least 0.01")
        }
      ></CashierForm>
    </Card>
  );
}
