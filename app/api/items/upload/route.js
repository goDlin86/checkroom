import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
 
export async function POST(request) {
  const body = await request.json()
 
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
 
        return {
          allowedContentTypes: ['image/jpeg', 'image/png'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
 
        console.log('blob upload completed', blob, tokenPayload)
 
        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user')
        }
      },
    })
 
    return NextResponse.json(jsonResponse)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}