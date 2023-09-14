import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req, { params }) => {
	try {
		await connectToDB()
		const prompts = await Prompt.findById(params.id).populate("creator")
		if (!prompts) return new Response("Not found", { status: 404 })
		return new Response(JSON.stringify(prompts), { status: 200 })
	} catch (error) {
		return new Response("fetch error", { status: 500 })
	}
}

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json()

	try {
		await connectToDB()

		const existingPrompt = await Prompt.findById(params.id)

		if (!existingPrompt) return new Response("Not found", { status: 404 })

		existingPrompt.prompt = prompt
		existingPrompt.tag = tag

		await existingPrompt.save()

		return new Response(JSON.stringify(existingPrompt), { status: 200 })
	} catch (error) {
		return new Response("fetch error", { status: 500 })
	}
}

export const DELETE = async (req, { params }) => {
	try {
		await connectToDB()
		await Prompt.findByIdAndRemove(params.id)

		return new Response("Deleted successfully", { status: 200 })
	} catch (error) {
		return new Response("failed to delete", { status: 500 })
	}
}
