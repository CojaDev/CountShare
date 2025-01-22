import { Nav } from "./Nav";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
