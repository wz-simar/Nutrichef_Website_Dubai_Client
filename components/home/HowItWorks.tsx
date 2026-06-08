"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { caloBlogImage } from '@/lib/calo-images';
import { Button } from '../Button';

const steps = [
    {
        id: 1,
        title: 'Find your perfect meal plan',
        description: 'We create your menu around your lifestyle, goals, and favorite foods.',
        image: caloBlogImage('imaghe-37.webp'),
    },
    {
        id: 2,
        title: 'You choose, we cook',
        description: "Pick your favorite dishes, and we'll prepare them fresh and flavorful to fit your needs and schedule.",
        image: caloBlogImage('imaghe-9-1.webp'),
    },
    {
        id: 3,
        title: 'Enjoy daily fresh deliveries',
        description: 'We deliver fresh meals every day. Just heat, eat and enjoy.',
        image: caloBlogImage('imaghe-7.webp'),
    }
];

export const HowItWorks = () => {
    const router = useRouter();
    return (
        <section className="py-24 bg-white w-full">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#2F3337] mb-4 tracking-tight">
                        How it works
                    </h2>
                    <p className="text-[17px] md:text-[18px] text-[#6B7280] font-semibold mb-8">
                        Hit your goals effortlessly with NutriChef in 3 simple steps
                    </p>
                    <Button
                        type="button"
                        onClick={() => router.push('/plans')}
                        className="bg-[#249B60] hover:bg-[#1E8351] text-white px-8 rounded-full h-[46px] text-[15px] shadow-sm font-bold border-none w-max"
                    >
                        See plans
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10 pt-2 lg:px-4">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col">
                            <div className="relative mb-7">
                                {/* Number Badge */}
                                <div className="absolute -top-[18px] -left-[14px] z-10 w-[42px] h-[42px] bg-[#1a4a38] text-white rounded-full flex items-center justify-center text-[18px] font-black border-[5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                                    {step.id}
                                </div>
                                {/* Image Box */}
                                <div className="relative aspect-[1/1.05] w-full rounded-[28px] overflow-hidden bg-[#F7F7F8] shadow-sm">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            </div>
                            
                            <h3 className="text-[20px] lg:text-[22px] font-extrabold text-[#2F3337] mb-3 leading-tight tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-[15px] font-semibold text-[#878E99] leading-[1.6]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
