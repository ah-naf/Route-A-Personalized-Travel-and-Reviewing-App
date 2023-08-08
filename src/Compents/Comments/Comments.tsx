import { BigHead } from "@bigheads/core";

function Comments({ comments }) {
  return (
    <div className="mt-4">
      {comments.map((cmnt) => (
        <div key={cmnt.id} className="border-t py-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-10">
              <BigHead
                accessory="shades"
                body="breasts"
                circleColor="blue"
                clothing="vneck"
                clothingColor="green"
                eyebrows="leftLowered"
                eyes="leftTwitch"
                faceMask={false}
                faceMaskColor="blue"
                facialHair="none2"
                graphic="vue"
                hair="afro"
                hairColor="blonde"
                hat="turban"
                hatColor="red"
                lashes={false}
                lipColor="red"
                mask
                mouth="serious"
                skinTone="light"
              />
            </div>
            <div className="cursor-pointer">
              <h3 className="font-medium tracking-wide">{cmnt.fullName}</h3>
              <p className="text-xs leading-3 text-gray-600">@{cmnt.username}</p>
            </div>
            <p className="text-sm text-gray-700 ml-1">{cmnt.createdAt} ago</p>
          </div>
          <p className="mt-3 leading-6">{cmnt.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
