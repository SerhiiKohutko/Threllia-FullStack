export const getCurrPosition = (setPosition, variants, categoryName) => {

    let currPosition = [];

    Object.entries(variants).forEach(([key]) => {
        if (key === categoryName) {
            currPosition = [key];
        }
    })


    Object.entries(variants).forEach(([key, value]) => {
        if (value.includes(categoryName)) {
            currPosition = [key, categoryName];
        }
    })


    setPosition(currPosition);
}

export const Position = ({navigate, categoryName, position}) => {
    return (
        <p className={"text-xl"}>
            <span className={"cursor-pointer hover:underline"} onClick={() => navigate("/")}>Home</span>
            <span> -> </span>
            <span className={"cursor-pointer hover:underline"}
                  onClick={() => navigate("/shop")}>Shop</span>
            {
                categoryName && position?.map((item, index) => {
                    return (
                        <span key={index}>
                            <span> -> </span>
                            <span className={"cursor-pointer hover:underline"}
                                  onClick={() => navigate(`/shop/${item}`)}>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                        </span>
                    )
                })
            }
        </p>
    )
}