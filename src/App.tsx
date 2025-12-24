import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  useEffect(() => {
    // Hide loading screen once app is mounted
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Remove from DOM after transition
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 300);
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
