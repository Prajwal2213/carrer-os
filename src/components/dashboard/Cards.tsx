type cardProps = {
    title : string, 
    num : string
}

export default function Cards({title, num} : cardProps) {
    return (
        <div className=" border bg-green-100 rounded-xl w-70 h-50">
            <div className="flex justify-center mt-10">
                <h1 className="font-bold text-2xl ">{title}</h1>
            </div>
            <div className="flex justify-center mt-10">
                <span className="text-2xl">{num}</span>
            </div>
        </div>
    );
}