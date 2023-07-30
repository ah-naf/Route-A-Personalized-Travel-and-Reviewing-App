import { Bookmark, Chat, Heart2 } from "react-iconly";
function UserReview() {
  return (
    <div className="absolute z-50 top-1/2 -translate-y-1/2 right-0 -translate-x-4 bg-white grid gap-4 p-2 py-6 border border-gray-400 rounded-md shadow-lg">
      <div className="cursor-pointer">
        <Heart2 set="broken" primaryColor="black" size={"large"} />
        <h1 className="text-center font-medium mt-1">5</h1>
      </div>
      <div className="cursor-pointer">
        <Chat set="broken" primaryColor="black" size={"large"} />
        <h1 className="text-center font-medium mt-1">2</h1>
      </div>
      <div className="cursor-pointer">
        <Bookmark set="broken" primaryColor="black" size={"large"} />
      </div>
    </div>
  );
}

export default UserReview;
