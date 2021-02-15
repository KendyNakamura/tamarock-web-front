import React from "react";
import Layout from "../components/layout";

interface ERROR {
  status: string
}

const Custom404: React.FC<ERROR> = ({ status }) => {
  return (
    <Layout>
      <div className="box">
        <h1>{status} - Page Not Found</h1>
      </div>
    </Layout>
  );
}
export default Custom404;