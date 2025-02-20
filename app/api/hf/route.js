import { HfInference } from '@huggingface/inference'

export const maxDuration = 20

export const POST = async (req) => {
  let blob = await req.blob()
  if (blob.type.includes('text/plain'))
    blob = await fetch(await blob.text()).then(r => r.blob())

  const inference = new HfInference(process.env.HF_TOKEN)

  try {
    const image = await inference.imageClassification({
      data: blob,
      model: 'not-lain/cloth_classification',
      //model: 'microsoft/resnet-50',  
    })
    return Response.json({ message: image[0].label })
  } catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}