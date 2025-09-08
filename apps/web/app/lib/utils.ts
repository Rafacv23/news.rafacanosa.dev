export function buildSanityImgUrl(ref: string) {
  const baseUrl = "https://cdn.sanity.io/images/"
  const projectId = "d5wqbyn6" // replace with your Sanity project ID
  const dataset = "production" // replace with your dataset name

  // ref format: image-<imageId>-<width>x<height>-<format>
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) {
    throw new Error("Invalid Sanity image reference")
  }

  const [, imageId, size, format] = match
  return `${baseUrl}${projectId}/${dataset}/${imageId}-${size}.${format}`
}
