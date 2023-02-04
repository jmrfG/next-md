import axios from "axios";

const Bio = (props) => {
    console.log(props)
    return (
        <div className="mt-3">
            <p className="display-4 text-center">Introduce yourself</p>
            <p className="text-center">Descriptions</p>
        </div>
    )
}

//the same as getstaticprops, but using an API and delegating it to the server 
export const getStaticProps = async () => {
    const posts = await axios.get("http://127.0.0.1:1337/api/posts", {
        headers: {
            Authorization:''
        }
    })
    return {
        props: {
            posts: posts.data
        }
    }
}

export default Bio;