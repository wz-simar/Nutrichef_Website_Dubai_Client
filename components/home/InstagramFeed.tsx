import React from 'react';
import Image from 'next/image';
import { caloBlogImage } from '@/lib/calo-images';

const instaPosts = [
    { handle: 'sultanfalasi', img: caloBlogImage('Rectangle-6495.webp'), avatar: 'https://i.pravatar.cc/100?u=sultan' },
    { handle: 's_mozakzak', img: caloBlogImage('Rectangle-6496.webp'), avatar: 'https://i.pravatar.cc/100?u=moz' },
    { handle: 'laurazaraa', img: caloBlogImage('imaghe-37.webp'), avatar: 'https://i.pravatar.cc/100?u=laura' },
    { handle: 'khadija.chahmoud', img: caloBlogImage('imaghe-9-1.webp'), avatar: 'https://i.pravatar.cc/100?u=khadija' },
    { handle: 'nasegeh', img: caloBlogImage('imaghe-7.webp'), avatar: 'https://i.pravatar.cc/100?u=nasegeh' },
    { handle: 'taatgorgulho', img: caloBlogImage('Rectangle-6495.webp'), avatar: 'https://i.pravatar.cc/100?u=taat' },
    { handle: 'ommie10', img: caloBlogImage('imaghe-37.webp'), avatar: 'https://i.pravatar.cc/100?u=ommie' }
];

export const InstagramFeed = () => {
    return (
        <section className="bg-[#2B9D65] py-[60px] pb-[70px] overflow-hidden w-full">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full mb-8">
                <h3 className="text-white text-[28px] md:text-[32px] font-bold tracking-tight">
                    More from our community
                </h3>
            </div>

            <div className="flex w-full overflow-hidden pointer-events-none select-none relative">
                 <style>{`
                    @keyframes marquee-insta {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-100%); }
                    }
                    .animate-marquee-insta {
                        animation: marquee-insta 35s linear infinite;
                    }
                `}</style>
                <div className="flex w-max shrink-0 animate-marquee-insta items-center gap-[22px] pr-[22px] pl-4 sm:pl-6 lg:pl-12 2xl:pl-[calc((100vw-1400px)/2+48px)]">
                    {instaPosts.map((post, i) => (
                        <div key={`i1-${i}`} className="w-[280px] md:w-[320px] bg-white rounded-[24px] overflow-hidden shadow-sm flex-shrink-0 flex flex-col p-3">
                             <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-gray-100">
                                 <Image src={post.img} alt={`Community post by @${post.handle}`} fill className="object-cover" sizes="320px" unoptimized />
                             </div>
                             <div className="flex items-center px-2 py-[14px] bg-white h-[58px]">
                                 <div className="w-[26px] h-[26px] rounded-full overflow-hidden relative mr-2.5 shrink-0 bg-gray-200">
                                     <Image src={post.avatar} alt={`@${post.handle} profile photo`} fill className="object-cover" sizes="26px" unoptimized />
                                 </div>
                                 <span className="text-[#2F3337] font-semibold text-[13px]">@{post.handle}</span>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-max shrink-0 animate-marquee-insta items-center gap-[22px] pr-[22px]">
                    {instaPosts.map((post, i) => (
                        <div key={`i2-${i}`} className="w-[280px] md:w-[320px] bg-white rounded-[24px] overflow-hidden shadow-sm flex-shrink-0 flex flex-col p-3">
                             <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-gray-100">
                                 <Image src={post.img} alt={`Community post by @${post.handle}`} fill className="object-cover" sizes="320px" unoptimized />
                             </div>
                             <div className="flex items-center px-2 py-[14px] bg-white h-[58px]">
                                 <div className="w-[26px] h-[26px] rounded-full overflow-hidden relative mr-2.5 shrink-0 bg-gray-200">
                                     <Image src={post.avatar} alt={`@${post.handle} profile photo`} fill className="object-cover" sizes="26px" unoptimized />
                                 </div>
                                 <span className="text-[#2F3337] font-semibold text-[13px]">@{post.handle}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
