import $styles from '@styles/modules/container.module.scss';
import { FC } from 'react';

const NarutoVotePoll: FC = () => {
    return (
        <div className={$styles.app}>
            <div className={$styles.container}>Please Vote for your Favorite NARUTO Characters</div>
        </div>
    );
};

export default NarutoVotePoll;
