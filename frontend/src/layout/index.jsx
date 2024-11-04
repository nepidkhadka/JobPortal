import Footer from "../sections/Footer";
import Navbar from "../sections/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
