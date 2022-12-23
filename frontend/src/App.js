import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

const DetailEpisodeAnimePage = lazy(() =>
  import("./pages/DetailEpisodeAnimePage")
);
const GenresAnimePage = lazy(() => import("./pages/GenresAnimePage"));
const SearchAnimePage = lazy(() => import("./pages/SearchAnimePage"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const DetailAnimePage = lazy(() => import("./pages/DetailAnimePage"));

function App() {
  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AnimePage />} />
          </Routes>
          <Routes>
            <Route path="/:anime" element={<DetailAnimePage />} />
          </Routes>
          <Routes>
            <Route
              path="/episode/:anime"
              element={<DetailEpisodeAnimePage />}
            />
          </Routes>
          <Routes>
            <Route path="/search/:query" element={<SearchAnimePage />} />
          </Routes>
          <Routes>
            <Route path="/genres/:query" element={<GenresAnimePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
