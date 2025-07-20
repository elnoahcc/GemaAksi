import DetailGaleri from "@/components/DetailGaleri"

interface PageProps {
  params: {
    id: string
  }
}

export default function DetailGaleriPage({ params }: PageProps) {
  const imageId = Number.parseInt(params.id)

  return <DetailGaleri imageId={imageId} />
}
