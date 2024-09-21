import { Avatar } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Overview: FC = () => {
    const navigate = useNavigate();

    const handleGoToVote = () => {
        navigate('/vote-for-naruto');
    };

    return (
        <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-p-5 tw-m-5 tw-min-w-[20rem]">
            <h2 className="tw-text-center tw-font-extrabold">Choose Your Project</h2>
            <div className="tw-flex tw-items-center tw-flex-col">
                <div className="tw-flex-auto tw-my-5">
                    <div className="tw-text-neutral-800 ">
                        <div className="tw-w-auto tw-m-4 tw-bg-yellow-400 tw-rounded-full tw-flex tw-flex-row tw-p-3">
                            <Avatar alt="NARUTO" src="/images/anime/naruto/naruto-1.jpg" />
                            <img
                                className="tw-h-8 tw-object-contain tw-inline-block"
                                src="/images/anime/naruto/naruto-1.jpg"
                                alt="img"
                            />
                            <button
                                className="tw-w-full tw-text-gray-800 tw-py-2 tw-px-4 tw-font-bold hover:tw-bg-yellow-500 tw-rounded-full"
                                onClick={handleGoToVote}
                            >
                                <span>Go To NARUTO vote poll</span>
                            </button>
                        </div>
                    </div>
                    <div className="tw-text-neutral-800" />
                    <div className="tw-text-neutral-800" />
                </div>
            </div>
        </div>
    );
};

export default Overview;
