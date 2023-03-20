import React from "react";
import {
  initUserDataOnCreate,
  loadAllUserData,
  saveAllUserData,
} from "./Context";
import { Card } from "./Card";

import { useFormik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";

//Add validation to form fields

// Includes a Bootstrap card with a form that has:
// OK Name input field: Clarice Starling
// OK Email address input field
// OK Password input field
// OK Create account button

// VALIDATION
// OK Name validation: The user receives an alert if the name field is left blank.
// OK Email validation: The user receives an alert if this field is blank
// OK Password validation: The user receives an alert if the password is less than 8 characters long.
// OK Disable submit button if nothing is inputted

// Create account page should include the following functionality:
// OK Success message: Upon selecting the create account button the user should see a success message.
// OK Add Another Account Button: Upon selecting the create account button, the user should see an add another account button.
// OK Cleared Create Account Form: Upon selecting the create account button, t will open a cleared create account form.

export default function CreateAccount() {
  const [success, setSuccess] = React.useState(false);
  const [userList, setUserList] = React.useState(() => loadAllUserData());

  //everytime userList changes, save it to LocalStorage
  React.useEffect(() => saveAllUserData(userList), [userList]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      acceptNoSecurity: false,
    },

    onSubmit: (values) => {
      console.log(`Submit Pressed`);

      const user = { id: nanoid(), ...values };
      initUserDataOnCreate(user);
      console.log(user);

      setSuccess(true);
      setUserList((prevNotes) => [user, ...userList]);
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required()
        .min(2, "Name needs to have at least 2 characters.")
        .max(32, "Name can be only 32 characters long."),
      email: Yup.string()
        .required()
        .email("Please provide a valid email address."),
      password: Yup.string()
        .required("Password is mandatory.")
        .min(8, "Password needs to have at least 8 characters.")
        .max(32, "Password can be only 32 characters long."),
      acceptNoSecurity: Yup.bool().oneOf(
        [true],
        "You must accept the 'no security policy'"
      ),
    }),
  });

  //we need to validate form everytime its new, to disable submit button
  // * {brackets} used because useEffect function can return only nothing or another function
  // * reverting useEffect
  React.useEffect(() => {
    formik.validateForm();
  }, [success]);

  const handleAnotherAccount = (e) => {
    e.preventDefault();
    formik.handleReset();
    setSuccess(false);
  };

  return (
    <Card header="Create New Account">
      {!success ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            {formik.touched.name && formik.errors.name && (
              <div className="alert alert-danger py-1 px-3 mb-1" role="alert">
                <small>{formik.errors.name}</small>
              </div>
            )}
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John Doe"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email && (
              <div className="alert alert-danger py-1 px-3 mb-1" role="alert">
                <small>{formik.errors.email}</small>
              </div>
            )}
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="john@doe.com"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password && (
              <div className="alert alert-danger py-1 px-3 mb-1" role="alert">
                <small>{formik.errors.password}</small>
              </div>
            )}
            <input
              type="password"
              className="form-control"
              id="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>

          <div className="form-group mt-2">
            {formik.touched.acceptNoSecurity &&
              formik.errors.acceptNoSecurity && (
                <div className="alert alert-danger py-1 px-3 mb-1" role="alert">
                  <small>{formik.errors.acceptNoSecurity}</small>
                </div>
              )}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="acceptNoSecurity"
                value={formik.values.acceptNoSecurity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <label className="form-check-label" htmlFor="acceptNoSecurity">
                I consent to 'no{" "}
                <a href="http://here-is-security-404.org">security</a> at all'
                policy.
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end">  
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={!(Object.keys(formik.errors).length === 0) && "disabled"}
            >
              Create Account
            </button>
          </div>
        </form>
      ) : (
        <>
          <Card bgcolor="success" txtcolor="light" header="Success" title="New Account Created">
            <hr />
            <div>
              Name: {formik.values.name} <br />
              Email: {formik.values.email} <br />
              Name: {formik.values.password}
            </div>
          </Card>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleAnotherAccount}
            >
              Add Another Account
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
