import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

function Home() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])
    if (posts.length === 0) {
        return !loading? (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap '>
                        <div className='p-2 w-full min-h-60'>
                            <h1 className='text-2xl font-bold inline'>
                                No posts found &nbsp;
                            </h1> 
                            {/* <Link to="/login" className='inline text-2xl underline text-blue-700'>Login</Link>
                            <h1 className='text-2xl font-bold inline'>
                                &nbsp; to read posts
                            </h1> */}

                        </div>
                    </div>
                </Container>
            </div>
        ) : <Loading />
    }
    return !loading? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : <Loading />
}

export default Home
