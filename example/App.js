/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import {CodeInput} from '@amiralis1365/react-native-code-input';

const App = () => {
    return (
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red'}}>
          <CodeInput/>
        </View>
    );
};

export default App;
