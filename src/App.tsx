import { Route, Routes } from "react-router";
import NamePage from "./components/pages/NamePage";
import VotingPage from "./components/pages/VotingPage";
import ResultPage from "./components/pages/ResultPage";

const App = () => {
  return (
    <div className="bg-pbg text-pfg lg:text-lg">
      <Routes>
        <Route path="/" element={<NamePage />}></Route>
        <Route path="/voting" element={<VotingPage />}></Route>
        <Route path="/results" element={<ResultPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
