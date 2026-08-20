import {  useHonoClient } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

export const useCreateTodo = () => {
    const client = useHonoClient()
    type ResponseType = InferResponseType<typeof client.api.properties.$post, 201>;
    type RequestType = InferRequestType<typeof client.api.properties.$post>["json"];

	const queryClient = useQueryClient();
	return useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (json) => {
			const response = await client.api.properties.$post({ json });

			if (!response.ok) {
				throw new Error("Failed to create property");
			}

			return await response.json();
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todo"] });
		},
	});
};
