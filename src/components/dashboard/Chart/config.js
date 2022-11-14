export const colorOptions = ["#59A7FF", "#FF4DCA", "#F68D7D", "#7ACEED", "#59A7FF"];
export const options = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  maintainAspectRatio: false,
  elements: {
    point: {
      borderWidth: 0,
      radius: 3
    },
    line:{
      tension: 0.4,
      borderWidth: 2,
      borderJoinStyle: 'round',
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'center',
      textAlign: 'left',
      maxHeight: 200,
      fullSize: true,
      labels: {
        color: '#555555',
        textAlign: 'center',
        display: true,
        align: 'start'
      }
    },
    title: {
      align: 'left'
    }
  },
};

export const legendMargin = {
  id: "legendMargin",
  beforeInit(chart, legend, options) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit(){
      fitValue.bind(chart.legend)();
      return this.height += 20;
    }
  }
}
export const afterDrawCustom = {
  id: "afterDraw",
  afterDraw: function(chart) {
    const checkDatasets = chart.data?.datasets;
    if(checkDatasets && checkDatasets?.every(x => x?.data?.length === 0)){
      var { ctx } = chart;
      const defaultFontString = '14px "Helvetica Neue", Helvetica, Arial, sans-serif';
      var width = chart.width;
      var height = chart.height;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = defaultFontString
      ctx.save();
      ctx.restore();
      ctx.fillText('Try connecting your Facebook Conversation API', width / 2, height / 2);
      ctx.save();
      ctx.restore();
      return chart;
    }
  }
}


export const defaultDatasets = [
  {
    label: "PageView",
    data: [],
    fill: false,
    borderJoinStyle: 'bevel',
    backgroundColor: colorOptions[0],
    borderColor: colorOptions[0],
  },
  {
    label: "Initiate Checkout",
    data: [],
    fill: false,
    borderJoinStyle: 'bevel',
    backgroundColor: colorOptions[1],
    borderColor: colorOptions[1],
  },
  {
    label: "Purchase",
    data: [],
    fill: false,
    borderJoinStyle: 'bevel',
    backgroundColor: colorOptions[2],
    borderColor: colorOptions[2],
  },
  {
    label: "ViewContent",
    data: [],
    fill: false,
    borderJoinStyle: 'bevel',
    backgroundColor: colorOptions[3],
    borderColor: colorOptions[3],
  },
  {
    label: "AddToCart",
    data: [],
    fill: false,
    borderJoinStyle: 'bevel',
    backgroundColor: colorOptions[4],
    borderColor: colorOptions[4],
  }
]