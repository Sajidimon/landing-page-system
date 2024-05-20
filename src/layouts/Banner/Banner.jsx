


const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-[450px]">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://i.pinimg.com/736x/48/ba/96/48ba9628b7a475d24b5e27d878761347.jpg" className="w-full" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://ghorerbazar.com/cdn/shop/files/web-salider-mango.jpg?v=1715508940" className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://i.pinimg.com/736x/48/ba/96/48ba9628b7a475d24b5e27d878761347.jpg" className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="https://media.licdn.com/dms/image/C4E1BAQGAQ1ou7gdf1w/company-background_10000/0/1647849898389/ghorerbazar_bd_cover?e=2147483647&v=beta&t=_Lg7VvRpVBxqnyAxLFL-tOszX5MVAaRQLPZrdigkZSg" className="w-full" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div>
    );
};

export default Banner;