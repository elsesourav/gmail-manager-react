import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   Box,
   Card,
   CardHeader,
   List,
   IconButton,
   Breadcrumbs,
   Link,
   Alert,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { gmailApi } from "../services/api";
import { Email } from "../types";
import EmailListItem from "../components/list/EmailListItem";
import EmailViewerDialog from "../components/dialogs/EmailViewerDialog";
import LoadingState from "../components/feedback/LoadingState";

const Inbox: React.FC = () => {
   const { email } = useParams<{ email: string }>();
   const navigate = useNavigate();
   const [emails, setEmails] = useState<Email[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
   const [modalOpen, setModalOpen] = useState(false);

   const fetchEmails = async () => {
      if (!email) return;

      setLoading(true);
      try {
         const data = await gmailApi.getInbox(email);
         setEmails(data);
         setError("");
      } catch (err) {
         setError("Failed to fetch emails");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchEmails();
   }, [email]);

   const handleToggleStar = async (uid: string, isStarred: boolean) => {
      try {
         await gmailApi.toggleStar(uid, isStarred);
         setEmails(
            emails.map((e) => (e.uid === uid ? { ...e, isStarred } : e))
         );
      } catch (err) {
         setError("Failed to update email");
      }
   };

   const handleEmailSelect = (email: Email) => {
      setSelectedEmail(email);
      setModalOpen(true);
   };

   return (
      <Box sx={{ p: 3 }}>
         <Breadcrumbs sx={{ mb: 3 }}>
            <Link
               color="inherit"
               href="#"
               onClick={() => navigate("/dashboard")}
            >
               Dashboard
            </Link>
            <span>{email}</span>
         </Breadcrumbs>

         {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
               {error}
            </Alert>
         )}

         <Card>
            <CardHeader
               title="Inbox"
               action={
                  <IconButton onClick={fetchEmails}>
                     <RefreshIcon />
                  </IconButton>
               }
            />
            {loading ? (
               <LoadingState message="Loading emails..." />
            ) : (
               <List>
                  {emails.map((email) => (
                     <EmailListItem
                        key={email.uid}
                        email={email}
                        onSelect={handleEmailSelect}
                        onToggleStar={handleToggleStar}
                     />
                  ))}
               </List>
            )}
         </Card>

         <EmailViewerDialog
            email={selectedEmail}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
         />
      </Box>
   );
};

export default Inbox;
