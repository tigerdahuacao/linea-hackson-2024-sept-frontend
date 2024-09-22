import PopUp from '@/components/PopUp/PopUp';
import { Button } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import $styles from '@styles/modules/container.module.scss';
import { FC, useState } from 'react';

const NarutoVotePoll: FC = () => {
    const chartSetting = {
        xAxis: [
            {
                label: '投票数',
            },
        ],
        // width: 1000,
        height: 400,
    };

    function valueFormatter(value: number | null) {
        return `${value}票`;
    }

    const xLabels = ['ナルト', 'イタチ', 'サスケ'];

    const [openVotePopUp, setOpenVotePopUp] = useState(false);
    return (
        <div className={$styles.app}>
            <div className={$styles.container}>
                Please Vote for your Favorite NARUTO Characters
                <div className="tw-bg-gray-300 tw-border-gray-900  tw-p-12 tw-m-16  tw-border-2 tw-border-solid tw-rounded-md tw-items-center">
                    <div className="tw-flex tw-flex-col">
                        <div>
                            『NARUTO
                            -ナルト-』（ナルト）は、岸本斉史による日本の漫画作品。『週刊少年ジャンプ』（集英社）にて1999年43号から2014年50号まで連載された。
                        </div>
                        <div>今回の募集では、「説明文字　Notionから」</div>
                    </div>
                </div>
                <div className=" tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <p>今までの投票カント</p>
                    <p className="tw-text-2xl tw-text-orange-600">6000/8000</p>
                </div>
                <BarChart
                    yAxis={[
                        {
                            scaleType: 'band',
                            data: xLabels,
                            colorMap: {
                                type: 'ordinal',
                                values: xLabels,
                                colors: ['red', 'green', 'yellow'],
                            },
                        },
                    ]}
                    series={[{ data: [2000, 3000, 1000], valueFormatter }]}
                    grid={{ vertical: true }}
                    layout="horizontal"
                    borderRadius={30}
                    {...chartSetting}
                />
                <div className="tw-flex tw-justify-end">
                    <Button
                        onClick={() => {
                            setOpenVotePopUp(true);
                        }}
                        variant="contained"
                    >
                        Vote!
                    </Button>
                </div>
            </div>

            <PopUp openPopUp={openVotePopUp} setOpenPopUp={setOpenVotePopUp}>
                123
            </PopUp>
        </div>
    );
};

export default NarutoVotePoll;
