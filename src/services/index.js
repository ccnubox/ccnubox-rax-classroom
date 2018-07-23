import request from '../../box-ui/util/request';

const InfoService = {
  getClassRoom(options) {
    return request({
      method: 'GET',
      url: 'https://ccnubox.muxixyz.com/api/classroom/get_classroom/?weekno=' + options.weekno 
      +'&weekday=' + options.weekday
      + '&building=' + options.building,
    });
  },
};

export default InfoService;
