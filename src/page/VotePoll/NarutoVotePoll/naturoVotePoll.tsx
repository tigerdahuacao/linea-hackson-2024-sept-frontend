import { FC } from 'react';

import $styles from '@/page/containerCss/container.module.scss';

const NarutoVotePoll: FC = () => {
    return (
        <div className={$styles.app}>
            <div className={$styles.container}>Please Vote for your Favorite NARUTO Characters</div>
        </div>
    );
};

export default NarutoVotePoll;
