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
		this.setState({focused});
	};

	onChangeText = (index, val) =>{
		let newVal = val.split('');
		let values = this.state.values.slice();
		let i = index;
		newVal.map(val => {
			if (i < this.props.length){
				values[i++] = val;
			}	
		})
		let code = values.join('');
		let focused = code.length === this.props.length? code.length - 1: code.length;
		this.setState({focused, code, values});
		this.props.onValueChange(code);
		if (code.length===this.props.length){
			this.props.onFinish(code);
		}
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

	keyPress = (e) => {
		this.props.onKeyPress(e.nativeEvent);
		if (e.nativeEvent.key === 'Backspace'){
			e.preventDefault();
			let values = [...this.state.values];
			values[this.state.code.length - 1] = '';
			const code = values.join('');
			const focused = (this.state.focused !== 0)? this.state.focused - 1: 0;
			this.setState({focused, values, code});
		}
	};

	renderInputs = () => {
		const {returnKeyType, keyboardType, inputContainerStyle, inputStyle, length} = this.props;
		const { input_style, text_style } = styles;
		return this.state.values.map((value, index) => (
			<View key={index} style={{...input_style, ...inputContainerStyle}}>
				<TextInput
					style={{...text_style, ...inputStyle}}
					onFocus={() => this.setCursor()}
					onKeyPress={this.keyPress}
					onChangeText={(value) => this.onChangeText(index, value)}
					maxLength={length - index}
					textAlign={'center'}
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
	onFinish: () => {},
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