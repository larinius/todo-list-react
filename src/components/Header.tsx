import AddItemButton from "./AddItemButton";

const Header = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-lg bg-blue-500 py-4 text-center">
      <h1 className="mx-4 text-4xl font-bold uppercase text-white ">To Do App</h1>
      <div className="flex-grow"></div>
      <AddItemButton />
    </div>
  );
};

export default Header;
