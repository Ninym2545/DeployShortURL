import { Img } from "@chakra-ui/react";

export default function Loading() {
    // Or a custom loading skeleton component
    return (

        <div className="w-full h-[94vh] flex justify-center">
            <div className="flex flex-col  items-center my-auto">
            <label className="justify-center mx-auto my-2 text-xl text-gray-400">Loading...</label>
            <Img src="download.gif" width={{base : '36'}}/>
            </div>
        </div>
    )

}