import { Card, CardHeader, CardMedia, CardContent } from '@mui/material';
import { FC, ReactNode } from 'react';

const ProfileCard: FC<{
    imageUrl?: string;
    title?: string;
    content?: ReactNode;
    children?: ReactNode;
}> = ({ imageUrl, title, content, children }) => {
    return (
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
};

export default ProfileCard;
