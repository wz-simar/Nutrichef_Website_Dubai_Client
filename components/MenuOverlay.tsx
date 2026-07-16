"use client";
import React, { useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { LanguageSelect } from '@/components/LanguageSelect';

const navLinks = [
    { name: 'Homepage', href: '/', hasChild: false },
    { name: 'Design Your Plan', href: '/plans', hasChild: false },
    { name: "This Week's Menu", href: '/menu', hasChild: false },
    { name: 'Subscribe & Save', href: '/subscribe', hasChild: false },
    { name: 'Why us', href: '/why-us', hasChild: false },
    { name: '🇦🇪 United Arab Emirates', href: '/uae', hasChild: false },
    { name: '🇸🇦 Saudi Arabia', href: '/saudi-arabia', hasChild: false },
    { name: '🇶🇦 Qatar', href: '/qatar', hasChild: false },
    { name: '🇰🇼 Kuwait', href: '/kuwait', hasChild: false },
    { name: 'FAQ', href: '/faq', hasChild: false },
    { name: 'Contact & Concierge', href: '/contact-us', hasChild: false },
];

function useIsClient() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
}

export const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const mounted = useIsClient();

    useEffect(() => {
        if (!mounted) return;
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, mounted]);

    if (!mounted) return null;

    return createPortal(
        <div 
            className={`fixed inset-0 z-[100] flex transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="flex h-full w-full flex-col bg-surface lg:flex-row">
                
                {/* LEFT SIDE (Hidden on mobile) */}
                <div className="hidden lg:flex lg:w-[60%] xl:w-[65%] h-full relative flex-col border-r border-gray-100/50 shadow-xl z-10">
                    {/* The large image taking remaining space above the green bar */}
                    <div className="relative flex-1 overflow-hidden bg-bg-light">
                        {/* Generic Unsplash Image imitating the two users in the screenshot */}
                        <Image 
                            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070&auto=format&fit=crop" 
                            alt="People eating" 
                            fill 
                            className="object-cover object-center" 
                            unoptimized
                        />
                        {/* NutriChef logo overlay */}
                        <div className="absolute top-[42px] left-12">
                            <span className="text-white font-black text-[32px] tracking-[0.12em] uppercase drop-shadow-md">NUTRICHEF</span>
                        </div>
                    </div>
                    
                    {/* Green Footer bar */}
                    <div className="relative flex h-[160px] shrink-0 flex-col justify-end bg-primary px-12 py-8">
                        {/* Float Join Us badge */}
                        <div className="absolute left-12 top-[-18px] z-10 flex items-center gap-1.5 rounded-full rounded-bl-none bg-primary py-2 pl-3.5 pr-4 text-[12px] font-extrabold text-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                           <span className="text-[14px]">✨</span> Join us
                        </div>
                        
                        <div className="flex justify-between items-center w-full pb-2">
                           <h2 className="text-white text-[28px] font-bold tracking-tight">Download app</h2>
                           <div className="flex gap-4">
                               {/* App Store Mock */}
                               <div className="border border-white/40 rounded-xl px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.7 13.9c-.8 0-1.8-.4-2.5-.4s-1.8.4-2.6.4c-1.2 0-2.3-1.1-3-2.1-1.3-1.9-1.3-5 .1-6.9.7-1 1.7-1.5 2.8-1.5 1 0 1.9.5 2.5.5s1.6-.6 2.7-.6c1.1 0 2.2.6 2.7 1.6-2.2 1.3-1.8 4.2.5 5.3-.6 1.4-1.6 3.1-3.2 3.7zM14.9 6c-.2 1.3-1.1 2.3-2.3 2.5-.2-1.3.9-2.5 2.1-2.9.1.1.2 0 .2.4z"/></svg>
                                   <div className="flex flex-col items-start translate-y-[-2px]">
                                       <span className="text-[9px] text-white font-medium">Download on the</span>
                                       <span className="text-[16px] text-white font-bold leading-none mt-1">App Store</span>
                                   </div>
                               </div>
                               {/* Play Store Mock */}
                               <div className="border border-white/40 rounded-xl px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M3.6 20.4L18.8 12 3.6 3.6v16.8z" fillOpacity=".8"/><path d="M18.8 12L3.6 20.4 12 12l-8.4-8.4L18.8 12z" fillOpacity=".5"/></svg>
                                   <div className="flex flex-col items-start translate-y-[-2px]">
                                       <span className="text-[9px] text-white font-medium">GET IT ON</span>
                                       <span className="text-[16px] text-white font-bold leading-none mt-1">Google Play</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-[40%] xl:w-[35%] h-full bg-white relative flex flex-col pt-[max(5.25rem,env(safe-area-inset-top)+3rem)] px-5 sm:px-8 md:px-12 lg:px-14 pb-[max(2.625rem,env(safe-area-inset-bottom))] overflow-y-auto">
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        type="button"
                        className="fixed right-[max(1.25rem,env(safe-area-inset-right))] top-[max(3rem,env(safe-area-inset-top)+0.75rem)] z-[110] flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2.5 text-foreground transition-colors hover:bg-bg-light"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Links List */}
                    <div className="flex flex-col gap-[28px] mt-2">
                        {navLinks.map((link, idx) => (
                            <Link key={idx} href={link.href} onClick={onClose} className="group flex items-center text-foreground transition-colors hover:text-primary">
                                <span className="text-[14px] font-[800] tracking-tight">{link.name}</span>
                                {link.hasChild && (
                                    <svg className="ml-2 h-3.5 w-3.5 text-foreground transition-colors group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Language — same control as footer (single Google gadget site-wide) */}
                    <div className="mt-auto pt-16 w-full flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <span className="text-[12px] font-[800]">Language / اللغة</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <LanguageSelect selectId="nutrichef-lang-menu" />
                    </div>

                </div>

            </div>
        </div>,
        document.body
    );
};
