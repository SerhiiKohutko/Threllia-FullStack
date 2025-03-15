import {HeroSection} from "@/components/HomePage/Sections/HeroSection.jsx";
import {SignUpBannerSection} from "@/components/HomePage/Sections/SignUpBannerSection.jsx";
import {StoreOverviewSection} from "@/components/HomePage/Sections/StoreOverviewSection.jsx";
import {LatestUpdateOverviewSection} from "@/components/HomePage/Sections/LatestUpdateOverviewSection.jsx";
import {GalleryOverviewSection} from "@/components/HomePage/Sections/GalleryOverviewSection.jsx";
import {FollowUsSection} from "@/components/HomePage/Sections/FollowUsSection.jsx";
import {TourSectionOverviewSection} from "@/components/HomePage/Sections/TourSection.jsx";

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