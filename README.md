# React-Native-Code-Input

React-Native-Code-Input is an easy to use React Native Component for Confirmation Code Input.

## Features
- Fully Capable of customizing styles
- Change keyboard Type 
- Change Keyboard return key type
- Change number of inputs based on your confirmation code length
- handling different events

## Installation

use `npm` to install the package

```bash
npm install --save React-Native-Code-Input
```

## Usage

```javascript
import CodeInput from 'react-native-code-input';

const App = () => {
    return (
          <CodeInput/>
    );
};
```

## Props

### Attributes
| Attribute | Description | Default Value |
| --- | --- | --- |
| enabled | enables or disables the component | `true` |
| length | Number of Inputs | `6` |
| keyboardType | Keyboard type to show. <br/>Possible values are: <br/>- `default`<br/>- `number-pad`<br/>- `decimal-pad`<br/>- `numeric`<br/>- `email-address`<br/>- `phone-pad`| `numeric` |
| returnKeyType | Determines how the return key should look.<br/>Possible values are: <br/>- `done`<br/>- `go`<br/>- `next`<br/>- `search`<br/>- `send`  | `done` |
| inputContainerStyle | Style of the each input `View` container | {} |
| containerStyle | Style of the `View` container | {} |
| inputStyle | Style of each `TextInput`  | {} |

### Events
| Attribute | Description |
| --- | --- |
| onValueChange | An event to get the value of inputs as a `string` |
| onClick | This event is called whenever one of the inputs is touched |
| onKeyPress | This event is called whenever a keyboard button is pressed |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
