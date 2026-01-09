const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col align-center gap-4 max-w-2xl min-w-xl mx-auto">
      {children}
    </div>
  );
};

export default Container;
