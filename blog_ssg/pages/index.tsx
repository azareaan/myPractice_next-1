import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

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
        <ul className={styles.postContainer}>
          {posts.map(post => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <li className={styles.post}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            </Link>
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