import { useState } from "react";
import { useGetWeather } from "../hooks/useGetWeather";
import { twMerge } from "tailwind-merge";

export const Hero = () => {
	const [city, setCity] = useState("france");
	const [fetchCity, setFetchCity] = useState("france");
	const [weatherTempIndicator, setWeatherTempIndicator] = useState<0 | 1>(0);

	const { data, status } = useGetWeather(fetchCity);

	const date = data?.location.localtime.split(" ")[1];
	if (status === "error") return <div className="text-center">error</div>;
	if (status === "pending") return <div className="text-center">loading</div>;
	return (
		<section className="w-max p-10 min-h-10/12  bg-slate-100/20 backdrop-blur-md rounded-lg drop-shadow-lg border-white border-2 mx-auto ">
			<div className=" w-max  rounded-md drop-shadow-sm mx-auto px-8 py-16">
				<div className=" border-b-2 pl-4 flex justify-center gap-1 items-center">
					<p className="text-base font-bold">{data?.location.name}</p>
					<p className=" text-xs text-gray-500">{date}</p>
					<h6 className=" text-xs text-gray-500">{data?.current.condition.text}</h6>
				</div>
				<div className="grid place-items-center  max-w-max">
					<div className="flex items-center w-max">
						<img src={data?.current.condition.icon} alt="" className="" />
						<div className="flex items-start">
							<div className="w-16 font-bold text-4xl text-center pt-2 ">
								{weatherTempIndicator === 0 ? (
									<button className="">{data?.current.temp_c}</button>
								) : (
									<button className="">{data?.current.temp_f}</button>
								)}
							</div>
							{data && (
								<div className="max-h-full flex items-center gap-1 justify-between px-2 ">
									<button
										onClick={() => setWeatherTempIndicator(0)}
										className={twMerge(
											"border-none p-0 m-0 text-base text-gray-400",
											weatherTempIndicator === 0 ? "text-black" : "",
										)}
									>
										°C
									</button>
									|
									<button
										onClick={() => setWeatherTempIndicator(1)}
										className={twMerge(
											"border-none p-0 m-0 text-base text-gray-400",
											weatherTempIndicator === 1 ? "text-black" : "",
										)}
									>
										°F
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="grid place-items-center gap-2">
				<input type="text" className="border-2 rounded-lg py-1 px-2" onChange={(e) => setCity(e.target.value)} />
				<button
					onClick={() => {
						setFetchCity(city);
						setCity("");
					}}
					className="bg-yellow-300 px-2 py-1 rounded-md "
				>
					get weather
				</button>
			</div>
		</section>
	);
};