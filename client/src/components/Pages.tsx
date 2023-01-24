import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Context } from "..";

const Pages = observer(() => {
  const {client}: any = useContext(Context)
  const pageCount = Math.ceil(client.totalCount / client.limit);
  const pages: number[] = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
      <Pagination className="m-3" size="lg">
        {pages.map((page) => 
          <Pagination.Item 
            key={page}
            active={client.page === page} 
            onClick={() => client.setPage(page)}
            >
              {page}
          </Pagination.Item>
        )}
      </Pagination>
  )
});

export default Pages;
