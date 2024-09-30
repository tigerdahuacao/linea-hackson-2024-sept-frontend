import { BarChart } from '@mui/x-charts/BarChart';
import { FC, useState } from 'react';

import PopUp from '@/components/PopUp/PopUp';
import SnapAlign from '@/components/ScrollSnap/SnapAlign';
import SnapWrapper from '@/components/ScrollSnap/SnapWrapper';
import AnimationButton from '@/components/Button/AnimationButton';
import $styles from '@styles/modules/container.module.scss';

const NarutoVotePollArchived: FC = () => {
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
            {/* 废案, the original vote chart display */}
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

                        <PopUp openPopUp={openVotePopUp} setOpenPopUp={setOpenVotePopUp}>
                            This is pop up context
                        </PopUp>
                    </div>
                </div>
            </SnapAlign>
        </SnapWrapper>
    );
};

export default NarutoVotePollArchived;
