import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, CartProvider } from "./contexts";
import { Suspense } from "react";
import SpinningPage from "./pages/others/SpinningPage";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<SpinningPage />}>
              <MainRoutes />
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
