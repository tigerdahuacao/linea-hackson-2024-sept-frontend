import { Avatar } from '@mui/material';
import { FC } from 'react';

import { Link } from 'react-router-dom';

import $styles from '@/page/containerCss/container.module.css';

const App: FC = () => {
    return (
        <div className={$styles.app}>
            <div className={$styles.container}>
                <h2 className="tw-text-center tw-font-extrabold">Choose Your Project</h2>
                <div className="tw-flex tw-items-center tw-flex-col">
                    <div className="tw-flex-auto tw-my-5">
                        <div className="tw-text-neutral-800 ">
                            <div className="tw-w-auto  tw-m-4  tw-bg-yellow-400 tw-rounded-full tw-flex tw-flex-row tw-p-3">
                                <Avatar
                                    alt="NARUTO"
                                    src={`${
                                        import.meta.env.PUBLIC_URL
                                    }/images/anime/naruto/naruto-1.jpg`}
                                />
                                <img
                                    className="  h-8  object-contain inline-block"
                                    src="@/assets/images/naruto/naruto-1.jpg"
                                    alt="img"
                                />
                                <button className="tw-w-full tw-text-gray-800 tw-py-2 tw-px-4 tw-font-bold hover:tw-bg-yellow-500 tw-rounded-full">
                                    <Link to="/vote-for-naruto">Go To NARUTO vote poll</Link>
                                </button>
                            </div>
                        </div>
                        <div className="tw-text-neutral-800" />
                        <div className="tw-text-neutral-800" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
