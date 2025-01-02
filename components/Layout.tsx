import { Nav } from "./Nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
