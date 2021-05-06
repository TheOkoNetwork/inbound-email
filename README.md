# Inbound Email
Cloud Run service for handling inbound email hooks from sendgrid, this service only deals with ingesting emails NOT routing or display of them.

email body/headers goes into firestore in /emails/{{FIRESTORE_ID}}
any attachments are uploaded to GCS at the path /emails/{{FIRESTORE_ID}}/{{FILE_NAME}}

## Required service account permissions
##### Cloud Datastore User (Firestore is what is formerly Datastore)
        This is used to be able to create the firestore doc containing the email content/headers
##### Storage Object Creator on the {{PROJECT_ID}}.appspot.com GCS bucket
        This is used to upload the attachments to GCS
