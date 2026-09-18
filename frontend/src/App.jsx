import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { ApiProvider } from './services/useApi.jsx';

export default function App() {
  const router = createBrowserRouter(routes);

  return <ApiProvider>
    <RouterProvider
      router={router}
    />
  </ApiProvider>;
}