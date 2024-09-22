import IconButton from '@mui/material/IconButton';
import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import $style from './popup.module.scss';

interface PopUpProps extends React.PropsWithChildren {
    openPopUp: boolean;
    setOpenPopUp: (value: null | boolean | ((prevState: null | boolean) => null | boolean)) => void;
    children?: ReactElement | string;
}

//Search Icon
//https://mui.com/material-ui/material-icons/
const PopUp: FC<PopUpProps> = (props) => {
    return props.openPopUp ? (
        <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-custom-popup-bg">
            {/* Close Button */}
            <div className="tw-right-4 tw-top-40 tw-absolute">
                <IconButton
                    onClick={() => {
                        props.setOpenPopUp(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="tw-bg-slate-400 tw-w-full tw-p-32 tw-relative tw-max-w-7xl tw-opacity-70 tw-rounded-3xl">
                {props.children}
            </div>
        </div>
    ) : (
        ''
    );
};

export default PopUp;
