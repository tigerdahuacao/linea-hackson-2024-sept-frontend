import { Badge, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { FC, ReactNode } from 'react';

const ProfileCard: FC<{
    imageUrl?: string;
    title?: string;
    content?: ReactNode;
    children?: ReactNode;
    badgeContent?: string | number;
}> = ({ imageUrl, title, content, children, badgeContent }) => {
    const card = (
        <Card sx={{ boxShadow: 'none', borderRadius: '0.5rem' }}>
            {title && (
                <CardHeader
                    title={title}
                    className="tw-text-pink-default"
                    sx={{ padding: '0.5rem 1rem' }}
                    titleTypographyProps={{
                        variant: 'h6',
                        sx: { fontWeight: 'bold' },
                    }}
                />
            )}
            {imageUrl && <CardMedia component="img" height="194" image={imageUrl} />}
            {content && <CardContent sx={{ padding: '0 1rem' }}>{content}</CardContent>}
            {children}
        </Card>
    );

    if (badgeContent) {
        return (
            <Badge
                badgeContent={badgeContent}
                color="default"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    width: '100%',
                    '& .MuiBadge-badge': {
                        fontSize: '0.75rem',
                        height: '1.5rem',
                        minWidth: '1.5rem',
                        borderRadius: '0.75rem',
                        backgroundColor: '#e3e3e3',
                        color: 'black',
                    },
                }}
            >
                {card}
            </Badge>
        );
    }

    return card;
};

export default ProfileCard;
