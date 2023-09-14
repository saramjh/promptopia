"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const userProfile = ({ params }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [posts, setPosts] = useState([])
	const id = params.id
	const name = useSearchParams().get("name")

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/api/users/${id}/posts`)
			const data = await res.json()
			setPosts(data)
		}
		fetchPosts()
	}, [])
	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`)
	}
	const handleDelete = async (post) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				})

				const filteredPosts = posts.filter((p) => p._id !== post._id)

				setPosts(filteredPosts)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return <Profile name={name} desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
}

export default userProfile
