import React from 'react';
import Select from 'react-select-plus';

var ops = [{
	label: 'Black',
	value: 'black',
}, {
	label: 'Primary Colors',
	options: [{
		label: 'Yellow',
		value: 'yellow'
	}, {
		label: 'Red',
		value: 'red'
	}, {
		label: 'Blue',
		value: 'blue'
	}]
}, {
	label: 'Secondary Colors',
	options: [{
		label: 'Orange',
		value: 'orange'
	}, {
		label: 'Purple',
		options: [{
			label: 'Light Purple',
			value: 'light_purple'
		}, {
			label: 'Medium Purple',
			value: 'medium_purple'
		}, {
			label: 'Dark Purple',
			value: 'dark_purple'
		},
		{
			label: 'Fake Purples',
			value: 'fake_purples',
			options: [{
				label: 'Unicorn Purple',
				value: 'unicorn_purple',
			}, {
				label: 'Purple People Eater',
				value: 'purple_ppl_eater',
			}]
		}]
	}, {
		label: 'Green',
		value: 'green'
	}]
}, {
	label: 'White',
	value: 'white',
}];

var GroupedOptionsFieldWithGroupSelect = React.createClass({
	displayName: 'GroupedOptionsFieldWithGroupSelect',
	propTypes: {
		delimiter: React.PropTypes.string,
		label: React.PropTypes.string,
		multi: React.PropTypes.bool,
	},

	getInitialState () {
		return {
			value: null,
		};
	},

	onChange(value) {
		this.setState({ value });
		console.log('Option Groups Select value changed to', value);
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					multi
					onChange={this.onChange}
					options={ops}
					placeholder="Select some colors"
					selectGroup
					value={this.state.value}
				/>
			</div>
		);
	}
});

module.exports = GroupedOptionsFieldWithGroupSelect;
