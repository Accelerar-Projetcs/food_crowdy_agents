import React from 'react';
import Paginator from 'react-hooks-paginator';

const Pagination = (prop) => {
	const { pageLimit, setOffset, currentPage, setCurrentPage, data } = prop;

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

/**
 * format of what the required props...
 */
// <Pagination
// data={users.length}
// pageLimit={pageLimit}
// setOffset={setOffset}
// currentPage={currentPage}
// setCurrentPage={setCurrentPage}
// />

export default Pagination;
