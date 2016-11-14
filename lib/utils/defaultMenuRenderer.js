'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function isGroup(option) {
	return option && Array.isArray(option.options);
}

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption;
	var selectGroup = _ref.selectGroup;
	var instancePrefix = _ref.instancePrefix;
	var labelKey = _ref.labelKey;
	var onFocus = _ref.onFocus;
	var onOptionRef = _ref.onOptionRef;
	var onSelect = _ref.onSelect;
	var optionClassName = _ref.optionClassName;
	var optionComponent = _ref.optionComponent;
	var optionGroupComponent = _ref.optionGroupComponent;
	var optionRenderer = _ref.optionRenderer;
	var options = _ref.options;
	var valueArray = _ref.valueArray;
	var valueKey = _ref.valueKey;

	var OptionGroup = optionGroupComponent;
	var Option = optionComponent;
	var renderLabel = optionRenderer || this.getOptionLabel;

	var renderOptions = function renderOptions(optionsSubset) {
		return optionsSubset.map(function (option, i) {
			if (isGroup(option)) {
				var isFocused = option === focusedOption;

				var optionGroupClass = (0, _classnames2['default'])({
					'Select-option-group': true,
					'is-focused': isFocused,
					'is-disabled': option.disabled
				});

				return _react2['default'].createElement(
					OptionGroup,
					{
						className: optionGroupClass,
						isDisabled: option.disabled,
						isFocused: isFocused,
						key: 'option-group-' + i,
						label: renderLabel(option),
						onFocus: onFocus,
						onSelect: onSelect,
						option: option,
						optionIndex: i,
						selectGroup: selectGroup
					},
					renderOptions(option.options)
				);
			} else {
				var _ret = (function () {
					var isSelected = valueArray && valueArray.indexOf(option) > -1;
					var isFocused = option === focusedOption;
					var optionRef = isFocused ? 'focused' : null;
					var optionClass = (0, _classnames2['default'])(optionClassName, {
						'Select-option': true,
						'is-selected': isSelected,
						'is-focused': isFocused,
						'is-disabled': option.disabled
					});

					return {
						v: _react2['default'].createElement(
							Option,
							{
								className: optionClass,
								instancePrefix: instancePrefix,
								isDisabled: option.disabled,
								isFocused: isFocused,
								isSelected: isSelected,
								key: 'option-' + i + '-' + option[valueKey],
								onFocus: onFocus,
								onSelect: onSelect,
								option: option,
								optionIndex: i,
								ref: function (ref) {
									onOptionRef(ref, isFocused);
								}
							},
							renderLabel(option, i)
						)
					};
				})();

				if (typeof _ret === 'object') return _ret.v;
			}
		});
	};

	return renderOptions(options);
}

module.exports = menuRenderer;