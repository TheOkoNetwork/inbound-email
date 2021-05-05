# inbound-email
Cloud Run app for handling inbound email hooks from sendgrid

email data goes into firestore in /emails/{{FIRESTORE_ID}}
attachments for emails go to /emails/{{FIRESTORE_ID}}/{{FILENAME}}
