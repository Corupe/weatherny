/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const weatherAPI = "http://api.weatherapi.com/v1/current.json?key=cdfac984ac23407eb34143813240311&q=algeria&aqi=no";
const weatherAPI = "https://api.weatherapi.com/v1/current.json?key=cdfac984ac23407eb34143813240311";

export const useGetWeather = (city: string) => {
	const { data, status } = useQuery<any, Error>({
		queryKey: ["weather", city],

		queryFn: async () => {
			const { data } = await axios.get(weatherAPI, {
				params: {
					q: city,
				},
			});
			return data;
		},
	});
	return { data, status };
};
