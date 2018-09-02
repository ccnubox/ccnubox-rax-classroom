import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./result.css";
import TabHeader from "rax-tabheader";
import Image from "rax-image";
import Touchable from "rax-touchable";
import ScrollView from "rax-scrollview";
import MultiRow from "rax-multirow";
const native = require("@weex-module/test");
import InfoService from "./services/index.js";
import { parseSearchString } from "../box-ui/util";
import classroomInset from "./assets/classroomInset.png";
import classroomError from "./assets/audit_error.png";

const Options = {
  weekno: "1",
  weekday: "mon",
  building: 7
};

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
];

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
    let qd = {};
    // 获取查询参数
    if (window.location.search) {
      qd = parseSearchString(window.location.search);
    } else {
      alert("参数缺失错误");
    }
    Options.building = qd.building[0];
    Options.weekday = qd.weekday[0];
    Options.weekno = qd.weekno[0];
    // 发送查询请求
    InfoService.getClassRoom(Options)
      .then(data => {
        ClassRoom.forEach((el, index, array) => {
          let n = index * 2 + 1;
          array[index].numbers = data[n];
        });
        this.setState({
          ClassRoom,
          ClassRoomShow: ClassRoom[0].numbers,
        });
        native.changeLoadingStatus(true);
      })
      .catch(data => {
        // 无空闲教室
        this.setState({
          error: true
        });
      });
  };

  componentWillMount() {
    this.fetchClassRoom();
  }

  renderItem = (item, index) => {
    return (
      <View style={styles.tabHeaderItem}>
        <View style={styles.tabHeaderLine}>
          <View style={styles.timeLine} />
          <View style={styles.tabHeaderDot} />
          <View style={styles.timeLine} />
        </View>
        <Text style={styles.tabHeaderText}>{item.title}</Text>
      </View>
    );
  };
  renderSelect = (item, index) => {
    return (
      <View style={styles.tabHeaderItem}>
        <View style={styles.tabHeaderLine}>
          <View style={styles.timeLine} />
          <View style={styles.tabHeaderDot_select} />
          <View style={styles.timeLine} />
        </View>
        <View style={styles.tabHeaderText_container}>
          <Text style={styles.tabHeaderText_select}>{item.title}</Text>
        </View>
      </View>
    );
  };
  onSelect = index => {
    this.setState({
      ClassRoomShow: this.state.ClassRoom[index].numbers
    });
  };
  itemWidth = (item, index) => {
    return parseInt(750 / this.state.ClassRoom.length) + "rem";
  };

  render() {
    if (this.state.error) {
      return (
        <View style={styles.error_app}>
          <View style={styles.error_container}>
            <Image style={styles.error_image} source={classroomError} />
            <View style={styles.error_text}>
              <Text style={styles.error_text_info}>该时段无空闲教室哦</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.app}>
          <View style={styles.tabHeaderSpace} />
          <TabHeader
            style={styles.tabHeader}
            dataSource={this.state.ClassRoom}
            renderItem={this.renderItem}
            renderSelect={this.renderSelect}
            onSelect={this.onSelect}
            selected={0}
            itemWidth={this.itemWidth}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={[
              styles.item,
              {
                height: screen.height - 150
              }
            ]}
          >
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
                }}
              />
            </View>
          </ScrollView>
          <View style={styles.insetImg}>
            <Image style={styles.classroomInset} source={classroomInset} />
          </View>
        </View>
      );
    }
  }
}

export default Result;
