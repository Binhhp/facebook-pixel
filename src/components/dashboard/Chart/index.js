import React, { Suspense, useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FormatTime, GetDatesBetween } from "../../../config/timePicker";
import { afterDrawCustom, colorOptions, defaultDatasets, legendMargin, options } from "./config";
import { useContext } from "react";
import { FilterContext } from "../Contexts";
import { Spinner } from "@shopify/polaris";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart(){
  const [dataAnalysis, setDataAnalysis] = useState({
    labels: [],
    datasets: []
  });

  const filterContext = useContext(FilterContext);
  useEffect(() => {
    if(filterContext.data && Array.isArray(filterContext.data) && filterContext.data.length > 0){
      let updateDataset = [];
      filterContext.data.map((x, index) => {
        if(x?.Datasets && x?.Title && Array.isArray(x?.Datasets)) {
          const datasets = x?.Datasets.length > 0 ? x.Datasets : [];
          updateDataset.push({
            label: x?.Title,
            data: datasets,
            fill: false,
            borderJoinStyle: 'bevel',
            backgroundColor: colorOptions[index],
            borderColor: colorOptions[index],
          })
        }
      });
      let labels = GetDatesBetween(
        new Date(filterContext.filter.start), 
        new Date(filterContext.filter.end));
      setDataAnalysis({
        labels: labels,
        datasets: updateDataset
      });
    }
  }, [JSON.stringify(filterContext.data)]);

  const plugins = [legendMargin, afterDrawCustom];

  const RenderLoading = () => {
    return <div className="chart-loading"><Spinner accessibilityLabel="Loading Chart" size="large" /></div>;
  }
  const RenderChart = () => {
    if(filterContext?.filter?.pixelId === undefined || filterContext?.filter?.data === undefined) {
      if(filterContext.filter.pixelId === ""){
        return <Line plugins={plugins} data={{ labels: [FormatTime(new Date())], datasets: defaultDatasets}} options={options} />
      }
      return RenderLoading();
    }
    if(!filterContext?.data && filterContext.data.length === 0 && dataAnalysis?.datasets?.length === 0){
      return <Line plugins={plugins} data={{ labels: [FormatTime(new Date())], datasets: defaultDatasets}} options={options} />
    }
    else {
      return <Line plugins={plugins} data={dataAnalysis} options={options} />;
    }
  }
  return (
    <Suspense fallback={<Spinner accessibilityLabel="Loading Chart" size="large" />}>
      {RenderChart()}
    </Suspense>
  )
}
export default React.memo(Chart);