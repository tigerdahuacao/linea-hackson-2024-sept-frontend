import { Stack } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import $styles from '@styles/modules/container.module.scss';
import { FC, useState } from 'react';

import PopUp from '@/components/PopUp/PopUp';
import SnapAlign from '@/components/ScrollSnap/SnapAlign';
import SnapWrapper from '@/components/ScrollSnap/SnapWrapper';

const NarutoVotePoll: FC = () => {
    const chartSetting = {
        yAxis: [
            {
                label: '',
            },
        ],
        series: [{ dataKey: 'voteNumber', color: 'rgb(252 211 77)', valueFormatter }],
        height: 400,
        barSize: 40,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    function valueFormatter(value: number | null) {
        return `${value}`;
    }

    const dataset = [
        {
            character: 'ナルト',
            voteNumber: 2000,
        },
        {
            character: 'イタチ',
            voteNumber: 3000,
        },
        {
            character: 'サスケ',
            voteNumber: 1000,
        },
    ];

    const [openVotePopUp, setOpenVotePopUp] = useState(false);
    return (
        <SnapWrapper>
            <SnapAlign className="tw-relative tw-flex tw-items-center tw-justify-center tw-bg-orange-400">
                <div
                    className="tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-w-1/3 tw-bg-contain tw-bg-no-repeat tw-bg-right tw-opacity-30"
                    style={{
                        backgroundImage: "url('/images/anime/naruto/naruto-1-transparent.png')",
                    }}
                />
                <Stack className="tw-min-w-[20rem] tw-min-h-[60vh] tw-p-8 tw-m-5 tw-rounded-2xl tw-justify-between tw-bg-white tw-shadow-lg">
                    <div>
                        <span className="tw-text-3xl tw-font-bold tw-p-2">
                            Please Vote for your Favorite NARUTO Characters
                        </span>
                        <p className="tw-text-xs tw-py-6 tw-px-2">
                            『NARUTO
                            -ナルト-』（ナルト）は、岸本斉史による日本の漫画作品。『週刊少年ジャンプ』（集英社）にて1999年43号から2014年50号まで連載された。
                            今回の募集では、「説明文字 Notionから」
                        </p>
                    </div>
                    <div className="tw-px-2">
                        <BarChart
                            dataset={dataset}
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'character',
                                    tickPlacement: 'middle',
                                    tickLabelPlacement: 'middle',
                                },
                            ]}
                            {...chartSetting}
                        />
                    </div>
                </Stack>
            </SnapAlign>
            <SnapAlign>
                <div className={$styles.app}>
                    <div className={$styles.container}>
                        <div className="tw-bg-gray-300 tw-border-gray-900  tw-p-12 tw-m-16  tw-border-2 tw-border-solid tw-rounded-md tw-items-center">
                            <div className="tw-flex tw-flex-col">
                                <div>
                                    『NARUTO
                                    -ナルト-』（ナルト）は、岸本斉史による日本の漫画作品。『週刊少年ジャンプ』（集英社）にて1999年43号から2014年50号まで連載された。
                                </div>
                                <div>今回の募集では、「説明文字 Notionから」</div>
                            </div>
                        </div>
                        <div className=" tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <p>今までの投票カント</p>
                            <p className="tw-text-2xl tw-text-orange-600">6000/8000</p>
                        </div>
                        <div className="tw-px-2">
                            <BarChart
                                dataset={dataset}
                                xAxis={[
                                    {
                                        scaleType: 'band',
                                        dataKey: 'character',
                                        tickPlacement: 'middle',
                                        tickLabelPlacement: 'middle',
                                    },
                                ]}
                                {...chartSetting}
                            />
                        </div>
                    </div>

                    <PopUp openPopUp={openVotePopUp} setOpenPopUp={setOpenVotePopUp}>
                        123
                    </PopUp>
                </div>
            </SnapAlign>
        </SnapWrapper>
    );
};

export default NarutoVotePoll;
