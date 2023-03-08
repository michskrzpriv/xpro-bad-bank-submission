import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"



export default function CashierForm( {actionText, balance, amountValidationSchema, handleMoneyAccepted} ) {

  const formik = useFormik({
    initialValues: {
      amount: Math.min(1, balance),
    },
    onSubmit: (values) => {
      handleMoneyAccepted(values.amount)
      formik.handleReset();
    },
    validationSchema: Yup.object( {amount: amountValidationSchema} )}
  );


  //
  //  Forcing initial form validation. For disabling buttons if needed.
  // * {brackets} used because useEffect function can return only nothing or another function
  // * reverting useEffect
  React.useEffect(() => {formik.validateForm();}, [balance]);

  


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Amount</label>
        {formik.errors.amount && (
          <div className="alert alert-danger py-1 px-3 mb-2" role="alert">
            <small>{formik.errors.amount}</small>
          </div>
        )}
        <input
          type="number"
          id="amount"
          className="form-control"
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary mt-4" disabled={formik.errors.amount && 'disabled'} >
          {actionText}
        </button>
      </div>
    </form>
  );
  

}