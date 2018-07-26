import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './result.css';
import ListView from 'rax-listview';
import MultiRow from 'rax-multirow';
import InfoService from './services/index.js';

function getQueryString(name) {  
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = window.location.search.substr(1).match(reg);  
  if (r != null) return unescape(r[2]);  
  return null;  
}

const Options = {
  weekno: '1',
  weekday: 'mon',
  building: 7
}

let ClassRoom = [
  {
    title: "上午8:00空闲教室",
    numbers: []
  },
  {
    title: "上午10:00空闲教室",
    numbers: []
  },
  {
    title: "上午12:00空闲教室",
    numbers: []
  },
  {
    title: "下午2:00空闲教室",
    numbers: []
  },
  {
    title: "上午4:00空闲教室",
    numbers: []
  },
  {
    title: "上午6:00空闲教室",
    numbers: []
  },
  {
    title: "上午8:00空闲教室",
    numbers: []
  }
]

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClassRoom: []
    };
  }

  componentWillMount() {
    // 获取查询参数
    Options.building = getQueryString("building")
    Options.weekday = getQueryString("weekday")
    Options.weekno = getQueryString("weekno")
    // 发送查询请求
    InfoService.getClassRoom(Options).then(data => {
      ClassRoom.forEach((el, index, array) => {
        let n = index * 2 + 1
        array[index].numbers = data[n]
      })
      this.setState({
        ClassRoom
      })
    });
  }

  listItem = (item, index) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.numbers_container}>
          <MultiRow
              dataSource={item.numbers}
              cells={4}
              renderCell={(item, index) => {
                return (
                  <View style={styles.numbers_item}>
                    <Text style={styles.numbers_text}>{item}</Text>
                  </View>
                );
              }
            } />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.container}>
          <ListView
          renderRow={this.listItem}
          dataSource={this.state.ClassRoom}
          />
        </View>
      </View>
      
    );
  }
}


export default Result;
