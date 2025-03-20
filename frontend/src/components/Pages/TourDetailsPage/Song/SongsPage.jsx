import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllSongsOrdered} from "@/redux/song/Action.js";

export const SongsPage = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.song);

    useEffect(() => {
        dispatch(getAllSongsOrdered());
    },[])

    return (
        <div>
            {
                songs.songsList?.characters?.map((item, index) => (
                    <div key={index}>
                        {
                            songs.songsList?.songs?.filter(e => e.title.charAt(0) === item).map((el, index) => (
                                <div key={index}>
                                    {item + " : " + el.title}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}