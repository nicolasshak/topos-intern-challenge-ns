import React from 'react';
import './css/CompareTable.css'

function titleCase(str) {

	var words = str.split(' ');

	var i;
	for(i = 0; i < words.length; i++) {
		var word = words[i];

		words[i] = word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase();
	}

	return(words.join(' '));
}

const CompareTable = (props) => {

	var zipcode = '';

	if(props.selected !== undefined) {
		zipcode = ' ' + props.selected + '?';
	}

	var rows = [];
	var total = 0;

	if(props.data !== undefined) {

		var i;
		for(i = 0; i < props.data.length; i++) {

			total += parseInt(props.data[i]['count_spc_common']);

			rows.push(
				<div className="row">
					<div className="entry">{titleCase(props.data[i]['spc_common'])}:</div>
					<div className="entry">{props.data[i]['count_spc_common']}</div>
				</div>
			);
		}
	}

	if(rows.length !== 0) {
		rows.unshift(
			<div className="row">
				<div className="entry">Total Street Trees:</div>
				<div className="entry">{total}</div>
			</div>
		);
	}

	if(rows.length === 0 && props.data !== undefined) {
		rows = <div>There doesn't seem to be any data on this zipcode.</div>
	}

	return(
		<div className="compare-wrapper">
			<div className="compare">
				<header>
					How green is: {zipcode}
				</header>
				<div className="table-wrapper">
					<div className="table">
						{rows}
					</div>
				</div>
	      <footer>
	      	<div className="footer-left">Nicolas Shak</div>
	      	<div>Data Based on 1995 Tree Census</div>
	      </footer>
	     </div>
    </div>
	);
}

export default CompareTable;