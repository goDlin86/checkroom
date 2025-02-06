import { HfInference } from '@huggingface/inference'

export const POST = async (req) => {
  const bytes = await req.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const inference = new HfInference(process.env.HF_TOKEN)

  try {
    const image = await inference.imageClassification({
      data: buffer,
      model: 'not-lain/cloth_classification',
      //model: 'microsoft/resnet-50',  
    })
    return Response.json({ message: image[0].label }, { status: 200 })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}