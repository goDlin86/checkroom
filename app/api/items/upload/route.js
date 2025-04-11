//import { handleUpload } from '@vercel/blob/client'
import { put } from '@vercel/blob'
 
export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get('filename')
  const secret = searchParams.get('secret')

  if (secret !== process.env.IOS_SECRET) return Response.json({ message: 'Not authenticated' }, { status: 401 })

  //const body = await req.json()
  const body = req.body
 
  try {
    // const jsonResponse = await handleUpload({
    //   body,
    //   req,
    //   onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
    //     // Generate a client token for the browser to upload the file
    //     // ⚠️ Authenticate and authorize users before generating the token.
    //     // Otherwise, you're allowing anonymous uploads.
    //     console.log(pathname)
 
    //     return {
    //       allowedContentTypes: ['image/jpeg', 'image/png'],
    //       tokenPayload: JSON.stringify({
    //         // optional, sent to your server on upload completion
    //         // you could pass a user id from auth, or a value from clientPayload
    //       }),
    //     }
    //   },
    //   onUploadCompleted: async ({ blob, tokenPayload }) => {
 
    //     console.log('blob upload completed', blob, tokenPayload)
 
    //     // try {
    //     //   // Run any logic after the file upload completed
    //     //   // const { userId } = JSON.parse(tokenPayload);
    //     //   // await db.update({ avatar: blob.url, userId });
    //     // } catch (error) {
    //     //   throw new Error('Could not update user')
    //     // }
    //   },
    // })

    const blob = await put(filename, body, { access: 'public', contentType: 'image/jpeg', addRandomSuffix: true })
    return Response.json({ url: blob.url })
  } catch (e) {
    console.log(e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}