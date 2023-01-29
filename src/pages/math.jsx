import fs from 'fs'
import { Inter } from '@next/font/google'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const Math = ({ posts }) => {
    return (
        <div className="mt-3">
            <p className="display-4 text-center">Mathematics</p>
            <p className="text-center">Topics</p>
            <div className="black" style={{ color: 'black' }}>
                {posts.map((post, index) => (
                    <Link href={'/math/' + post.slug} passHref key={index}>
                        <div className="card mb-3 pointer" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.frontmatter.title}</h5>
                                        <p className="card-text">{post.frontmatter.description}</p>
                                        <p className="card-text">
                                            <small className="text-muted">{post.frontmatter.date}</small>
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
    const files = fs.readdirSync(path.join('src', 'Posts', 'Mathematics'))
    const posts = files.map(file => {
        const mdWMeta = fs.readFileSync(path.join('src', 'Posts', 'Mathematics', file));
        const { data: frontmatter } = matter(mdWMeta);
        return {
            frontmatter,
            slug: file.split('.')[0]
        }
    })
    return {
        props: {
            posts
        }
    };
}

export default Math;


