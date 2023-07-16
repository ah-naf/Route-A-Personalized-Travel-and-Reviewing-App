import Navbar from "../Compents/Navbar/Navbar";
import ProfileLeft from "../Compents/ProfileLeft/ProfileLeft";
import ProfileRight from "../Compents/ProfileRight/ProfileRight";

function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[whitesmoke] flex-grow pt-8">
        <div className="flex gap-8 max-w-6xl mx-auto ">
          <ProfileLeft />
          <ProfileRight />
        </div>
      </div>
    </div>
  );
}

export default Profile;
