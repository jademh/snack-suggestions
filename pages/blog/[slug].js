import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/MyLayout";

export default function BlogTemplate(props) {
  // data from getInitialProps
  const markdownBody = props.content;
  const frontmatter = props.data;
  return (
    <Layout>
      <article>
        <h1>{frontmatter.title}</h1>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  );
}

BlogTemplate.getInitialProps = async function(context) {
  // context contains the query param
  const { slug } = context.query;
  // grab the file in the posts dir based on the slug
  const content = await import(`../../content/pages/${slug}.md`);
  //gray-matter parses the yaml frontmatter from the md body
  const data = matter(content.default);
  return {
    ...data
  };
};
