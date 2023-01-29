import Image from 'next/image'
import fs from 'fs'
import { Inter } from '@next/font/google'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <div className="mt-5">
      <p className="display-4 text-center">Welcome</p>
      <p className="text-center">
        Holder
      </p>
    </div>
  )
}


export const getStaticProps = async () => {
  //getting data locally, but, if data is stored else where, i could do an API call here
  const files = fs.readdirSync(path.join('src', 'Posts', 'General'))
  const posts = files.map(file => {
    const mdWMeta = fs.readFileSync(path.join('src', 'Posts', 'General', file));
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