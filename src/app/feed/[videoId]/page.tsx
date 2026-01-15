interface PageProps {
  params: Promise<{ videoId: string }>;
}

const VideoIdPage = async ({ params }: PageProps) => {
  const { videoId } = await params;

  return <div>Video ID: {videoId}</div>;
};

export default VideoIdPage;
