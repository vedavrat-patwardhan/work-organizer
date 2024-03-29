import React from 'react';
import { TableModel } from '../Models/ComponentsModel';
import Pagination from 'rc-pagination';
import { useMediaQuery } from '@material-ui/core';

export const Table: React.FC<TableModel> = ({
	headers,
	data,
	totalData,
	itemsPerPage,
	currentPage,
	setPage,
	pagination,
}) => {
	const media = useMediaQuery('(max-width:1080px)');
	return (
		<>
			<table
				className="table table-responsive"
				style={{ display: media ? 'block' : 'table' }}
			>
				<thead className="table-box__header">
					<tr className="table-box__header-row">
						{headers.map((header) => (
							<th className="table-box__heading" key={header}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="table-box__body">
					{data.map((row, i: number) => (
						<tr className="table-box__body-row" key={i}>
							{row.map((cell: any, index: number) => (
								<td
									data-label={headers}
									className="table-box__cell"
									key={index}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{pagination && (
				<Pagination
					className="ant-pagination"
					current={currentPage}
					total={totalData}
					pageSize={itemsPerPage}
					onChange={(page: number) => {
						setPage!(page);
					}}
				/>
			)}
		</>
	);
};
