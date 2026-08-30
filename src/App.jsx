import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from './assets/components/MainLayout';
import { HomePage } from './assets/pages/HomePage';
import { NotFoundPage } from './assets/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/forbidden"
            element={<div>forbidden component 👋</div>}
          />
          <Route path="/addquestion" element={<div>add question</div>} />
          <Route path="/question/:id" element={<div>add question</div>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
