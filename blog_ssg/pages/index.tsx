import styles from "@/styles/Home.module.css";
import { GetStaticProps } from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}[];

export default function Home({posts}: {posts: Post}) {
  return (
    <>
      <main className={styles.main}>
        <h1>Blog Posts</h1>
        <ul>
          {posts.map(post => (
            <a href={`/posts/${post.id}`} key={post.id}>
              <li>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            </a>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allposts = await res.json();
  const posts = allposts.slice(0, 5);

  return {
    props: {
      posts,
    },
  };
};