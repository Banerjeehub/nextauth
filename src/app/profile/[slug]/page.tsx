export default function profile({ params }: any) {
  return (
    <div className="flex min-h-screen items-center justify-center text-6xl">
      <span>Profile page: </span>
      <span className="text-black bg-orange-500 ml-5 p-6 rounded-xl">
        {params.slug}
      </span>
    </div>
  );
}
