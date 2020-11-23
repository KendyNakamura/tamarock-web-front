import Layout from "../components/layout";

export default function Custom404({ status }) {
  return (
    <Layout>
      <div className="box">
        <h1>{status} - Page Not Found</h1>
      </div>
    </Layout>
  );
}
