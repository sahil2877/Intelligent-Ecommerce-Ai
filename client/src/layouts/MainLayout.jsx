import Navbar from "../components/Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      {children}
    </div>
  );
}

export default MainLayout;
