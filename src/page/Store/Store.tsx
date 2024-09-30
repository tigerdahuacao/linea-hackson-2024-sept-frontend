import { Stack } from '@mui/material';

const Store = () => {
    return (
        <div className="tw-pt-24 tw-min-w-[40vw]">
            <Stack spacing={1}>
                <span className="tw-font-bold tw-text-xl">Increase the number of votes</span>
                <Stack direction="row" spacing={2}>
                    <Stack className="tw-h-28 tw-w-28 tw-bg-white tw-rounded-lg tw-shadow-md tw-justify-center tw-items-center tw-cursor-pointer">
                        1 more vote
                    </Stack>
                    <Stack className="tw-h-28 tw-w-28 tw-bg-white tw-rounded-lg tw-shadow-md tw-justify-center tw-items-center tw-cursor-pointer">
                        5 more vote
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
};

export default Store;
