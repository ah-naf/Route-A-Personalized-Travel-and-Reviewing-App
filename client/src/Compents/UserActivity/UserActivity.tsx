import { Timeline } from "antd";

const ACTIVITY = [
  {
    color: "green",
    label: <p className="text-sm tracking-wide">2015-09-01</p>,
    children: (
      <p className="text-sm tracking-wide">
        Published a{" "}
        <span className="underline cursor-pointer hover:text-blue-900">
          route
        </span>
        .
      </p>
    ),
  },
  {
    label: <p className="text-sm tracking-wide">2015-09-01 09:12:11</p>,
    children: (
      <p className="text-sm tracking-wide">
        Liked <span className="font-medium cursor-pointer">@john</span>'s route
      </p>
    ),
  },
  {
    label: <p className="text-sm tracking-wide">2017-09-01 09:12:11</p>,
    children: (
      <p className="text-sm tracking-wide">
        Commented on <span className="font-medium cursor-pointer">@ahnaf</span>
        's route
      </p>
    ),
  },
];

function UserActivity() {
  return (
    <div className="px-3 pb-3 h-full">
      <div className="border py-3 h-full">
        <Timeline mode={"left"} items={ACTIVITY} />
      </div>
    </div>
  );
}

export default UserActivity;
