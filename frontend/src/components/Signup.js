import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);

    createAccount();
  };

  //Signup API Integration
  // This function sends a POST request to Flask API endpoint with the user details, expects a JSON response, and logs the outcome.
  // It handles both success and failure scenarios.
  const createAccount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupState), // Convert the React state to JSON
      });

      const data = await response.json(); // Parse the JSON response
      if (response.ok) {
        console.log("Success:", data);
        // Handle success (e.g., navigate to another page, show message)
        navigate('/login')
      } 
      else {
        throw new Error(data.error || "Unknown error");
      }
    } 
    catch (error) {
      console.error("Error during signup:", error);
      // Handle errors (e.g., show error message to the user)
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
