import React, { useState } from "react";
import { Grid, Alert, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { gmailApi } from "../services/api";
import { GmailAccount } from "../types";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/inputs/FormInput";
import ActionButton from "../components/buttons/ActionButton";
import AccountCard from "../components/cards/AccountCard";
import FormDialog from "../components/dialogs/FormDialog";

const Dashboard: React.FC = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [email, setEmail] = useState("");
   const [appPassword, setAppPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const handleAddAccount = async () => {
      try {
         await gmailApi.addAccount({ email, appPassword });
         setSuccess("Gmail account added successfully");
         setOpen(false);
         setEmail("");
         setAppPassword("");
         // Refresh user data here
      } catch (err) {
         setError("Failed to add Gmail account");
      }
   };

   const handleDeleteAccount = async (accountId: string) => {
      try {
         await gmailApi.deleteAccount(accountId);
         setSuccess("Gmail account removed successfully");
         // Refresh user data here
      } catch (err) {
         setError("Failed to remove Gmail account");
      }
   };

   return (
      <Box sx={{ p: 3 }}>
         <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
            <h1>Gmail Accounts</h1>
            <ActionButton startIcon={<AddIcon />} onClick={() => setOpen(true)}>
               Add Gmail Account
            </ActionButton>
         </Box>

         {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
               {error}
            </Alert>
         )}

         {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
               {success}
            </Alert>
         )}

         <Grid container spacing={3}>
            {user?.gmailAccounts.map((account: GmailAccount) => (
               <Grid item xs={12} md={6} key={account.id}>
                  <AccountCard
                     account={account}
                     onDelete={handleDeleteAccount}
                     onViewInbox={() => navigate(`/inbox/${account.id}`)}
                  />
               </Grid>
            ))}
         </Grid>

         <FormDialog
            open={open}
            title="Add Gmail Account"
            onClose={() => setOpen(false)}
            onSubmit={handleAddAccount}
         >
            <FormInput
               autoFocus
               margin="dense"
               id="email"
               label="Gmail Address"
               type="email"
               fullWidth
               value={email}
               onChange={setEmail}
            />
            <FormInput
               margin="dense"
               id="appPassword"
               label="App Password"
               type="password"
               fullWidth
               value={appPassword}
               onChange={setAppPassword}
            />
         </FormDialog>
      </Box>
   );
};

export default Dashboard;
