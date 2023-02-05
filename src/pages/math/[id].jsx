//import fs from 'fs'
//import { Inter } from '@next/font/google'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
//import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { MDXRemote } from 'next-mdx-remote'
import Button from '../../components/Button/Button'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import axios from 'axios'
import MarkdownIt from 'markdown-it'


//In order to create a dynamic path, I'll need to wrap the file name with square brackets
//and settup the getStaticPaths function


//every component in your mdx file should be declared in here, otherwise problem will find u
const components = { SyntaxHighlighter, Button }
//            <MDXRemote {props.post.data.attributes.Content} components={components}  />


const Post = ( {mdxSource} ) => {
    console.log(mdxSource)
    return (
        <div className="mt-4">
            <MDXRemote {...mdxSource} components={components}  />
        </div>
    )
}


const getStaticPaths = async () => {
    const posts = await axios.get("https://strapi-production-1c44.up.railway.app/api/posts")
    const data = posts.data.data
    const paths = data.map((post) => {
        let id = post.id.toString();
        return { params: { id: id } }
    })
    return {
        paths,
        fallback: false
    }
}

const getStaticProps = async ({ params }) => {
    //getting data locally, but, if data is stored else where, i could do an API call here
    console.log(params.id)
    const posts = await axios.get(`https://strapi-production-1c44.up.railway.app/api/posts/${params.id}`);
    //At this point we have almost everythin ready to bust a nut, but we need that next-mdx-remote to actually render the file content.
    const source = posts.data.data.attributes.content
    //console.log(source) OK
    const mdxSource = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            format: 'detect'
        }
    })
    return {
        props: {
            mdxSource
        }
    }
}

export { getStaticPaths, getStaticProps }
export default Post;