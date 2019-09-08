import React , { Component } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

class CodeInput extends Component{
	constructor(props){
		super(props);

		this.state = {
			focused: null,
			code: '',
			values: [...Array(props.length)].map(() => '')
		};
		this.input = null;
	}

	setCursor = () => {
		this.props.onClick();
		let focused = this.state.code.length;
		this.setState({...this.state, focused});
	};

	onChangeText = (index, val) =>{
		let values = this.state.values.slice();
		values[index] = val;
		let code = values.join('');
		let focused = code.length;
		this.setState({focused, code, values});
		this.props.onValueChange(code);
	};

	componentDidUpdate(){
		const { enabled } = this.props;
		if (this.input!=null && enabled){
			this.input.focus();
		}
	}

	componentDidMount(){
		if (this.input!=null){
			this.input.focus();
		}
	}

	keyPress = ({nativeEvent}) => {
		this.props.onKeyPress(nativeEvent);
		if (nativeEvent.key === 'Backspace'){
			let focused = (this.state.focused !== 0)? this.state.focused - 1: 0;
			let values = [...this.state.values];
			if (values[this.state.focused] === "") {
				values[this.state.focused - 1] = '';
			}
			let code = values.join('');
			this.setState({focused, values, code});
			this.props.onValueChange(code);
		}
	};

	renderInputs = () => {
		const {returnKeyType, keyboardType, inputContainerStyle, inputStyle} = this.props;
		const { input_style, text_style } = styles;
		return this.state.values.map((value, index) => (
			<View key={index} style={{...input_style, ...inputContainerStyle}}>
				<TextInput
					style={{...text_style, ...inputStyle}}
					onFocus={() => this.setCursor()}
					onKeyPress={this.keyPress}
					onChangeText={(value) => this.onChangeText(index, value)}
					maxLength={1}
					value={this.state.values[index]}
					ref={input => index===this.state.focused?this.input=input:0}
					keyboardType={keyboardType}
					returnKeyType={returnKeyType}
				/>
			</View>
		));
	};

	render() {
		const {containerStyle} = this.props;
		const { container } = styles;
		return (
			<View style={{...container, ...containerStyle}}>
				{ this.renderInputs() }
			</View>
		);
	}
}

CodeInput.defaultProps = {
	onValueChange: (value) => value,
	onClick: () => {},
	onKeyPress: () => {},
	enabled: true,
	length: 6,
	keyboardType: 'numeric',
	returnKeyType: 'done',
	inputContainerStyle: {},
	containerStyle: {},
	inputStyle: {}
};

export default CodeInput;

const styles = StyleSheet.create({
	container:{
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	input_style:{
		borderBottomWidth: 2,
		borderBottomColor: "blue",
		marginHorizontal: 5,
		width: 20
	},
	text_style:{
		fontSize: 16,
		color: "black",
		paddingBottom: 5
	}
});