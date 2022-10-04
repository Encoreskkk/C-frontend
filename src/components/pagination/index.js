import React, { useEffect, useState } from "react";
import { Row, Pagination } from "antd";
import "./index.less";
const pageSizeOptions = [10, 20, 50, 100];

export default function MyPagination({ total, curPage = 1, change, immediately }) {
  const [limit, setSize] = useState(pageSizeOptions[0]);
  useEffect(() => {
    if (typeof immediately === "function") {
      immediately({ curPage, limit });
    }
    // eslint-disable-next-line
  }, []);
  const pageChange = (curPage, limit) => {
    setSize(limit);
    if (typeof change === "function") {
      change({ curPage, limit });
    }
  };
  return (
    <Row justify="end" className="pagination-wapper">
      <Pagination
        showSizeChanger
        onChange={pageChange}
        current={curPage}
        total={total}
        pageSizeOptions={pageSizeOptions}
      />
    </Row>
  );
}
