import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes/createRoute';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
