import { View, Text, Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const data = [
  {
    name: "Mới",
    population: 139,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Đang sử dụng",
    population: 442,
    color: "black",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Đang báo hỏng",
    population: 61,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Đang sửa chữa",
    population: 5,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Ngừng sửa chữa",
    population: 2,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Đã thanh lý",
    population: 4,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const StatisticalEquipment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={styles.title}>Trạng thái thiết bị</Text>
        <LineChart
          data={{
            labels: ["Mới", "Đang sử dụng", "Đang báo hỏng", "Đang sửa chữa", "Ngừng sửa chữa", "Đã thanh lý"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <View style={styles.component}>
        <Text style={styles.title}>Trạng thái thiết bị</Text>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 20}
          height={250}
          chartConfig={
            {
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "1",
                strokeWidth: "1",
                stroke: "#ffa726"
              }
            }}
            bezier
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>
    </View>
  )
}

export default StatisticalEquipment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10
  },
  component: {
    paddingVertical: 15
  },
  title: {
    textAlign: 'center'
  }  
})
