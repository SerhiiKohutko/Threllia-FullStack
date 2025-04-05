import bgImage from "@/resources/ajfajm_THRELLIA_aggressive_style_metal_band_logo_for_profile_pi_0572d61d-363c-45bc-9c66-9833d73e2d63.png";
import {Hero} from "@/components/ReusableComponents/Hero.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {MyPagination} from "@/components/ReusableComponents/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllPhotosPaginated} from "@/redux/gallery/Action.js";
import {useNavigate} from "react-router-dom";
import {LoadingPage} from "@/components/ReusableComponents/LoadingPage.jsx";



export const Gallery = () => {
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photo);
    const [currPage, setCurrPage] = useState(1);
    const [selectValue, setSelectValue] = useState("DSC");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllPhotosPaginated(currPage, selectValue));
    }, [currPage, selectValue]);

    useEffect(() => {
            setLoading(photo.loading);
    }, [photo.loading]);

    function handleSelectChange(value){
        if (value !== selectValue) {
            setSelectValue(value);
        }
    }

    if (loading){
        return <LoadingPage/>
    }

    return (
      <div>
          <Hero background={bgImage} pageTitle={"Gallery"}/>
          <div className={"min-h-[50rem] bg-gray-900 flex flex-col items-center"}>
              <div
                  className={"text-white w-[50%] h-full border-b-2 border-orange-300 flex flex-row justify-between mt-8 pb-5"}>
                  <p className={"text-3xl font-rubikPaint"}>Explore Photos</p>
                  <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className={"w-[180px] text-white"}>
                          <SelectValue placeholder={<span className="text-gray-400">Sort By</span>}/>
                      </SelectTrigger>
                      <SelectContent className={"text-white bg-slate-700 "}>
                          <SelectItem className={"focus:bg-gray-400"} value="DSC">Newest to oldest</SelectItem>
                          <SelectItem className={"focus:bg-gray-400"} value="ASC">Oldest to newest</SelectItem>
                      </SelectContent>
                  </Select>

              </div>
              <div className={"w-[50%] mt-8 mb-8"}>
                  <div className={" grid grid-cols-4 lg:grid-cols-4 gap-2"}>
                      {
                          photo.photos?.map(elem => {
                              return (
                                  <div onClick={() => navigate("/gallery/" + elem.id)}>
                                      <img
                                          src={(elem?.firstElementPhotoName === null ? "" : elem?.firstElementPhotoName) }
                                           className={"cursor-pointer"}/>
                                      <p className={"text-2xl text-white"}>{elem.date}</p>
                                      <p className={"text-2xl text-gray-200"}>{elem.title}</p>
                                  </div>
                              );
                          })
                      }
                  </div>
              </div>

              <div className={"min-h-full pb-5 pt-5"}>
                  { photo.photos.length > 0 &&
                      <MyPagination plural={photo} currPage={currPage} setCurrPage={setCurrPage} />
                  }
              </div>
          </div>
      </div>
    );
}