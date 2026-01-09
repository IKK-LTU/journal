const navigationItems = [
  {
    name: "Home",
    src: "/",
  },
  {
    name: "Login",
    src: "/login",
  },
];

const Navbar = () => {
  return (
    <nav className="py-4 px-3 bg-zinc-900 h-16 flex items-center justify-between rounded-lg">
      <ol className="list-none inline-flex justify-center gap-2 text-white w-full">
        {navigationItems.map((item) => (
          <li key={item.src}>
            <a href={item.src} className="text-white font-bold">
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Navbar;
