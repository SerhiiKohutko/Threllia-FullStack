import {Github, InstagramIcon, Twitter, Youtube, YoutubeIcon} from "lucide-react";
import {FollowUsTikTokVideo} from "@/components/Pages/HomePage/Sections/SectionComponents/FollowUsTikTokVideos.jsx";
import {FaSpotify} from "react-icons/fa6";

export const FollowUsSection = () => {
    return (
        <section className="py-16 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-rubikPaint text-white mb-8">FOLLOW THE CHAOS</h2>
                <div className="flex justify-center space-x-8 mb-12">
                    <a href="https://www.youtube.com/@Threllia" className="text-white hover:text-amber-500 transition">
                        <Youtube className="h-8 w-8"/>
                    </a>
                    <a href="https://www.tiktok.com/@threllia" className="text-white hover:text-amber-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-tiktok h-7 w-7" viewBox="0 0 16 16">
                            <path
                                d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                        </svg>
                    </a>
                    <a href="https://open.spotify.com/artist/5R6TtzzCoaQAwyVjsAjyuz?si=0eGMEzOeSe-4G-R8PWnRuA" className="text-white hover:text-amber-500 transition">
                        <FaSpotify className="h-8 w-8"/>
                    </a>
                    <a href="https://github.com/SerhiiKohutko" className="text-white hover:text-amber-500 transition">
                        <Github className="h-8 w-8"/>
                    </a>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[...Array(6)].map((_, index) => (
                        <FollowUsTikTokVideo index={index}/>
                    ))}
                </div>
            </div>



        </section>
    );
}

