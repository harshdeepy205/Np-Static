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
  const restaurants = ["R1", "R2", "R3"]
  const houses = ["H1", "H2", "H3", "H4", "H5"]
  const [deliveryExecutives, updateDeliveryExecutives] = useState([
    {
      name: "D1",
      startPosition: "H1",
    },
    {
      name: "D2",
      startPosition: "H3",
    }
  ])

  const dataList = [
    {
      node1: "R1",
      node2: "H3",
      distance: 3,
    },
    {
      node1: "R1",
      node2: "H5",
      distance: 7,
    },
    {
      node1: "R2",
      node2: "H1",
      distance: 5,
    },
    {
      node1: "R2",
      node2: "H3",
      distance: 6,
    },
    {
      node1: "R2",
      node2: "H4",
      distance: 10,
    },
    {
      node1: "R3",
      node2: "H2",
      distance: 8,
    },
    {
      node1: "R3",
      node2: "H3",
      distance: 6,
    },
  ]

  const [orderGraphData, setOrderGraphData] = useState({})
  const [showGraph, toggleGraph] = useState(false)
  const graphConfig = {
    freezeAllDragEvents: true,
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      highlightStrokeColor: "blue",
      fontSize: 16,
    },
    link: {
      highlightColor: "lightblue",
      renderLabel: true,
      labelProperty: "distance",
      fontSize: 12,
    },
    directed: true,
    height: 300,
    width: 300,
  };

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

  const [orderData, setOrderData] = useState({})

  const updatePickupLocationOfDeliveryLocation = event => {
    setOrderData({ ...orderData, pickupLocation: event.target.value })
  }

  const updateDropLocationOfDeliveryLocation = event => {
    setOrderData({ ...orderData, dropLocation: event.target.value })
  }

  const finalForm = () => {
    return (
      <div>
        <div>
          <div>
            <h4>Orders</h4>
            <h5>Live Location</h5>
            <div>
              {deliveryExecutives.map(deliveryPerson => (
                <div key={deliveryPerson.name}>
                  Delivery Executive {deliveryPerson.name} is at Location {deliveryPerson.startPosition}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "left" }}>
              <p>Steps to proceed :-</p>
              <ol>
                <li>Select the Pickup Location</li>
                <li>Select the Drop Location</li>
              </ol>
            </div>
          </div>
        </div>
        <TableContainer component={Paper} className="table">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <InputLabel>Select Pickup location</InputLabel>
                  <Select onChange={updatePickupLocationOfDeliveryLocation}>
                    {restaurants.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                  </Select>
                </TableCell>
                <TableCell>
                  <InputLabel>Select Delivery Location</InputLabel>
                  <Select onChange={updateDropLocationOfDeliveryLocation}>
                    {houses.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                  </Select>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Grid container style={{ marginTop: "40px" }}>
          <Grid xs={12}>
            <Button variant="contained" color="primary" onClick={submitOrders}>Submit</Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  const submitOrders = () => {
    toggleGraph(false)
    const graph = generateGraphData();
    const distanceToReachForEachExecutive = []
    for (let i = 0; i < deliveryExecutives.length; i++) {
      const shortestPath = findShortestPath(graph, deliveryExecutives[i].startPosition, orderData.pickupLocation)
      distanceToReachForEachExecutive.push(shortestPath.distance);
    }

    const selectedIndex = distanceToReachForEachExecutive.indexOf(Math.min(...distanceToReachForEachExecutive));
    const selectedDeliveryExecutive = deliveryExecutives[selectedIndex];

    const pickupShortestPath = findShortestPath(graph, selectedDeliveryExecutive.startPosition, orderData.pickupLocation)
    const deliveryShortestPath = findShortestPath(graph, orderData.pickupLocation, orderData.dropLocation)

    setOrderGraphData({
      deliveryExecutive: selectedDeliveryExecutive.name,
      deliveryExecutiveStartingLocation: selectedDeliveryExecutive.startPosition,
      pickup: {
        links: getLinks(graph, pickupShortestPath.path),
        nodes: generateNodes(pickupShortestPath.path),
      },
      drop: {
        links: getLinks(graph, deliveryShortestPath.path),
        nodes: generateNodes(deliveryShortestPath.path)
      },
    })
    toggleGraph(true)

    const executives = [...deliveryExecutives]
    executives[selectedIndex].startPosition = orderData.dropLocation
    updateDeliveryExecutives(executives)
  }

  const getLinks = (graph, path) => {
    const links = []
    for (let i = 1; i < path.length; i++) {
      let graphNode = graph[path[i - 1]];
      let distance = graphNode[path[i]]
      links.push({ source: path[i - 1], target: path[i], distance })
    }
    return links;
  }

  const generateNodes = (path) => path.map(item => ({ id: item }))


  const getDataTable = () => {
    return (
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Restaurants</TableCell>
              <TableCell align="center">Houses</TableCell>
              <TableCell align="center">Distance</TableCell>
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

  return (
    <div>
      <>
        <Grid container>
          <Grid xs={12}>
            <h3>Live Ordering System</h3>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>

            <div className="form">
              {getDataTable()}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {finalForm()}
          </Grid>

          {showGraph ? (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6} md={6}>
                  <div>
                    <div>
                      {orderGraphData.deliveryExecutive} will go from {orderGraphData.deliveryExecutiveStartingLocation} to {orderData.pickupLocation} for Pickup
                    </div>
                    <Graph
                      id="graph-id-pickup" // id is mandatory
                      data={orderGraphData.pickup}
                      config={graphConfig}
                    />
                  </div>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div>
                    <div>
                      {orderGraphData.deliveryExecutive} will go from {orderData.pickupLocation} to {orderData.dropLocation} for Delivery
                    </div>
                    <Graph
                      id="graph-id-drop" // id is mandatory
                      data={orderGraphData.drop}
                      config={graphConfig}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </>

    </div >
  )
}

export default Home