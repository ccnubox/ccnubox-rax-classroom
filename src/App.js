import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Image from "rax-image";
import styles from "./App.css";
import Picker from "./picker";
import Touchable from "rax-touchable";
const native = require("@weex-module/test");
import Option from "./optionMap";
import arrowIcon from "./assets/arrow.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekno: "1",
      weekday: "mon",
      building: 7
    };
  }

  componentWillMount() {}

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.container}>
          <View style={styles.select_item}>
            <Text style={styles.select_title}>周数：</Text>
            <View style={styles.select_bar}>
              <Picker
                renderLabel={(textStyle, selectedLabel) => {
                  return (
                    <View style={styles.select_bar_content}>
                      <View style={styles.select_bar_content_text}>
                        <Text style={textStyle}>{selectedLabel}</Text>
                      </View>
                      <Image style={styles.arrow_icon} source={arrowIcon} />
                    </View>
                  );
                }}
                selectedValue={this.state.weekno}
                onValueChange={item => {
                  this.setState({
                    weekno: item
                  });
                }}
                style={styles.select_bar_text}
              >
                {Option.weeknoMap.map(item => (
                  <Picker.Item value={item.value} label={item.label} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.select_item}>
            <Text style={styles.select_title}>星期：</Text>
            <View style={styles.select_bar}>
              <Picker
                renderLabel={(textStyle, selectedLabel) => {
                  return (
                    <View style={styles.select_bar_content}>
                      <View style={styles.select_bar_content_text}>
                        <Text style={textStyle}>{selectedLabel}</Text>
                      </View>
                      <Image style={styles.arrow_icon} source={arrowIcon} />
                    </View>
                  );
                }}
                selectedValue={this.state.weekday}
                onValueChange={item => {
                  this.setState({
                    weekday: item
                  });
                }}
                style={styles.select_bar_text}
              >
                {Option.weekdayMap.map(item => (
                  <Picker.Item value={item.value} label={item.label} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.select_item}>
            <Text style={styles.select_title}>自习地点：</Text>
            <View style={styles.select_bar}>
              <Picker
                renderLabel={(textStyle, selectedLabel) => {
                  return (
                    <View style={styles.select_bar_content}>
                      <View style={styles.select_bar_content_text}>
                        <Text style={textStyle}>{selectedLabel}</Text>
                      </View>
                      <Image style={styles.arrow_icon} source={arrowIcon} />
                    </View>
                  );
                }}
                selectedValue={this.state.building}
                onValueChange={item => {
                  this.setState({
                    building: item
                  });
                }}
                style={styles.select_bar_text}
              >
                {Option.buildingMap.map(item => (
                  <Picker.Item value={item.value} label={item.label} />
                ))}
              </Picker>
            </View>
          </View>
          <Touchable
            onPress={() => {
              native.push(
                `ccnubox://classroom.result?building=${
                  this.state.building
                }&weekno=${this.state.weekno}&weekday=${this.state.weekday}`
              );
            }}
          >
            <View style={styles.search_bt}>
              <Text style={styles.search_bt_text}>查询</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default App;
