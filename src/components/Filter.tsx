import { selectFilter, setFilter } from "redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Filter = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);

  return (
    <div className="my-4 flex flex-grow items-center justify-around">
      <div className="lg:flex-grow"></div>
      <button
        className={`mx-2 h-8 w-24 rounded ${filter.state === "COMPLETED" ? "bg-orange-300 text-white" : "bg-slate-200 text-gray-600"}`}
        onClick={() => dispatch(setFilter("COMPLETED"))}>
        Completed
      </button>
      <button
        className={`mx-2 h-8 w-24 rounded ${filter.state === "INPROGRESS" ? "bg-orange-300 text-white" : "bg-slate-200 text-gray-600"}`}
        onClick={() => dispatch(setFilter("INPROGRESS"))}>
        In progress
      </button>
      <button
        className={`mx-2 h-8 w-24 rounded ${filter.state === "ALL" ? "bg-orange-300 text-white" : "bg-slate-200 text-gray-600"}`}
        onClick={() => dispatch(setFilter("ALL"))}>
        All
      </button>
    </div>
  );
};

export default Filter;
