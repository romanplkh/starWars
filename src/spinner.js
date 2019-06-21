import React from 'react';

import './spinner.css';

const Spinner = () => {
	return (
		<div className="lds-css ng-scope">
			<div style={{ width: '100%', height: '100%' }} className="lds-dual-ring">
				<div />
			</div>
		</div>
	);
};

export default Spinner;
