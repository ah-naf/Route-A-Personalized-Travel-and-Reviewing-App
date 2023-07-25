import { Eye, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const DRAFT = [
  {
    id: "sdasff",
    name: "untitled-1",
    updatedAt: "20 aprit 2023",
  },
  {
    id: "ssdasff",
    name: "untitled-2",
    updatedAt: "30 april 2023",
  },
];

const PUBLISHED = [
  {
    id: "sdasff2",
    name: "Cumilla to Chattogram",
    publishedAt: "20 aprit 2023",
  },
  {
    id: "ssdasff3",
    name: "Chattogram to Cumilla",
    publishedAt: "30 april 2023",
  },
];

function CreateRouteDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-orange-400 p-2 px-5 text-white rounded">
          Create
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-blue-900">Create new route</DialogTitle>
          <DialogDescription>
            Here you can manage your previous added route or you can add new
            one.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Link to={"/create"}>
            <button className="flex items-center border-2 p-2 rounded-md mx-auto font-medium text-sm hover:border-orange-500 hover:bg-orange-500 hover:text-white transition">
              <Plus className="w-4 h-4 mr-2" />
              <span>Create New Route</span>
            </button>
          </Link>
          <div>
            <h3 className="text-sm font-medium">Drafts ({DRAFT.length})</h3>
            <div className="mt-3 space-y-1">
              {DRAFT.map((val) => (
                <div
                  key={val.id}
                  className="flex cursor-pointer items-center group justify-between hover:bg-orange-400 hover:text-white p-2 rounded transition"
                >
                  <div>
                    <h3 className="font-medium ">{val.name}</h3>
                    <p className="text-xs font-light">
                      Last Updated: {val.updatedAt}
                    </p>
                  </div>
                  <Trash className="w-4 h-4 cursor-pointer group-hover:text-white text-red-600" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Recently Published</h3>
            <div className="mt-3 space-y-1">
              {PUBLISHED.map((val) => (
                <div
                  key={val.id}
                  className="flex items-center justify-between hover:bg-orange-400 hover:text-white cursor-pointer p-2 rounded"
                >
                  <div>
                    <h3 className="font-medium ">{val.name}</h3>
                    <p className="text-xs font-light">
                      Published At : {val.publishedAt}
                    </p>
                  </div>
                  <Eye className="cursor-pointer w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRouteDialog;
