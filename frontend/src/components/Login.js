import { useState } from "react";
import { Navigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async() => {
  try {
      const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginState.username,  
        password: loginState.password
      })
    });

    const data = await response.json();
    if (response.ok) 
    {
      console.log("Login successful update useContext", data);
      // Handle successful login, e.g., redirect and update userContext
      setUser(user)
      navigate('/feed')
    } 
    else 
    {
      throw new Error(data.message || "Failed to login");
    }
  } 
  catch (error) {
    alert("Error! Username and password can't be found")
    console.error("Error during login:", error.message);
  }
};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}