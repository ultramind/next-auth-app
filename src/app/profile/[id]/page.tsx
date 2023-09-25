export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div>
        <h1 className="text-2xl">Profile Page</h1>
        <hr />
        <h3 className="text-4xl">{params.id}</h3>
      </div>
    </div>
  );
}
