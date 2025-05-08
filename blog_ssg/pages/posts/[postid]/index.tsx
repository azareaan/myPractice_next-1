import { GetStaticPaths, GetStaticProps } from "next";
import styles from "@/styles/postDetaile.module.css";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home({post}: {post: Post}) {
  return (
    <>
      <main className={styles.main}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { postid: "1" } },
            { params: { postid: "2" } },
            { params: { postid: "3" } },
            { params: { postid: "4" } },
            { params: { postid: "5" } },
        ],
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  const { postid } = context.params as { postid: string };
  const post = posts.find((p: Post) => p.id.toString() === postid);

  return {
    props: {
      post: post,
    },
  };
};