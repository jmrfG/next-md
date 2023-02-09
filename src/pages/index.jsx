import axios from "axios";
import Link from 'next/link'


export default function Home(props) {
  let data = props.posts.data
  return (
    <div className="mt-4">
        <p className="display-3 text-center">Some Thoughts</p>
        <div style={{ color: 'black', maxWidth:'540px', margin: "0 auto"}}>
            {data.map((post) => (
                <Link href={'/content/' + post.id} passHref key={post.id}>
                    <div className="card mb-4 pointer" style={{ maxWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{post.attributes.title}</h5>
                                    <p className="card-text">{post.attributes.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">Published At: {post.attributes.publishedAt.split("T")[0]}</small>
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