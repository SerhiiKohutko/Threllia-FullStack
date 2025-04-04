import {BackgroundEffectsAlt} from "@/components/Pages/Music/Releases/ReleaseDetails.jsx";

export const LoadingPage = () => {
   return (
        <div className={"bg-black h-screen"}>
            <BackgroundEffectsAlt/>
            <div className={"h-[6rem] bg-black"}> </div>
            <div className="relative z-10 max-w-2xl mx-auto p-8 bg-black/70 text-white border border-green-500/30 shadow-lg text-center my-12">
                <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
                </div>
                <h2 className="text-3xl font-bold mb-4 font-rubikPaint">Loading content</h2>

                <div className="w-full bg-gray-800/50 rounded-full h-2.5 mt-8">
                    <div className="bg-green-500 h-2.5 rounded-full animate-pulse w-1/2"></div>
                </div>
            </div>
        </div>
    );

}