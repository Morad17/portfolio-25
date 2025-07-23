import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Particles from "./components/ParticleAnimation";

function App() {
  const Layout = () => {
    return (
      <div className="main-layout">
        <Navbar />
        <div className="background-particles">
          <Particles particleCount={300} moveParticlesOnHover={true} />
        </div>
        <div className="content">
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
