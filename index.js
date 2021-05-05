const express = require('express')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express()

app.set('port', process.env.PORT || 3000)

const admin = require('firebase-admin')
try {
  if (process.env.K_SERVICE) {
    console.log('Running under cloud run')
    admin.initializeApp()
  } else {
    console.log('Not running under cloud run')
    admin.initializeApp({
      credential: admin.credential.cert(require('./serviceAccountKey.json'))
    })
  }
} catch (e) {
  console.log(e)
  // yes this is meant to be empty
}
const db = admin.firestore()
const bucket = admin
  .storage()
  .bucket(process.env.STORAGE_BUCKET || 'parkplanr-dev.appspot.com')

app.post('/parse', upload.any(), async function (req, res) {
  const from = req.body.from
  const to = req.body.to
  const text = req.body.text
  const subject = req.body.subject
  console.log(
    `Got new email from: ${from} to: ${to} with subject: ${subject} and plain text: ${text}`
  )
  const emailDoc = db.collection('emails').doc()
  const emailData = req.body
  emailData.attachments = []

  for (const attachment of req.files) {
    console.log(attachment)
    const fileUploadPath = `emails/${emailDoc.id}/${attachment.originalname}`
    const file = bucket.file(fileUploadPath)
    // @todo try catch this and load upload fails
    console.log(`Uploading attachment to: ${fileUploadPath}`)
    await file.save(attachment.buffer)
    console.log(`Uploaded ${fileUploadPath}`)
    delete attachment.buffer
    emailData.attachments.push(attachment)
  }
  console.log(emailData)
  await emailDoc.set(emailData)
})

const server = app.listen(app.get('port'), function () {
  console.log('Inbound email listening on port %d', server.address().port)
})
