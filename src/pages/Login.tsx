import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Link, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/inputs/FormInput";
import SubmitButton from "../components/buttons/SubmitButton";
import AuthCard from "../components/cards/AuthCard";

const Login: React.FC = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await login(email, password);
         navigate("/dashboard");
      } catch (err) {
         setError("Invalid email or password");
      }
   };

   return (
      <Container maxWidth="sm">
         <AuthCard
            title="Login to Gmail Manager"
            error={error}
            onSubmit={handleSubmit}
         >
            <FormInput
               required
               id="email"
               label="Email Address"
               name="email"
               autoComplete="email"
               autoFocus
               value={email}
               onChange={setEmail}
            />
            <FormInput
               required
               name="password"
               label="Password"
               type="password"
               id="password"
               autoComplete="current-password"
               value={password}
               onChange={setPassword}
            />
            <SubmitButton>Sign In</SubmitButton>
            <Box sx={{ textAlign: "center" }}>
               <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
               </Link>
            </Box>
         </AuthCard>
      </Container>
   );
};

export default Login;
