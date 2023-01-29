import Image from 'next/image'
import fs from 'fs'
import { Inter } from '@next/font/google'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <div className="mt-5" style={{color:"black"}}>
      {posts.map((post, index) => (
        <Link href={'/blog/' + post.slug} passHref key={index}>
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
  )
}


export const getStaticProps = async () => {
  //getting data locally, but, if data is stored else where, i could do an API call here
  const files = fs.readdirSync(path.join('src', 'Posts'))
  const posts = files.map(file => {
    const mdWMeta = fs.readFileSync(path.join('src', 'Posts', file));
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