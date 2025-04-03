import {Github, Youtube} from "lucide-react";
import {FaSpotify} from "react-icons/fa6";

export const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-amber-700/20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-3xl font-rubikPaint mb-6">THRL</h3>
                        <p className="text-gray-400 mb-4">FROM JUSTICE NO HOPE TOUR 2025</p>
                        <p className="text-gray-400">© {new Date().getFullYear()} Threllia. All rights reserved.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-tradeWinds mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/tour" className="hover:text-amber-500 transition">Tour Dates</a></li>
                            <li><a href="/releases" className="hover:text-amber-500 transition">Music</a></li>
                            <li><a href="/shop" className="hover:text-amber-500 transition">Merch</a></li>
                            <li><a href="/gallery" className="hover:text-amber-500 transition">Media</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-tradeWinds mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-amber-500 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-amber-500 transition">Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-tradeWinds mb-4">Contact</h4>
                        <p className="text-gray-400 mb-2">For booking inquiries:</p>
                        <a href="mailto:booking@threllia.com" className="text-amber-500 hover:text-amber-400 transition">booking@threllia.com</a>
                        <p className="text-gray-400 mt-4 mb-2">For press:</p>
                        <a href="mailto:threllia@gmail.com" className="text-amber-500 hover:text-amber-400 transition">threllia@gmail.com</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-amber-700/20 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">Site designed by your agency. Powered by React.</p>
                    <div className="flex space-x-4">
                        <a href="https://www.youtube.com/@Threllia"
                           className="text-gray-400 hover:text-amber-500 transition">
                            <Youtube className="h-5 w-5"/>
                        </a>
                        <a href="https://www.tiktok.com/@threllia"
                           className="text-gray-400 hover:text-amber-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-tiktok h-5 w-5" viewBox="0 0 16 16">
                                <path
                                    d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                            </svg>
                        </a>
                        <a href="https://open.spotify.com/artist/5R6TtzzCoaQAwyVjsAjyuz?si=0eGMEzOeSe-4G-R8PWnRuA"
                           className="text-gray-400 hover:text-amber-500 transition">
                            <FaSpotify className="h-5 w-5"/>
                        </a>
                        <a href="https://github.com/SerhiiKohutko"
                           className="text-gray-400 hover:text-amber-500 transition">
                            <Github className="h-5 w-5"/>
                        </a>
                    </div>
                </div>
            </div>
            <style jsx={"true"}>{`
                @keyframes riseUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
            opacity: 0.7;
            width: 1px;
            height: 1px;
          }
          
          50% {
            opacity: 0.5;
            width: 2px;
            height: 2px;
          }
          
          100% {
            transform: translateY(-100px) translateX(${Math.random() > 0.5 ? '15px' : '-15px'}) rotate(${Math.random() > 0.5 ? '180deg' : '-180deg'});
            opacity: 0;
            width: 0.5px;
            height: 0.5px;
          }
        }
        
        .ash-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .ash-particle {
          position: absolute;
          bottom: -5px;
          width: 1px;
          height: 1px;
          background-color: #f59e0b;
          border-radius: 50%;
          opacity: 0.7;
          animation: riseUp infinite;
        }
      `}</style>
        </footer>
    );
}