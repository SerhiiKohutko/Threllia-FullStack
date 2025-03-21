import {HeroSection} from "@/components/Pages/HomePage/Sections/HeroSection.jsx";
import {SignUpBannerSection} from "@/components/Pages/HomePage/Sections/SignUpBannerSection.jsx";
import {StoreOverviewSection} from "@/components/Pages/HomePage/Sections/StoreOverviewSection.jsx";
import {LatestUpdateOverviewSection} from "@/components/Pages/HomePage/Sections/LatestUpdateOverviewSection.jsx";
import {GalleryOverviewSection} from "@/components/Pages/HomePage/Sections/GalleryOverviewSection.jsx";
import {FollowUsSection} from "@/components/Pages/HomePage/Sections/FollowUsSection.jsx";
import {TourSectionOverviewSection} from "@/components/Pages/HomePage/Sections/TourSection.jsx";

export const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <SignUpBannerSection/>
            <TourSectionOverviewSection/>
            <StoreOverviewSection/>
            <LatestUpdateOverviewSection/>
            <GalleryOverviewSection/>
            <FollowUsSection/>
            <SignUpBannerSection/>
        </div>
    );
}