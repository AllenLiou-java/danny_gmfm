import { JWT } from 'google-auth-library'

export default function () {
  const { googleServiceAccountEmail, googlePrivateKey } = useRuntimeConfig()

  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

  const serviceAccountAuth = new JWT({
    // email: googleServiceAccountEmail,
    // key: googlePrivateKey,
    email: googleServiceAccountEmail,
    key: googlePrivateKey.replace(/\\n/g, '\n'),
    scopes: SCOPES
  })

  return serviceAccountAuth
}
