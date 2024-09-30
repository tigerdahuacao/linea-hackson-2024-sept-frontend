import { styled, Tab, Tabs } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CustomTabsProps {
    children?: React.ReactNode;
    value: string;
    centered?: boolean;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const CustomTabs = styled((props: CustomTabsProps) => (
    <Tabs
        {...props}
        variant="fullWidth"
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    minHeight: '24px',
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    '& .MuiTabs-indicatorSpan': {
        gap: '8px',
    },
});

interface CustomTabProps {
    label: string;
    value: string;
}

const CustomTab = styled((props: CustomTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        minHeight: '24px',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(12),
        borderRadius: '50%',
        padding: 0,
        color: 'black',
        '&.Mui-selected': {
            color: '#ef99b1',
        },
        '&:hover': {
            color: 'rgba(239, 153, 177, 0.8)',
        },
    }),
);

interface TabItem {
    label: string;
    value: string;
    path: string;
}

interface CapsuleTabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    onChange?: (value: string) => void;
}

const CapsuleTabs: FC<CapsuleTabsProps> = ({ tabs, defaultTab = tabs[0]?.value, onChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState<string>(defaultTab);

    useEffect(() => {
        const currentTab = tabs.find((t) => t.path === location.pathname);
        setTab(currentTab?.value || '');
    }, [location, tabs]);

    const handleTabChange = (_: React.SyntheticEvent, value: string) => {
        const selectedTab = tabs.find((t) => t.value === value);
        if (selectedTab) {
            setTab(value);
            navigate(selectedTab.path);
            onChange?.(value);
        }
    };

    return (
        <div className="tw-bg-white tw-rounded-full tw-p-2 tw-shadow-md">
            <CustomTabs centered value={tab} onChange={handleTabChange}>
                {tabs.map((h) => (
                    <CustomTab key={h.value} label={h.label} value={h.value} />
                ))}
            </CustomTabs>
        </div>
    );
};

export default CapsuleTabs;
