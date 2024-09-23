import IconButton from '@mui/material/IconButton';
import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface PopUpProps extends React.PropsWithChildren {
    openPopUp: boolean;
    setOpenPopUp: (value: null | boolean | ((prevState: null | boolean) => null | boolean)) => void;
    children?: ReactElement | string;
}

//Search Icon
//https://mui.com/material-ui/material-icons/
const PopUp: FC<PopUpProps> = (props) => {
    return props.openPopUp ? (
        <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-custom-popup-bg tw-flex-col tw-rounded-3xl">
            <div className="tw-w-full tw-max-w-7xl tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-red-600 tw-rounded-3xl  tw-opacity-70">
                {/* Close Button */}
                <div className="tw-justify-end tw-flex tw-w-full tw-mt-4 tw-mr-4 tw-mb-2">
                    <IconButton
                        onClick={() => {
                            props.setOpenPopUp(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className=" tw-w-full tw-bg-zinc-600 tw-rounded-b-3xl tw-p-32 tw-relative tw-max-w-7xl tw-opacity-100 ">
                    {props.children}
                </div>
            </div>
        </div>
    ) : (
        ''
    );
};

export default PopUp;
