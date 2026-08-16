import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from "./assets/components/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/forbidden"
            element={<div>forbidden component 👋</div>}
          />
          <Route path="/addquestion" element={<div>add question</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
