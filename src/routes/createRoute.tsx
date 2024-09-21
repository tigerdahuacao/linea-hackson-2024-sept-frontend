import { createBrowserRouter } from 'react-router-dom';

import Overview from '@/page/Overview/Overview';
import Profile from '@/page/Profile/Profile';
import App from '@/page/Root/app';
import NarutoVotePoll from '@/page/VotePoll/NarutoVotePoll/narutoVotePoll';

const createMyRouterContent = () => {
    const rootRoutersList = [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Overview />,
                },
                {
                    path: '/vote-for-naruto',
                    element: <NarutoVotePoll />,
                },
                {
                    path: '/profile',
                    element: <Profile />,
                },
            ],
        },
    ];

    return rootRoutersList;
};

const router = createBrowserRouter(createMyRouterContent());

export default router;
