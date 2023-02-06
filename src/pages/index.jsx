import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'


export default function Home({ posts }) {
  return (
    <div className="mt-5">
      <p className="display-4 text-center">Welcome</p>
      <p className="text-center mt-5">
        The pursuit of knowledge is a journey divine,<br></br>
        An adventure that's both challenging and fine.<br></br>
        With every step taken, the mind doth grow,<br></br>
        As wisdom and insight begin to flow.<br></br>
        <br></br><br></br>
        The journey is never-ending, full of grace,<br></br>
        An ever-unfolding treasure trove of space.<br></br>
        For knowledge is the key to unlock doors,<br></br>
        To new and wondrous worlds never before.<br></br>
        <br></br><br></br>
        And in this quest, one finds true beauty, too,<br></br>
        A splendor that shines like the morning dew.<br></br>
        For knowledge is power, a precious gem,<br></br>
        That enriches the soul and lifts the heart to win.<br></br>
        <br></br><br></br>
        So heed the call to pursue knowledge with might,<br></br>
        For it's a journey that will bring endless delight.<br></br>
        It's a path to follow, a destiny bright,<br></br>
        That leads to a place of peace, love and light.<br></br>
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