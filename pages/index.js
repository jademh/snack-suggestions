import matter from "gray-matter";
import Layout from "../components/MyLayout";
import Link from "next/link";

const Index = props => {
  console.log(props);
  return (
    <Layout>
      <ul>
        {props.allBlogs.map(blog => (
          <li key={blog.slug}>
            <Link href="/blog/[slug]" as={`/blog/${blog.slug}`}>
              <a>{blog.document.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  // get all .md files from the src/posts dir
  const posts = (context => {
    // grab all the files matching this context
    const keys = context.keys();
    // grab the values from these files
    const values = keys.map(context);
    // go through each file
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      // get the current file value
      const value = values[index];
      // Parse frontmatter & markdownbody for the current file
      const document = matter(value.default);
      // return the .md content & pretty slug
      return {
        document,
        slug
      };
    });
    // return all the posts
    return data;
  })(require.context("../content/pages", true, /\.md$/));

  return {
    allBlogs: posts
  };
};

export default Index;
