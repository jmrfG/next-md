import fs from 'fs'
import { Inter } from '@next/font/google'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { MDXRemote } from 'next-mdx-remote'
import Button from '../../components/Button/Button'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import axios from 'axios'
//In order to create a dynamic path, I'll need to wrap the file name with square brackets
//and settup the getStaticPaths function


//every component in your mdx file should be declared in here, otherwise problem will find u
const components = {SyntaxHighlighter, Button}

const Slug = ({ 
    frontmatter,
    mdxSource }) => {
    return (
        <div className="mt-4">
            <h1>{frontmatter.title}</h1>
            <MDXRemote {...mdxSource} components={components}  />
        </div>
    )
}


const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('src', 'Posts', 'General'))
    const paths = files.map(file => {
        return {params: {
            //this mf needs to have the same dummy name of the jsx file 
            slug: file.split('.')[0]
        }}
    });
    return {
        paths,
        fallback: false
    };
}

const getStaticProps = async ({ params: { slug } }) => {
    //getting data locally, but, if data is stored else where, i could do an API call here
    const mdWMeta = fs.readFileSync(path.join('src', 'Posts', 'General', slug + '.mdx'));

    const { data: frontmatter, content } = matter(mdWMeta)
    //At this point we have almost everythin ready to bust a nut, but we need that next-mdx-remote to actually render the file content.
    const mdxSource = await serialize(
        content,
        {
            mdxOptions: {
                remarkPlugins:[remarkMath],
                rehypePlugins:[rehypeKatex],
            }
        }
        
        )

    return {
        props: {
            frontmatter,
            slug,
            mdxSource
        }
    }
}

export {getStaticPaths, getStaticProps}
export default Slug;