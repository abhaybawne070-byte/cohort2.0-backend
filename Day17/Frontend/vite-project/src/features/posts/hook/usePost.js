import {getFeed} from "../services/post.api"
import {useContext} from "react"
import { PostContext } from "../post.context"

export const usePost = () =>{

    const constext = useContext(PostContext)

    const {loading , setLoading , post , setPost , feed , setFeed} = constext

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    return {loading , feed , post ,handleGetFeed}
}