export const NothingFoundHere = () => (
    <div className="flex bg-black flex-col items-center justify-center py-16 text-center">
        <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
            </svg>
        </div>

        <h3 className="text-3xl font-rubikPaint text-white mb-3">Nothing Found</h3>

        <p className="text-gray-400 max-w-md font-tradeWinds mb-6">
            We couldn't find what you're looking for.
        </p>

        <div className="w-full max-w-sm bg-gray-800 h-px">
            <div className="bg-amber-500 h-px w-1/3 mx-auto"></div>
        </div>
    </div>
);