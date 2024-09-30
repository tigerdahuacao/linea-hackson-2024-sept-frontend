import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import CapsuleButton from './CapsuleButton';

const StoreButton = () => {
    const navigate = useNavigate();

    return (
        <CapsuleButton
            className="tw-text-pink-default tw-transition-opacity tw-p-2 hover:tw-opacity-80"
            fontSize="2xl"
            padding={2}
            onClick={() => navigate('/store')}
        >
            <Icon icon="material-symbols-light:shopping-bag-outline" />
        </CapsuleButton>
    );
};

export default StoreButton;
