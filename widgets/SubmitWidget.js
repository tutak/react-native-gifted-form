import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';


var {View, Text, TouchableOpacity} = require('react-native')
var WidgetMixin = require('../mixins/WidgetMixin.js');


import Button from 'apsl-react-native-button';

var GiftedFormManager = require('../GiftedFormManager');


// @todo to test with validations
module.exports = createReactClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            type: 'SubmitWidget',
            onSubmit: () => {},
            preSubmit: () => {},
            isDisabled: false,
            activityIndicatorColor: 'black',
            requiredMessage: '{TITLE} is required',
            notValidMessage: '{TITLE} is not valid',
        };
    },

    propTypes: {
        onSubmit: PropTypes.func,
        preSubmit: PropTypes.func,
        isDisabled: PropTypes.bool,
        activityIndicatorColor: PropTypes.string,
        requiredMessage: PropTypes.string,
        notValidMessage: PropTypes.string,
    },

    getInitialState() {
        return {
            isLoading: false,
        };
    },

    clearValidationErrors() {
        this.props.form.setState({errors: []});
    },

    _postSubmit(errors = []) {
        errors = !Array.isArray(errors) ? [errors] : errors;

        this.setState({
            isLoading: false,
        });
        this.props.form.setState({errors});
    },

    _doSubmit() {
        this.props.preSubmit();

        this.clearValidationErrors()
        var validationResults = GiftedFormManager.validate(this.props.formName);
        var values = GiftedFormManager.getValues(this.props.formName);

        if (validationResults.isValid === true) {
            this.setState({
                isLoading: true,
            });
            this.props.onSubmit(true, values, validationResults, this._postSubmit, this.props.navigator);
        } else {
            var errors = GiftedFormManager.getValidationErrors(
                validationResults,
                this.props.notValidMessage,
                this.props.requiredMesage
            );
            this.props.form.setState({errors: errors});
            this.props.onSubmit(false, values, validationResults, this._postSubmit, this.props.navigator);
        }
    },

    render() {
        return (
            <TouchableOpacity
                ref='submitButton'
                style={this.props.isDisabled ? this.getStyle('disabledSubmitButton'):this.getStyle('submitButton')}
                textStyle={this.getStyle('textSubmitButton')}

                isLoading={this.state.isLoading}
                disabled={this.props.isDisabled}
                activityIndicatorColor={this.props.activityIndicatorColor}

                {...this.props}

                onPress={() => this._doSubmit()}
            >

                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    },

    defaultStyles: {
        submitButton: {
            backgroundColor: 'orange',
            flexBasis: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'

        },
        disabledSubmitButton: {
            opacity: 0.5,
            backgroundColor: '#3498db',
            flexBasis: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        textSubmitButton: {
            color: 'white',
            fontSize: 15,
        },
    },

});
