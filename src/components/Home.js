import React from "react";
import { Card } from "./Card";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Card
      header="Welcome to Bad Bank"
      text={
        <div className="d-flex mb-3">
          <img className="img-fluid" src="./img/scrooge.svg" width="30%" alt="bank-logo"/>
          <div>
            We are bad and we are proud about it! All your money in one risky
            place...
            <br />
            No authorization whatsoever! That's the way to live. Deposit money
            and pray!
          </div>
        </div>
      }
    >
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/deposit/" className="nav-link">
          <button type="button" className="btn btn-primary px-4 gap-3">
            Deposit
          </button>
        </Link>
        <Link to="/all-data/" className="nav-link">
          <button type="button" className="btn btn-outline-secondary px-4">
            See other users' login details (yay!)
          </button>
        </Link>
      </div>
    </Card>
  );
}
