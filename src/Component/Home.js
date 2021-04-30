import React, { useState, } from 'react'
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Grid,
} from '@material-ui/core'
import { Graph } from 'react-d3-graph'
import findShortestPath from '../utils/shortestPath'

const Home = () => {
  const restaurants = ["R1", "R2"]
  const [houses, setHouses] = useState(["H1", "H2", "H3", "H4"])
  const [deliveryExecutives, updateDeliveryExecutivesData] = useState([
    {
      name: "D1",
      startPosition: "H1",
      pickupLocation: undefined,
      dropLocation: undefined,
    },
    {
      name: "D2",
      startPosition: "H3",
      pickupLocation: undefined,
      dropLocation: undefined,
    }
  ])
  const [finalValues, setFinalValues] = useState({
    "node1": "",
    "node2": "",
    "distance": undefined
  })

  const dataList = [
    {
      node1: "R1",
      node2: "H1",
      distance: 2,
    },
    {
      node1: "R1",
      node2: "H2",
      distance: 3,
    },
    {
      node1: "R1",
      node2: "H3",
      distance: 4,
    },
    {
      node1: "R2",
      node2: "H2",
      distance: 5,
    },
    {
      node1: "R2",
      node2: "H3",
      distance: 6,
    },
    {
      node1: "R2",
      node2: "H1",
      distance: 7,
    },
    {
      node1: "R2",
      node2: "H4",
      distance: 8,
    },
  ]

  const generateGraphData = () => {
    let graph = {};

    for (let item of dataList) {
      graph[item.node1] = Object.keys(graph).includes(item.node1)
        ? { ...graph[item.node1], [item.node2]: item.distance }
        : { [item.node2]: item.distance }
      graph[item.node2] = Object.keys(graph).includes(item.node2)
        ? { ...graph[item.node2], [item.node1]: item.distance }
        : { [item.node1]: item.distance }
    }
    return graph;
  }

  const updatePickupLocationOfDeliveryLocation = deliveryExecutiveIndex => event => {
    let list = [...deliveryExecutives]
    list[deliveryExecutiveIndex].pickupLocation = event.target.value
    updateDeliveryExecutivesData(list)
  }

  const updateDropLocationOfDeliveryLocation = deliveryExecutiveIndex => event => {
    let list = [...deliveryExecutives]
    list[deliveryExecutiveIndex].dropLocation = event.target.value
    updateDeliveryExecutivesData(list)
  }

  const finalForm = () => {
    return (
      <div>

        <TableContainer component={Paper} className="table">
          <Table aria-label="simple table">
            <TableHead>
              {deliveryExecutives.map((deliveryExecutive, deliveryExecutiveIndex) => (
                <TableRow key={deliveryExecutiveIndex}>
                  <TableCell>{deliveryExecutive.name} is at {deliveryExecutive.startPosition}</TableCell>

                  <TableCell>
                    <InputLabel>Select Pickup location</InputLabel>
                    <Select onChange={updatePickupLocationOfDeliveryLocation(deliveryExecutiveIndex)}>
                      {restaurants.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <InputLabel>Select Delivery Location</InputLabel>
                    <Select onChange={updateDropLocationOfDeliveryLocation(deliveryExecutiveIndex)}>
                      {houses.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableHead>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" onClick={submitOrders}>Submit</Button>
      </div>
    )
  }

  const submitOrders = () => {
    console.log('deliveryExecutivesData: ', deliveryExecutives)
    console.log('graphData: ', generateGraphData())
    const graph = generateGraphData();

    for (let deliveryExecutive of deliveryExecutives) {
      const pickupShortestPath = findShortestPath(graph, deliveryExecutive.startPosition, deliveryExecutive.pickupLocation)
      const deliveryShortestPath = findShortestPath(graph, deliveryExecutive.pickupLocation, deliveryExecutive.dropLocation)
      console.log("pickupShortestPath: ", pickupShortestPath)
      console.log("deliveryShortestPath: ", deliveryShortestPath)
    }
  }

  const getDataTable = () => {
    return (
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Node1</TableCell>
              <TableCell align="center">Node2</TableCell>
              <TableCell align="center">Distance</TableCell>
              {/* <TableCell align="center">Add</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>

            {dataList.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" align="center" scope="row">
                  {item.node1}
                </TableCell>
                <TableCell align="center">{item.node2}</TableCell>
                <TableCell align="center">{item.distance}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const handleTransactionDataSubmit = () => {
    const data = {
      nodes: generateNodes(),
    }
    const config = {
      freezeAllDragEvents: true,
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        highlightStrokeColor: "blue",
        fontSize: 12,
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: true,
        labelProperty: "amount",
        fontSize: 12,
      },
      directed: true,
      height: 600,
      width: 600,
    };
  }

  const generateNodes = () => restaurants.map(item => ({ id: item }))

  return (
    <div>
      <>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div>
              <div>
                <h4>Transactions</h4>
                <div style={{ textAlign: "left" }}>
                  <p>Enter transactions in the table below :-</p>
                  <ol>
                    <li>Enter the names of the Payer in first column</li>
                    <li>Enter the names of the Payee in second column</li>
                    <li>Enter the amount paid in the third column</li>
                    <li>Click on Build Graph to build a graph from the given transactions</li>
                    <li>Click on Simplify payments button when you are done with entering the payments.</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="form">
              {getDataTable()}
            </div>
          </Grid>
        </Grid>
      </>
      {finalForm()}

    </div >
  )
}

export default Home