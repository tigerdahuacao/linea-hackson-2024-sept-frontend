import { Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { FC, useState } from 'react';
// import { naruto1TransparentImg } from '@/assets/images/anime/naruto';
import PopUp from '@/components/PopUp/PopUp';
import SnapAlign from '@/components/ScrollSnap/SnapAlign';
import SnapWrapper from '@/components/ScrollSnap/SnapWrapper';
import AnimationButton from '@/components/Button/AnimationButton';

const NarutoVotePoll: FC = () => {
    const chartSetting = {
        yAxis: [
            {
                label: '',
            },
        ],
        series: [{ dataKey: 'voteNumber', color: 'rgb(252 211 77)', valueFormatter }],
        height: 400,
        barsize: 40,
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
            <SnapAlign className="tw-flex tw-items-center tw-justify-center">
                <Stack className="tw-relative tw-min-w-[20rem] tw-min-h-[60vh] tw-p-8 tw-m-5 tw-text-white tw-rounded-2xl tw-justify-between tw-bg-orange-300 tw-shadow-md tw-shadow-orange-300">
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
                    <div className="tw-flex tw-justify-end">
                        <AnimationButton
                            h={12}
                            w={36}
                            text="Vote!"
                            onClick={() => {
                                setOpenVotePopUp(true);
                            }}
                        />
                    </div>
                    <PopUp openPopUp={openVotePopUp} setOpenPopUp={setOpenVotePopUp}>
                        This is pop up context
                    </PopUp>
                    <div className="tw-px-2 tw-z-10">
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

                    {/* <div
                        className="tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-w-1/3 tw-bg-contain tw-bg-no-repeat tw-bg-right tw-opacity-30"
                        style={{
                            backgroundImage: `url(${naruto1TransparentImg})`,
                        }}
                    /> */}
                </Stack>
            </SnapAlign>
        </SnapWrapper>
    );
};

export default NarutoVotePoll;
