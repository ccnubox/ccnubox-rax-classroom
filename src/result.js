import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './result.css';
import TabHeader from 'rax-tabheader';
import Image from 'rax-image';
import Touchable from 'rax-touchable';
import ScrollView from 'rax-scrollview';
import MultiRow from 'rax-multirow';
import InfoService from './services/index.js';

function getQueryString(name) {  
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = window.location.search.substr(1).match(reg);  
  if (r != null) return unescape(r[2]);  
  return null;  
}

const classroomInset = {
  uri: 'http://ocm66x3nz.bkt.clouddn.com/classroomInset.png'
};
const classroomError = {
  uri: 'http://ocm66x3nz.bkt.clouddn.com/audit_error.png'

};

const Options = {
  weekno: '1',
  weekday: 'mon',
  building: 7
}

let ClassRoom = [
  {
    title: "8:00",
    numbers: []
  },
  {
    title: "10:00",
    numbers: []
  },
  {
    title: "12:00",
    numbers: []
  },
  {
    title: "14:00",
    numbers: []
  },
  {
    title: "16:00",
    numbers: []
  },
  {
    title: "18:00",
    numbers: []
  },
  {
    title: "20:00",
    numbers: []
  }
]

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClassRoom: [],
      ClassRoomShow: [],
      error: false
    };
  }

  fetchClassRoom = () => {
    // 获取查询参数
    Options.building = getQueryString("building")
    Options.weekday = getQueryString("weekday")
    Options.weekno = getQueryString("weekno")
    // 发送查询请求
    InfoService.getClassRoom(Options).
    then(data => {
      ClassRoom.forEach((el, index, array) => {
        let n = index * 2 + 1
        array[index].numbers = data[n]
      })
      this.setState({
        ClassRoom,
        ClassRoomShow: ClassRoom[0].numbers,
        error: false
      })
    })
    .catch(data => {
      alert(data)
      this.setState({
        error: true
      })
    });
  }

  componentWillMount() {
    this.fetchClassRoom()
  }

  renderItem = (item, index) => {
    return <View style={styles.tabHeaderItem}>
            <View style={styles.tabHeaderLine}>
              <View style={styles.timeLine}></View>
              <View style={styles.tabHeaderDot}></View>
              <View style={styles.timeLine}></View>
            </View> 
            <Text style={styles.tabHeaderText}>{item.title}</Text>
          </View>;
  }
  renderSelect = (item, index) => {
    return <View style={styles.tabHeaderItem}>
            <View style={styles.tabHeaderLine}>
              <View style={styles.timeLine}></View>
              <View style={styles.tabHeaderDot_select}></View>
              <View style={styles.timeLine}></View>
            </View> 
            <Text style={styles.tabHeaderText_select}>{item.title}</Text>
          </View>;
  }
  onSelect = (index) => {
    this.setState({
      ClassRoomShow: this.state.ClassRoom[index].numbers
    })
  }
  itemWidth = (item, index) => {
    return parseInt(750 / this.state.ClassRoom.length) + 'rem';
  }
  

  render() {
    if (this.state.error) {
      return (
        <View style={styles.error_app}>
          <View style={styles.error_container}>
            <Image style={styles.error_image} source={classroomError} />
            <View style={styles.error_text}>
              <Text style={styles.error_text_info}>出错啦，</Text>
              <Touchable onPress={() => {this.fetchClassRoom()}}>
                <Text style={styles.error_text_click}>点击刷新</Text>
              </Touchable>
            </View>
            
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.app}>
          <View style={styles.tabHeaderSpace}>
          </View>
          <TabHeader 
            style={styles.tabHeader} 
            dataSource={this.state.ClassRoom} 
            renderItem={this.renderItem} 
            renderSelect={this.renderSelect} 
            onSelect={this.onSelect}
            selected={0}
            itemWidth={this.itemWidth}
          />
          <View style={styles.insetImg}>
            <Image
                style={styles.classroomInset}
                source={classroomInset}
              />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} style={styles.item}>
            <View style={styles.numbers_container}>
              <MultiRow
                  dataSource={this.state.ClassRoomShow}
                  cells={5}
                  renderCell={(item, index) => {
                    return (
                      <View style={styles.numbers_item}>
                        <Text style={styles.numbers_text}>{item}</Text>
                      </View>
                    );
                  }
                } />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}


export default Result;
