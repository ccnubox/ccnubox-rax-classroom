import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import styles from './App.css';
import Picker from 'rax-picker';
import Touchable from 'rax-touchable';
import InfoService from './services/index.js';
import Options from './optionData.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekno: Options.weekno,
      weekday: Options.weekday,
      building: Options.building
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.container}>

          <View style={styles.select_item}>
            <Text style={styles.select_title}>
              周数：
            </Text>
            <View style={styles.select_bar}>
              <View style={styles.select_bar_content}>
                <Picker
                  selectedValue={this.state.weekno}
                  onValueChange={(item) => {
                    this.setState({
                      weekno: item
                    })
                    Options.weekno = item
                  }
                  }
                  style={styles.select_bar_text}>
                  <Picker.Item value={'1'} label={'第1周'} />
                  <Picker.Item value={'2'} label={'第2周'} />
                  <Picker.Item value={'3'} label={'第3周'} />
                  <Picker.Item value={'4'} label={'第4周'} />
                  <Picker.Item value={'5'} label={'第5周'} />
                  <Picker.Item value={'6'} label={'第6周'} />
                  <Picker.Item value={'7'} label={'第7周'} />
                  <Picker.Item value={'8'} label={'第8周'} />
                  <Picker.Item value={'9'} label={'第9周'} />
                  <Picker.Item value={'10'} label={'第10周'} />
                  <Picker.Item value={'11'} label={'第11周'} />
                  <Picker.Item value={'12'} label={'第12周'} />
                  <Picker.Item value={'13'} label={'第13周'} />
                  <Picker.Item value={'14'} label={'第14周'} />
                  <Picker.Item value={'15'} label={'第15周'} />
                  <Picker.Item value={'16'} label={'第16周'} />
                  <Picker.Item value={'17'} label={'第17周'} />
                  <Picker.Item value={'18'} label={'第18周'} />
                  <Picker.Item value={'19'} label={'第19周'} />
                  <Picker.Item value={'20'} label={'第20周'} />
                </Picker>
                <View style={styles.arrow}>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.select_item}>
            <Text style={styles.select_title}>
              星期：
            </Text>
            <View style={styles.select_bar}>
              <View style={styles.select_bar_content}>
              <Picker
                  selectedValue={this.state.weekday}
                  onValueChange={(item) => {
                    this.setState({
                      weekday: item
                    })
                    Options.weekday = item
                  }
                  }
                  style={styles.select_bar_text}>
                  <Picker.Item value={'mon'} label={'周一'} />
                  <Picker.Item value={'tue'} label={'周二'} />
                  <Picker.Item value={'wed'} label={'周三'} />
                  <Picker.Item value={'thu'} label={'周四'} />
                  <Picker.Item value={'fri'} label={'周五'} />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.select_item}>
            <Text style={styles.select_title}>
              自习地点：
            </Text>
            <View style={styles.select_bar}>
              <View style={styles.select_bar_content}>
                <Picker
                  selectedValue={this.state.building}
                  onValueChange={(item) => {
                    this.setState({
                      building: item
                    })
                  }
                  }
                  style={styles.select_bar_text}>
                  <Picker.Item value={7} label={'七号楼'} />
                  <Picker.Item value={8} label={'八号楼'} />
                </Picker>
                <View style={styles.arrow}>
                </View>
              </View>
            </View>
          </View>
          <Touchable onPress={() => {
            Options.building = this.state.building
            Options.weekday = this.state.weekday
            Options.weekno = this.state.weekno
            InfoService.getClassRoom(Options).then(data => {
              alert(data)
            });
          }}>
            <View style={styles.search_bt}>

              <Text style={styles.search_bt_text}>
                查询
              </Text>
            </View>
          </Touchable>

        </View>
      </View>
    );
  }
}


export default App;
