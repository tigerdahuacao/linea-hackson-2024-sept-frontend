import { Stack } from '@mui/material';
import { FC, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AnimationButton from '@/components/Button/AnimationButton';
import { NFTData, NFTId } from '@/types/nft';

interface CardListProps {
    list: NFTData[];
    onVote?: (nftId: NFTId) => void;
}

const CardList = forwardRef<HTMLDivElement, CardListProps>(({ list, onVote }, ref) => {
    return (
        <div ref={ref} className="tw-flex tw-flex-col tw-gap-6">
            {list.map((item) => {
                return (
                    <Stack
                        key={item.id}
                        className="tw-w-[28rem] tw-h-[36rem] tw-bg-white tw-rounded-md tw-shadow-md tw-p-2 tw-gap-2"
                    >
                        <Stack
                            className="tw-w-full tw-h-[30rem] tw-rounded-md tw-overflow-hidden"
                            direction="row"
                        >
                            <img
                                className="tw-w-full tw-object-cover tw-object-center tw-transition-transform tw-duration-700 hover:tw-scale-105"
                                src={item.metadata.image}
                                alt={item.metadata.name}
                            />
                        </Stack>
                        <Stack
                            className="tw-items-center tw-justify-between tw-flex-1 tw-px-2"
                            direction="row"
                        >
                            <Stack spacing={1}>
                                <span className="tw-text-xl tw-font-bold">
                                    {item.metadata.name}
                                </span>
                                <span className="tw-text-xs">
                                    Minted: {item.totalMinted.toString()}/
                                    {item.maxSupply.toString()}
                                </span>
                                <span className="tw-text-xs">Price: {item.mintPrice} ETH</span>
                            </Stack>
                            <AnimationButton
                                h={12}
                                w={36}
                                text="Vote"
                                onClick={() => onVote?.(item.id)}
                            />
                        </Stack>
                    </Stack>
                );
            })}
        </div>
    );
});

interface ThumbnailListProps {
    translateY: number;
    list: NFTData[];
    onItemClick: (index: number) => void;
}

const ThumbnailList = forwardRef<HTMLDivElement, ThumbnailListProps>(
    ({ translateY, list, onItemClick }, ref) => {
        const transform = useMemo(() => {
            return `translateY(calc(calc(50vh - 6rem - 2.5rem) - ${translateY}px))`;
        }, [translateY]);

        return (
            <div ref={ref} className="tw-flex tw-flex-col tw-gap-2 tw-px-2" style={{ transform }}>
                {list.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className="tw-flex tw-h-20 tw-w-16 tw-bg-white tw-rounded-md tw-p-1 tw-text-center tw-pink-default tw-font-bold tw-shadow-md tw-cursor-pointer"
                            onClick={() => onItemClick(index)}
                        >
                            <img src={item.metadata.image} alt={item.metadata.name} />
                        </div>
                    );
                })}
            </div>
        );
    },
);

interface VoteListProps {
    nfts: NFTData[];
    onVote?: (nftId: NFTId) => void;
}

const VoteList: FC<VoteListProps> = ({ nfts, onVote }) => {
    const [thumbnailTranslateY, setThumbnailTranslateY] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardListRef = useRef<HTMLDivElement>(null);
    const thumbnailListRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        const scrollContainerElement = scrollContainerRef.current;
        const thumbnailListElement = thumbnailListRef.current;
        if (scrollContainerElement && thumbnailListElement) {
            requestAnimationFrame(() => {
                const cardListScrollableHeight =
                    scrollContainerElement.scrollHeight - scrollContainerElement.clientHeight;
                const thumbnailScrollableHeight = thumbnailListElement.clientHeight;

                const newScrollPosition = scrollContainerElement.scrollTop;

                const newThumbnailTranslateY =
                    (newScrollPosition / cardListScrollableHeight) * thumbnailScrollableHeight;
                setThumbnailTranslateY(newThumbnailTranslateY);
            });
        }
    }, []);

    useEffect(() => {
        const scrollContainerElement = scrollContainerRef.current;
        if (scrollContainerElement) {
            scrollContainerElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainerElement) {
                scrollContainerElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const scrollToItem = useCallback((index: number) => {
        const scrollContainerElement = scrollContainerRef.current;
        const cardListElement = cardListRef.current;
        if (scrollContainerElement && cardListElement) {
            const cardElements = cardListElement.children;
            if (cardElements[index]) {
                const cardTop = (cardElements[index] as HTMLElement).offsetTop;
                const containerHeight = scrollContainerElement.clientHeight;
                const cardHeight = (cardElements[index] as HTMLElement).clientHeight;
                const scrollTo = cardTop - containerHeight / 2 + cardHeight / 2;
                scrollContainerElement.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth',
                });
            }
        }
    }, []);

    return (
        <div
            ref={scrollContainerRef}
            className="tw-h-full tw-w-full tw-flex tw-overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="tw-relative tw-m-auto tw-min-w-[80vw] tw-pt-10">
                <div className="tw-flex tw-justify-center tw-py-6">
                    <CardList ref={cardListRef} list={nfts} onVote={onVote} />
                </div>
                <div className="tw-sticky tw-flex tw-bottom-0 tw-h-0 tw-left-0 tw-z-10 tw-w-full">
                    <div className="tw-relative tw-flex tw-h-screen tw--translate-y-full">
                        <div className="tw-py-24">
                            <ThumbnailList
                                ref={thumbnailListRef}
                                translateY={thumbnailTranslateY}
                                list={nfts}
                                onItemClick={scrollToItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoteList;
