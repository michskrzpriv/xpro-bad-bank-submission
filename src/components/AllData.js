import React from "react";
import { loadAllUserData, logIn, UserContext } from "./Context";
import { Card } from "./Card";

// All Data page includes the following functionality:
// Track User Submissions: All user submissions appear on All Data page.
// All Data Displayed On Bootstrap Card: All Data is styled and displayed on a Bootstrap card instead of JSON.

export default function AllData() {
  const ctx = React.useContext(UserContext);

  const [selectedUser, setSelectedUser] = React.useState(ctx.user);
  const userList = loadAllUserData(); //as function to only fetch once

  const handleSelect = (id) => {
    const selected = userList.find((u) => u.id === id)
    
    ctx.user = selected;
    logIn( selected );

    setSelectedUser( selected );
  };



  const userElements = userList.map((u) => (
    <Card
      bgcolor={selectedUser.id === u.id ? "warning" : "light"}
      key={u.id}
      header={u.name}
    >
      <p>Email: {u.email}</p>
      <p>Password: {u.password}</p>
      <p>Balance: {u.balance}</p>
      {ctx.user.id !== u.id && (
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleSelect(u.id)}
          >
            Use as Context
          </button>
        </div>
      )}
    </Card>
  ));



  return (
    <div>
      <h1>All Users</h1>
      <div>{userElements}</div>
    </div>
  );
}
