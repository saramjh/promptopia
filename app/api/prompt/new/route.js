import { connectToDB } from "@utils/database"
import { NextResponse } from "next/server"
import Prompt from "@models/prompt"

export const POST = async (req) => {
	const { userId, prompt, tag } = await req.json()

	try {
		await connectToDB()
		const newPrompt = new Prompt({ creator: userId, prompt, tag })
		const res = await newPrompt.save()

		return new Response(JSON.stringify(res), {
			status: 201,
		})
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify(error), { status: 500 })
	}
}
