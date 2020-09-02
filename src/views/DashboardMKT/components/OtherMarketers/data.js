import { v1 } from 'uuid';

export default [
	{
		id: v1(),
		ref: 'CDD1049',
		amount: 30.5,
		customer: {
			name: 'Ekaterina Tankova'
		},
		createdAt: 15,
		status: 2920
	},
	{
		id: v1(),
		ref: 'CDD1048',
		amount: 25.1,
		customer: {
			name: 'Cao Yu'
		},
		createdAt: 15,
		status: 33
	},
	{
		id: v1(),
		ref: 'CDD1047',
		amount: 10.99,
		customer: {
			name: 'Alexa Richardson'
		},
		createdAt: 15,
		status: 'refunded'
	},
	{
		id: v1(),
		ref: 'CDD1046',
		amount: 96.43,
		customer: {
			name: 'Anje Keizer'
		},
		createdAt: 15,
		status: 2920
	},
	{
		id: v1(),
		ref: 'CDD1045',
		amount: 32.54,
		customer: {
			name: 'Clarke Gillebert'
		},
		createdAt: 15,
		status: 33
	},
	{
		id: v1(),
		ref: 'CDD1044',
		amount: 16.76,
		customer: {
			name: 'Adam Denisov'
		},
		createdAt: 15,
		status: 33
	}
];
