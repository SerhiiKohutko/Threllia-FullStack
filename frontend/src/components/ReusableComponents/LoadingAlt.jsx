
export const LoadingPageAlt = ({title}) => {
    return (
        <section id="shop" className="py-24 bg-transparent relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                </div>

                <div className="flex items-center justify-center py-16">
                    <div className="relative z-10 max-w-md mx-auto p-6 text-white text-center">
                        <div className="flex justify-center mb-8">
                            <div className="h-12 w-12 border-2 border-t-transparent border-amber-500 rounded-full animate-spin"></div>
                        </div>

                        <h2 className="text-2xl font-light tracking-wider mb-6 font-tradeWinds">LOADING {title}</h2>

                        <div className="w-full bg-gray-800 h-px">
                            <div className="bg-amber-500 h-px animate-pulse origin-left" style={{width: '40%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};