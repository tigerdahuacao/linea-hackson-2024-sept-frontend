import { createBrowserRouter } from 'react-router-dom';

import App from '@/page/Root/app';
import NarutoVotePoll from '@/page/VotePoll/NarutoVotePoll/narutoVotePoll';

const createMyRouterContent = () => {
    const rootRoutersList = [
        {
            path: '/',
            element: <App />,
        },
        {
            path: '/vote-for-naruto',
            element: <NarutoVotePoll />,
        },
    ];

    return rootRoutersList;
};

const router = createBrowserRouter(createMyRouterContent());

export default router;
