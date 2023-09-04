import { Eye, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { deleteRouteThunk, getAllRouteThunk } from "../../slices/RouteSlice";
import { RootState } from "../../store";
import { RoutePostType, calculateDate } from "../../util";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allRoutes = useSelector((state: RootState) => state.route.routes);
  const [draftedRoute, setDraftedRoute] = useState<RoutePostType[]>([]);
  const [publishedRoute, setPublishedRoute] = useState<RoutePostType[]>([]);

  useEffect(() => {
    setDraftedRoute(allRoutes.filter((val) => !val.published));
    setPublishedRoute(
      allRoutes.filter((val, index) => val.published && index < 3)
    );
  }, [allRoutes]);

  useEffect(() => {
    dispatch(getAllRouteThunk() as any);
  }, []);

  const handleClick = () => {
    const id = "route_" + uuidv4();
    navigate(`/create/${id}`);
  };

  const handleRouteDelete = (routeId: string) => {
    dispatch(deleteRouteThunk(routeId) as any);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button className="bg-orange-400 p-2 px-5 text-white rounded">
            Create
          </button>
        </DialogTrigger>
        <DialogContent>
          <Toaster />
          <DialogHeader>
            <DialogTitle className="text-blue-900">
              Create new route
            </DialogTitle>
            <DialogDescription>
              Here you can manage your previous added route or you can add new
              one.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <button
              className="flex items-center border-2 p-2 rounded-md mx-auto font-medium text-sm hover:border-orange-500 hover:bg-orange-500 hover:text-white transition"
              onClick={handleClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>Create New Route</span>
            </button>
            <div>
              <h3 className="text-sm font-medium">
                Drafts ({draftedRoute.length})
              </h3>
              <div className="mt-3 space-y-1">
                {draftedRoute.length > 0 ? (
                  draftedRoute.map((val) => (
                    <div
                      key={val.id}
                      className="flex cursor-pointer items-center group justify-between hover:bg-orange-400 hover:text-white p-2 rounded transition"
                    >
                      <div
                        onClick={() => {
                          window.location.href = "/route/" + val.id;
                        }}
                      >
                        <h3 className="font-medium ">{val.title}</h3>
                        <p className="text-xs font-light">
                          Last Updated: {calculateDate(val.updatedAt)}
                        </p>
                      </div>
                      <Trash
                        className="w-4 h-4 cursor-pointer group-hover:text-white text-red-600"
                        onClick={() => handleRouteDelete(val.id)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center font-medium">
                    No drafted routes found
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Recently Published</h3>
              <div className="mt-3 space-y-1">
                {publishedRoute.length > 0 ? (
                  publishedRoute.map((val) => (
                    <div
                      key={val.id}
                      className="flex items-center justify-between hover:bg-orange-400 hover:text-white cursor-pointer p-2 rounded"
                      onClick={() => {
                        window.location.href = "/route/" + val.id;
                      }}
                    >
                      <div>
                        <h3 className="font-medium ">{val.title}</h3>
                        <p className="text-xs font-light">
                          Published At : {calculateDate(val.updatedAt)}
                        </p>
                      </div>
                      <Eye className="cursor-pointer w-4 h-4" />
                    </div>
                  ))
                ) : (
                  <p className="text-center font-medium">
                    No published routes found
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateRouteDialog;
