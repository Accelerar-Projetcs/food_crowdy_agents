import React from 'react';
import Paginator from 'react-hooks-paginator';

const Pagination = (prop) => {
  const { pageLimit, setOffset, currentPage, setCurrentPage ,data} = prop;
  

	return (
		<Paginator
			totalRecords={data}
			pageLimit={pageLimit}
			pageNeighbours={2}
			setOffset={setOffset}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
		/>
	);
};

export default Pagination;
