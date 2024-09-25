import { Stack } from '@mui/material';
import { FC, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import AnimationButon from '@/components/Button/AnimationButon';

interface CharacterListType {
    name: string;
    imgUrl: string;
    voteNum: number;
}

const CardList = forwardRef<HTMLDivElement, { list: CharacterListType[] }>(({ list }, ref) => {
    return (
        <div ref={ref} className="tw-flex tw-flex-col tw-gap-6">
            {list.map((item) => {
                return (
                    <Stack
                        key={item.name}
                        className="tw-w-[28rem] tw-h-[36rem] tw-bg-white tw-rounded-md tw-shadow-md tw-p-2 tw-gap-2"
                    >
                        <Stack
                            className="tw-w-full tw-h-[30rem] tw-rounded-md tw-overflow-hidden"
                            direction="row"
                        >
                            <img
                                className="tw-w-full tw-object-cover tw-object-center tw-transition-transform tw-duration-700 hover:tw-scale-105"
                                src={item.imgUrl}
                                alt={item.name}
                            />
                        </Stack>
                        <Stack
                            className="tw-items-center tw-justify-between tw-flex-1 tw-px-2"
                            direction="row"
                        >
                            <Stack spacing={1}>
                                <span className="tw-text-xl tw-font-bold">{item.name}</span>
                                <span className="tw-text-xs">Vote Number: {item.voteNum}</span>
                            </Stack>
                            <AnimationButon h={12} w={36} text="Vote" />
                        </Stack>
                    </Stack>
                );
            })}
        </div>
    );
});

const ThumbnailList = forwardRef<
    HTMLDivElement,
    { translateY: number; list: CharacterListType[]; onItemClick: (index: number) => void }
>(({ translateY, list, onItemClick }, ref) => {
    const transform = useMemo(() => {
        return `translateY(calc(calc(50vh - 6rem - 2.5rem) - ${translateY}px))`;
    }, [translateY]);

    return (
        <div ref={ref} className="tw-flex tw-flex-col tw-gap-2 tw-px-2" style={{ transform }}>
            {list.map((item, index) => {
                return (
                    <div
                        key={item.name}
                        className="tw-flex tw-h-20 tw-w-16 tw-bg-white tw-rounded-md tw-p-1 tw-text-center tw-pink-default tw-font-bold tw-shadow-md tw-cursor-pointer"
                        onClick={() => onItemClick(index)}
                    >
                        <img src={item.imgUrl} alt={item.name} />
                    </div>
                );
            })}
        </div>
    );
});

const VoteList: FC = () => {
    const [thumbnailTranslateY, setThumbnailTranslateY] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardListRef = useRef<HTMLDivElement>(null);
    const thumbnailListRef = useRef<HTMLDivElement>(null);

    const characterList = [
        {
            name: 'Eru Chitanda',
            imgUrl: '/public/images/anime/2024/09/chitanda.png',
            voteNum: 999,
        },
        {
            name: 'Sakamoto Mashiro',
            imgUrl: '/public/images/anime/2024/09/mashiro.png',
            voteNum: 999,
        },
        {
            name: 'Misaka Mikoto',
            imgUrl: '/public/images/anime/2024/09/misaka.png',
            voteNum: 999,
        },
        {
            name: 'Rikka Takanashi',
            imgUrl: '/public/images/anime/2024/09/rikka.png',
            voteNum: 999,
        },
        {
            name: 'Shinomiya Kaguya',
            imgUrl: '/public/images/anime/2024/09/shinomiya.png',
            voteNum: 999,
        },
    ];

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
                    <CardList ref={cardListRef} list={characterList} />
                </div>
                <div className="tw-sticky tw-flex tw-bottom-0 tw-h-0 tw-left-0 tw-z-10 tw-w-full">
                    <div className="tw-relative tw-flex tw-h-screen tw--translate-y-full">
                        <div className="tw-py-24">
                            <ThumbnailList
                                ref={thumbnailListRef}
                                translateY={thumbnailTranslateY}
                                list={characterList}
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
