'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var OptionGroup = _react2['default'].createClass({
	displayName: 'OptionGroup',

	propTypes: {
		children: _react2['default'].PropTypes.any,
		className: _react2['default'].PropTypes.string, // className (based on mouse position)
		isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
		isFocused: _react2['default'].PropTypes.bool, // method to handle mouseEnter on option group label element
		isFocused: _react2['default'].PropTypes.bool, // the option group is focused
		isSelected: _react2['default'].PropTypes.bool, // the option group is selected
		label: _react2['default'].PropTypes.node, // the heading to show above the child options
		onFocus: _react2['default'].PropTypes.func, // provide the onFocus function to highlight if selectGroup
		onSelect: _react2['default'].PropTypes.func, // provide the onSelect function to select group if selectGroup
		option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option group
		selectGroup: _react2['default'].PropTypes.bool },

	// option to allow Groups to be selected
	blockEvent: function blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},

	handleMouseDown: function handleMouseDown(event) {
		var selectGroup = this.props.selectGroup;

		event.preventDefault();
		event.stopPropagation();
		if (selectGroup) this.props.onSelect(this.props.option, event);
	},

	handleMouseEnter: function handleMouseEnter(event) {
		var selectGroup = this.props.selectGroup;

		if (selectGroup) this.onFocus(event);
	},

	handleMouseMove: function handleMouseMove(event) {
		var selectGroup = this.props.selectGroup;

		if (selectGroup) this.onFocus(event);
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	onFocus: function onFocus(event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	},

	render: function render() {
		var _props = this.props;
		var option = _props.option;
		var selectGroup = _props.selectGroup;
		var isFocused = _props.isFocused;
		var isDisabled = _props.isDisabled;

		var className = (0, _classnames2['default'])(this.props.className, option.className);

		var groupLabelClassName = (0, _classnames2['default'])({
			'Select-option-group-label': true,
			'Select-option-group-label-selectable': selectGroup,
			'is-focused': isFocused,
			'is-disabled': isDisabled
		});

		return option.disabled ? _react2['default'].createElement(
			'div',
			{ className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			this.props.children
		) : _react2['default'].createElement(
			'div',
			{ className: className,
				style: option.style,
				onMouseDown: this.handleMouseDown,

				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				title: option.title },
			_react2['default'].createElement(
				'div',
				{
					className: groupLabelClassName,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove
				},
				this.props.label
			),
			this.props.children
		);
	}
});

module.exports = OptionGroup;