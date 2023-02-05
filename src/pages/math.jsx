//import fs from 'fs'
//import { Inter } from '@next/font/google'
//import path from 'path'
//import matter from 'gray-matter'
import axios from "axios";

import Link from 'next/link';

const Math = (props) => {
    console.log(props)
    let data = props.posts.data
    return (
        <div className="mt-3">
            <p className="display-4 text-center">Mathematics</p>
            <p className="text-center">Topics</p>
            <div className="black" style={{ color: 'black' }}>
                {data.map((post) => (
                    <Link href={'/math/' + post.id} passHref key={post.id}>
                        <div className="card mb-3 pointer" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.attributes.title}</h5>
                                        <p className="card-text">{post.attributes.description}</p>
                                        <p className="card-text">
                                            <small className="text-muted">{post.attributes.publishedAt}</small>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 m-auto">

                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}



export const getStaticProps = async () => {
    //getting data locally, but, if data is stored else where, i could do an API call here
    const posts = await axios.get("https://strapi-production-1c44.up.railway.app/api/posts")
    return {
        props: {
            posts: posts.data
        }
    };
}

export default Math;


