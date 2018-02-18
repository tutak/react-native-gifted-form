import createReactClass from 'create-react-class';

var React = require('react');
var {
    View,
    DatePickerIOS,
    PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = createReactClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            type: 'DatePickerIOSWidget',
            getDefaultDate: () => { return new Date(); }
        };
    },

    getInitialState() {
        return {
            value: new Date(),
        };
    },

    componentDidMount() {
        this._onChange(this.props.getDefaultDate());
    },

    render() {
        return (
            <View style={this.getStyle('row')}>
                <DatePickerIOS
                    style={this.getStyle('picker')}

                    {...this.props}

                    onDateChange={this._onChange}
                    date={this.state.value}
                />
            </View>
        );
    },

    defaultStyles: {
        row: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1 / PixelRatio.get(),
            borderColor: '#c8c7cc',
        },

        getInitialState() {
            return {
                value: new Date(),
            };
        },

        componentDidMount() {
            this._onChange(this.props.getDefaultDate());
        },

        selectValue (date) {
            this._onChange(date);
            this.props.trackChildProperty('date', date)
        },

        render() {
            return (
                <View style={this.getStyle('row')}>
                    <DatePickerIOS
                        style={this.getStyle('picker')}

                        {...this.props}

                        onDateChange={(e)=>{this.selectValue(e)}}
                        date={this.state.value}
                    />
                </View>
            );
        },

        defaultStyles: {
            row: {
                backgroundColor: '#FFF',
                borderBottomWidth: 1 / PixelRatio.get(),
                borderColor: '#c8c7cc',
            },
            picker: {
            },
        },

    }});
